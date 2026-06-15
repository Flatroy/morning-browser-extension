# AGENTS.md

Guidelines for AI agents working on this codebase.

## Project Overview

Vue 3 + Vite browser extension (Manifest V3) supporting Chrome, Firefox, and Edge.

## Essential Commands

```bash
npm run dev       # Development server (port 8888)
npm run build     # Production build (via vite + vue-tsc)
npm run lint      # ESLint with auto-fix
npm run prettier  # Format with Prettier
npm run preview   # Preview production build
```

> Note: There is no dedicated `typecheck` script. Type checking runs during `build` via `vue-tsc`. There are no `dev:chrome` or `dev:firefox` scripts.

## Code Style

- **TypeScript**: Strict mode enabled. Avoid `any` type.
- **Vue**: Use `<script setup lang="ts">` syntax.
- **Semicolons**: No semicolons (Prettier config).
- **Quotes**: Double quotes (Prettier config).
- **Trailing commas**: Always (Prettier config).
- **Indentation**: 2 spaces, no tabs.
- **Console**: Use `console.info`, `console.warn`, or `console.error` (not `console.log`).

## Architecture

### Extension Contexts

- `src/background/` - Service worker (extension lifecycle)
- `src/content-script/` - DOM injection, page interaction (includes `iframe/` sub-context)
- `src/popup/` - Browser action popup
- `src/options/` - Extension options page
- `src/pages/` - Additional routed pages

### Shared Code

- `src/components/` - Reusable Vue components
- `src/composables/` - Vue composables (hooks)
- `src/logic/` - Shared logic (e.g., reactive storage bindings)
- `src/utils/` - Utility functions

### File-Based Routing

Pages auto-register from:

- `src/pages/` (base route: `/`)
- `src/options/pages/` (base route: `/options`)
- `src/popup/pages/` (base route: `/popup`)
- `src/content-script/iframe/pages/` (base route: `/iframe`)

Create `.vue` files in these directories to add routes.

## Conventions

### Components

- Use PascalCase for component files: `MyComponent.vue`
- Place shared components in `src/components/`
- Context-specific components stay in their UI folder

### Composables

- Prefix with `use`: `useStorageLocal.ts`
- Export functions as named exports

### Imports

- Auto-imports enabled for Vue, `vue-router`, `vue/macros`, `@vueuse/core`, and `webextension-polyfill` (as `browser`)
- Composables in `src/composables/` are auto-imported
- Components in `src/components/` are auto-imported
- Use `~/` for project root imports
- Use `src/` for src-relative imports

## Before Committing

1. Run `npm run lint` - Fix all errors
2. Run `npm run build` - Verify build and type checking pass
3. Test in both Chrome and Firefox if making cross-browser changes

> Note: There is no test suite or test runner currently configured.

## Browser APIs

- Use `chrome.*` APIs directly (types from `@types/chrome`)
- `webextension-polyfill` is available as `browser` (auto-imported) and used for storage access

## State Management

- Uses `webextension-polyfill` `storage.local` for persistence
- Use the `useStorageLocal` composable for reactive local storage synced with `browser.storage.local`
- Pinia is **not** currently used in this project

## Communication

- Background script handles events and coordinates between contexts
- `webext-bridge` is listed as a dependency but is **not currently used** in source code
