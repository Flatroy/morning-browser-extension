# morning browser extension

[![build](https://github.com/Flatroy/morning-browser-extension/actions/workflows/build.yml/badge.svg)](https://github.com/Flatroy/morning-browser-extension/actions/workflows/build.yml) [![release](https://github.com/Flatroy/morning-browser-extension/actions/workflows/release.yml/badge.svg)](https://github.com/Flatroy/morning-browser-extension/actions/workflows/release.yml)

A [Vite](https://vitejs.dev/) powered WebExtension ([Chrome](https://developer.chrome.com/docs/extensions/reference/), [FireFox](https://addons.mozilla.org/en-US/developers/), etc.) for Morning accounting service (Israel Only).

## Features

- Add an expense by uploading document via API.

## Usage

### Development

```bash
pnpm i
pnpm dev
```

Then **load extension in browser with the `dist/` folder**.

### Build

To build the extension, run

```bash
pnpm build
```

And then pack files under `dist`, you can upload `dist.crx` or `dist.xpi` to appropriate extension store.

## Credits

This app based on template by: https://github.com/mubaidr/vite-vue3-chrome-extension-v3

[Morning web-site](https://greeninvoice.co.il)

[Morning API Docs](https://www.greeninvoice.co.il/api-docs/)
