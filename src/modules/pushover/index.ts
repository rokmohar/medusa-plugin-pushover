import { Module } from '@medusajs/utils'
import { PushoverService } from './services'

export * from './services'
export * from './types'

export default Module('pushover', {
  service: PushoverService,
})
