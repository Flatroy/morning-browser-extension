# Changelog

All notable changes to this project will be documented in this file.

## [0.0.6] - 2025-06-15

### Changed

- **Updated Morning API authentication to OAuth 2.0 client_credentials flow.**
  Morning (Greeninvoice) migrated their token endpoint to `https://api.morning.co/idp/v1/oauth/token` with a new request shape (`client_id`, `client_secret`) and response (`accessToken`, `expiresAt`). The old `https://api.greeninvoice.co.il/api/v1/account/token` endpoint was deprecated.

- **Replaced inline duplicated token fetch in settings with shared `createToken()` utility.**
  Removed ~30 lines of duplicated fetch logic from `settings.vue` and consolidated into the existing `api.ts` `createToken()` function, which now returns `Promise<boolean>` instead of side-effect-only alerts.

- **Upgraded API secret input from `type="text"` to `type="password"` with show/hide toggle.**
  Previously the secret was visible in plain text on screen (shoulder surfing risk). Added an Eye/EyeOff icon button so users can toggle visibility when needed.

- **Added `https://api.morning.co/*` to extension host permissions.**
  Required for the new OAuth token endpoint to be reachable from the extension.

- **Fixed malformed AWS host permission pattern `*.*.amazonaws.com` → `*.amazonaws.com`.**
  Chrome manifest v3 only allows a single wildcard as the leftmost subdomain. The malformed pattern caused a validation warning in the developer dashboard.

- **Added "Open source" link to footer.**
  Link to `https://github.com/Flatroy/morning-browser-extension` next to the version number for transparency.

### Removed

- **Cleaned up production console leaks in the upload flow.**
  Removed `console.log(data)`, `console.log(file.name)`, and `console.error(error)` from `src/popup/pages/index.vue` that could expose filenames and API error bodies in the browser console.

### Notes

- General API calls (file upload URL, expense creation) continue to use `https://api.greeninvoice.co.il/api/v1` and `https://apigw.greeninvoice.co.il/*` — those endpoints were not affected by the Morning auth migration.
- `chrome.storage.local` is still used for credential persistence. The at-rest encryption discussion was deferred; the current `password` input type is the standard best practice for browser extensions.
