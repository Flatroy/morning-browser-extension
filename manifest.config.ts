import { defineManifest } from '@crxjs/vite-plugin'
// @ts-ignore
import packageJson from './package.json'

const { version, name, description, displayName } = packageJson
// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

export default defineManifest(async (env) => ({
  // default_locale: 'en',
  name: env.mode === 'staging' ? `[INTERNAL] ${name}` : displayName || name,
  description,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  // key: "neoglgnpcfibllajepnhdoideljlioaf",
  version_name: version,
  author: 'Daneke George',
  manifest_version: 3,
  action: {
    default_popup: 'src/popup/index.html',
    default_title: 'Morning (Greeninvoice)',
    default_icon: 'src/assets/morning.png',
  },
  icons: {
    '48': 'src/assets/morning-48.png',
    '96': 'src/assets/morning-96.png',
    '128': 'src/assets/morning-128.png',
    '512': 'src/assets/morning.png',
  },
  // background: {
  //   service_worker: 'src/background/index.ts',
  // },
  // content_scripts: [
  //   {
  //     all_frames: false,
  //     js: ['src/content-script/index.ts'],
  //     matches: ['*://*/*'],
  //     run_at: 'document_end',
  //   },
  // ],
  // allow extensions to send requests to api.greeninvoice.co.il
  // content_security_policy: "script-src 'self' https://api.greeninvoice.co.il; object-src 'self'",
  // host_permissions: ['*://*/*'],
  host_permissions: ['https://api.greeninvoice.co.il/*'],
  options_page: 'src/options/index.html',
  permissions: ['storage'],
  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self'",
  },

  // permissions: ['storage', 'activeTab', 'identity'],
  // web_accessible_resources: [
  //   {
  //     matches: ['*://*/*'],
  //     resources: ['src/content-script/index.ts'],
  //   },
  //   {
  //     matches: ['*://*/*'],
  //     resources: ['src/content-script/iframe/index.html'],
  //   },
  // ],
}))
