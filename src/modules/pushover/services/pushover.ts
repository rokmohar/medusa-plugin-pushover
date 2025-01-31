import { MedusaError } from '@medusajs/utils'
import Pushover from 'pushover-notifications'
import { PushoverOptions } from '../types'

export class PushoverService {
  private client: Pushover

  constructor(_: any, options: Record<any, any>) {
    const validOptions = this.toPluginOptions(options)
    this.client = new Pushover({
      user: validOptions.user_key,
      token: validOptions.api_token,
    })
  }

  send(message: Pushover.Message, cb: Pushover.PushoverCallback) {
    this.client.send(message, cb)
  }

  static validateOptions(options: Record<any, any>) {
    if (!options.user_key) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, 'Option `user_key` is required in the Pushover options')
    }
    if (!options.api_token) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, 'Option `api_token` is required in the Pushover options')
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
