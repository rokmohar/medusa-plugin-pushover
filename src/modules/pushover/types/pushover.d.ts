/* eslint-disable @typescript-eslint/no-unsafe-function-type */

declare module 'pushover-notifications' {
  /**
   * Creates a new Pushover instance.
   * @class
   * @param {object} opts - The options for Pushover.
   * @param {string} opts.token - The Pushover API token.
   * @param {string} opts.user - The user key for sending messages.
   * @param {object} [opts.httpOptions] - Optional HTTP options.
   * @param {boolean} [opts.debug] - Enable debug logging.
   * @param {function} [opts.onerror] - Custom error handler.
   * @param {boolean} [opts.update_sounds] - Automatically update sounds.
   */
  declare function Pushover(opts: {
    token: string
    user: string
    httpOptions?: object
    debug?: boolean
    onerror?: Function
    update_sounds?: boolean
  }): void
  declare class Pushover {
    /**
     * Creates a new Pushover instance.
     * @class
     * @param {object} opts - The options for Pushover.
     * @param {string} opts.token - The Pushover API token.
     * @param {string} opts.user - The user key for sending messages.
     * @param {object} [opts.httpOptions] - Optional HTTP options.
     * @param {boolean} [opts.debug] - Enable debug logging.
     * @param {function} [opts.onerror] - Custom error handler.
     * @param {boolean} [opts.update_sounds] - Automatically update sounds.
     */
    constructor(opts: {
      token: string
      user: string
      httpOptions?: object
      debug?: boolean
      onerror?: Function
      update_sounds?: boolean
    })
    boundary: string
    token: string
    user: string
    httpOptions: any
    sounds: {
      pushover: string
      bike: string
      bugle: string
      cashregister: string
      classical: string
      cosmic: string
      falling: string
      gamelan: string
      incoming: string
      intermission: string
      magic: string
      mechanical: string
      pianobar: string
      siren: string
      spacealarm: string
      tugboat: string
      alien: string
      climb: string
      persistent: string
      echo: string
      updown: string
      none: string
    }
    debug: true
    onerror: Function
    /**
     * Handles errors from Pushover API responses.
     * @param {string|object} d - The response data from the API.
     * @param {object} res - The HTTP response object.
     * @throws {Error} Throws an error if there are API errors and no error handler is provided.
     */
    errors(d: string | object, res: object): void
    /**
     * Updates the list of available Pushover sounds.
     */
    updateSounds(): void
    /**
     * Sends a message using Pushover.
     * @param {Message} obj - The message to send.
     * @param {PushoverCallback} fn - The callback function that handles the response.
     */
    send(obj: Message, fn: PushoverCallback): void
  }

  declare namespace Pushover {
    export { PushoverCallback, Message }
  }

  /**
   * A callback function that handles the result of the Pushover send operation.
   */
  type PushoverCallback = (error: Error | null, result: any) => any
  type Message = {
    /**
     * - The message to send
     */
    message: string
    /**
     * - The API token.
     */
    token?: string
    /**
     * - The user key.
     */
    user?: string
    /**
     * - A file path or binary image attachment to send with the message
     */
    file?: string | object
    /**
     * - The name of one of your devices to send just to that device instead of all devices
     */
    device?: string
    /**
     * - Set to 1 to enable HTML parsing
     */
    html?: string
    /**
     * - A value of -2, -1, 0 (default), 1, or 2
     */
    priority?: string
    /**
     * - The name of a supported sound to override your default sound choice
     */
    sound?: string
    /**
     * - A Unix timestamp of a time to display instead of when our API received it
     */
    timestamp?: string
    /**
     * - Your message's title, otherwise your app's name is used
     */
    title?: string
    /**
     * - A number of seconds that the message will live, before being deleted automatically
     */
    ttl?: string
    /**
     * - A supplementary URL to show with your message
     */
    url?: string
    /**
     * - A title for the URL specified as the url parameter, otherwise just the URL is shown
     */
    url_title?: string
  }

  export default Pushover
}
