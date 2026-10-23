# Pushover plugin for Medusa V2

## Installation

Run the following command to install the plugin with **npm**:

```bash
npm install --save @rokmohar/medusa-plugin-pushover
```

Or with **yarn**:

```bash
yarn add @rokmohar/medusa-plugin-pushover
```

## ⚠️ MedusaJS v2.19.0 or newer

This plugin is only for MedusaJS v2.19.0 or newer.

If you are using an older version of MedusaJS, please use the [v0.1.2 version of this plugin](https://github.com/rokmohar/medusa-plugin-pushover/tree/v0.1.2).

## Configuration

Add the plugin to your `medusa-config.ts` file:

```js
import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  // ... other config
  plugins: [
    // ... other plugins
    {
      resolve: '@rokmohar/medusa-plugin-pushover',
      options: {
        user_key: process.env.PUSHOVER_USER_KEY ?? '',
        api_token: process.env.PUSHOVER_API_TOKEN ?? '',
      },
    },
  ],
})
```

Both options are optional defaults: a message's own `user` and `token` take precedence (see
[Overriding recipient and application](#overriding-recipient-and-application)). If a message ends up without a user or a
token, `send` passes a `MedusaError` to the callback. Errors returned by the Pushover API, such as an invalid user key,
are passed to the callback the same way.

## ENV variables

Add the environment variables to your `.env` and `.env.template` file:

```env
# ... others vars
PUSHOVER_USER_KEY=
PUSHOVER_API_TOKEN=
```

## Usage

The plugin registers a `pushover` module. Resolve it from the container and call `send`:

```ts
import type { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { PushoverService } from '@rokmohar/medusa-plugin-pushover'

export default async function orderPlacedHandler({ event: { data }, container }: SubscriberArgs<{ id: string }>) {
  const pushoverService: PushoverService = container.resolve('pushover')

  pushoverService.send(
    {
      title: 'New order',
      message: `Order ${data.id} was placed`,
    },
    (err, result) => {
      if (err) {
        console.error(err)
      }
    },
  )
}

export const config: SubscriberConfig = {
  event: 'order.placed',
}
```

`send` takes the [Pushover message object](https://pushover.net/api) (`message` is required; `title`, `priority`,
`sound`, `url`, `device` and the rest are optional) and a Node-style callback.

### Overriding recipient and application

Set `user` and/or `token` on a message to override the configured `user_key` and `api_token`, e.g. to notify several
users:

```ts
for (const userKey of ['uQiRzpo4DXghDmr9QzzfQu27cmVRsG', 'gznej3rKEVAvPUxu9vvNnqpmZpokzF']) {
  pushoverService.send({ user: userKey, message: 'New order' }, (err) => {
    if (err) {
      console.error(err)
    }
  })
}
```

The `PushoverMessage`, `PushoverCallback` and `PushoverOptions` types are exported from the plugin root:

```ts
import type { PushoverCallback, PushoverMessage, PushoverOptions } from '@rokmohar/medusa-plugin-pushover'
```
