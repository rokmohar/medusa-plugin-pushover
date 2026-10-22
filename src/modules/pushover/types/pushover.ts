export interface PushoverOptions {
  /**
   * Pushover User Key. Default for messages without `user`.
   */
  user_key?: string

  /**
   * Pushover API Token. Default for messages without `token`.
   */
  api_token?: string
}

/**
 * A Pushover message.
 *
 * Declared here rather than re-exported from `pushover-notifications` so that the
 * published type declarations stay self-contained: the upstream package ships no
 * types of its own, and the ambient `declare module` from `@rokmohar/pushover-types`
 * is not carried into the emitted `.d.ts` files.
 *
 * @see https://pushover.net/api
 */
export interface PushoverMessage {
  /**
   * The message to send
   */
  message: string

  /**
   * The API token. Defaults to the plugin's `api_token`; required when none is configured.
   */
  token?: string

  /**
   * The user key. Defaults to the plugin's `user_key`; required when none is configured.
   */
  user?: string

  /**
   * A file path or binary image attachment to send with the message
   */
  file?: string | object

  /**
   * The name of one of your devices to send just to that device instead of all devices
   */
  device?: string

  /**
   * Set to 1 to enable HTML parsing
   */
  html?: string

  /**
   * A value of -2, -1, 0 (default), 1, or 2
   */
  priority?: string

  /**
   * The name of a supported sound to override your default sound choice
   */
  sound?: string

  /**
   * A Unix timestamp of a time to display instead of when our API received it
   */
  timestamp?: string

  /**
   * Your message's title, otherwise your app's name is used
   */
  title?: string

  /**
   * A number of seconds that the message will live, before being deleted automatically
   */
  ttl?: string

  /**
   * A supplementary URL to show with your message
   */
  url?: string

  /**
   * A title for the URL specified as the url parameter, otherwise just the URL is shown
   */
  url_title?: string
}

/**
 * A callback function that handles the result of the Pushover send operation.
 */
export type PushoverCallback = (error: Error | null, result: any) => any
