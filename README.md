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
        config: {
          userKey: process.env.PUSHOVER_USER_KEY ?? '',
          apiToken: process.env.PUSHOVER_TOKEN ?? '',
        },
      },
    },
  ],
})
```

## ENV variables

Add the environment variables to your `.env` and `.env.template` file:

```env
# ... others vars
PUSHOVER_USER_KEY=
PUSHOVER_API_TOKEN=
```
