/// <reference types="@rokmohar/pushover-types" />
import { MedusaError } from '@medusajs/framework/utils'
import Pushover from 'pushover-notifications'
import { PushoverCallback, PushoverMessage, PushoverOptions } from '../types'

export class PushoverService {
  private client: Pushover
  private options: PushoverOptions

  constructor(_: any, options: Record<any, any>) {
    this.options = this.toPluginOptions(options)
    // Errors are read from the response in send, the default handler throws outside the callback
    this.client = new Pushover({ user: '', token: '', onerror: () => {} })
  }

  send(message: PushoverMessage, cb: PushoverCallback) {
    const user = message.user || this.options.user_key
    const token = message.token || this.options.api_token

    if (!user || !token) {
      cb(
        new MedusaError(
          MedusaError.Types.INVALID_DATA,
          'Pushover message needs `user` and `token`, set on the message or as `user_key` and `api_token` in the options',
        ),
        undefined,
      )
      return
    }
    this.client.send({ ...message, user, token }, (error, result) => {
      cb(error || this.toResponseError(result), result)
    })
  }

  static validateOptions(options: Record<any, any>) {
    if (options.user_key !== undefined && typeof options.user_key !== 'string') {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'Option `user_key` must be a string in the Pushover options',
      )
    }
    if (options.api_token !== undefined && typeof options.api_token !== 'string') {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'Option `api_token` must be a string in the Pushover options',
      )
    }
  }

  private toResponseError(result: unknown): Error | null {
    try {
      const response = typeof result === 'string' ? JSON.parse(result) : result
      if (response?.status === 1) {
        return null
      }
      const errors = Array.isArray(response?.errors) ? response.errors.join(', ') : 'Unknown error'
      return new MedusaError(MedusaError.Types.UNEXPECTED_STATE, `Pushover request failed: ${errors}`)
    } catch {
      return new MedusaError(MedusaError.Types.UNEXPECTED_STATE, 'Pushover returned an invalid response')
    }
  }

  private toPluginOptions(options: Record<any, any>): PushoverOptions {
    const isValid = (o: Record<any, any>): o is PushoverOptions => {
      PushoverService.validateOptions(o)
      return true
    }
    if (isValid(options)) {
      return options
    }
    throw new MedusaError(MedusaError.Types.INVALID_DATA, 'Invalid options for Pushover plugin')
  }
}
