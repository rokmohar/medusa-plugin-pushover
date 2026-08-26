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

Both options are required. The plugin throws a `MedusaError` on startup if either is missing.

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

The `PushoverMessage`, `PushoverCallback` and `PushoverOptions` types are exported from the plugin root:

```ts
import type { PushoverCallback, PushoverMessage, PushoverOptions } from '@rokmohar/medusa-plugin-pushover'
```
