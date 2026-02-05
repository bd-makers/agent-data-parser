# @bdmakers/agent-data-parser-web

Web (React DOM) implementation of the Agent Data Parser.

## Installation

```bash
npm install @bdmakers/agent-data-parser-web react react-dom
```

## Usage with Next.js

When using this package in a **Next.js** app (especially via `file:` or workspace link), you may see:

```
TypeError: Cannot read properties of null (reading 'useMemo')
```

This happens when the app and the package resolve different React instances. Fix it by telling Next.js to transpile this package so it uses your app’s React:

**`next.config.js`** (or `next.config.mjs`):

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@bdmakers/agent-data-parser-web'],
};

export default nextConfig;
```

After adding `transpilePackages`, restart the dev server.
