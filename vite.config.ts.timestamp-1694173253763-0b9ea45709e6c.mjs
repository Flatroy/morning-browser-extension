// vite.config.ts
import { crx } from 'file:///Users/georgedaneke/sites/morning-browser-extension/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.18/node_modules/@crxjs/vite-plugin/dist/index.mjs'
import vue from 'file:///Users/georgedaneke/sites/morning-browser-extension/node_modules/.pnpm/@vitejs+plugin-vue@4.3.3_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import { dirname, join, relative, resolve } from 'path'
import AutoImport from 'file:///Users/georgedaneke/sites/morning-browser-extension/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.4.0/node_modules/unplugin-auto-import/dist/vite.js'
import IconsResolver from 'file:///Users/georgedaneke/sites/morning-browser-extension/node_modules/.pnpm/unplugin-icons@0.16.5_@vue+compiler-sfc@3.3.4/node_modules/unplugin-icons/dist/resolver.mjs'
import Icons from 'file:///Users/georgedaneke/sites/morning-browser-extension/node_modules/.pnpm/unplugin-icons@0.16.5_@vue+compiler-sfc@3.3.4/node_modules/unplugin-icons/dist/vite.mjs'
import Components from 'file:///Users/georgedaneke/sites/morning-browser-extension/node_modules/.pnpm/unplugin-vue-components@0.25.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs'
import { defineConfig } from 'file:///Users/georgedaneke/sites/morning-browser-extension/node_modules/.pnpm/vite@4.4.9_@types+node@18.17.11_sass@1.66.1/node_modules/vite/dist/node/index.js'
import Pages from 'file:///Users/georgedaneke/sites/morning-browser-extension/node_modules/.pnpm/vite-plugin-pages@0.31.0_@vue+compiler-sfc@3.3.4_vite@4.4.9/node_modules/vite-plugin-pages/dist/index.mjs'

// manifest.config.ts
import { defineManifest } from 'file:///Users/georgedaneke/sites/morning-browser-extension/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.18/node_modules/@crxjs/vite-plugin/dist/index.mjs'

// package.json
var package_default = {
  private: true,
  scripts: {
    build: 'vite build',
    dev: 'vite',
    lint: 'eslint . --fix --ext js,mjs,cjs,ts,mts,cts,vue',
    preview: 'vite preview',
    prettier: 'prettier --write .',
  },
  type: 'module',
  version: '0.0.3',
  displayName:
    'Morning (\u05D7\u05E9\u05D1\u05D5\u05E0\u05D9\u05EA \u05D9\u05E8\u05D5\u05E7\u05D4) Expense Tracker',
  name: 'morning-greeninvoice-expense-tracker',
  description:
    'Extension to upload receipts to automatically create Expense draft entries on Morning (ex Greeninvoice)',
  devDependencies: {
    '@heroicons/vue': '1.0.6',
    vue: '^3.3.4',
    'vue-router': '^4.2.4',
    '@crxjs/vite-plugin': '^2.0.0-beta.18',
    '@iconify-json/mdi': '^1.1.54',
    '@tailwindcss/forms': '^0.5.5',
    '@types/chrome': '^0.0.244',
    '@types/eslint': '^8.44.2',
    '@types/eslint-config-prettier': '^6.11.0',
    '@types/node': '^18.17.11',
    '@typescript-eslint/eslint-plugin': '^6.4.1',
    '@typescript-eslint/parser': '^6.4.1',
    '@vitejs/plugin-vue': '^4.3.3',
    '@vue/compiler-sfc': '^3.3.4',
    '@vueuse/core': '^10.4.0',
    autoprefixer: '^10.4.15',
    eslint: '^8.48.0',
    'eslint-config-prettier': '^9.0.0',
    'eslint-plugin-vue': '^9.17.0',
    postcss: '^8.4.28',
    prettier: '^3.0.2',
    'prettier-plugin-tailwindcss': '^0.5.3',
    sass: '^1.66.1',
    tailwindcss: '^3.3.3',
    typescript: '^5.2.2',
    'unplugin-auto-import': '^0.16.6',
    'unplugin-icons': '^0.16.5',
    'unplugin-vue-components': '^0.25.1',
    vite: '^4.4.9',
    'vite-plugin-pages': '^0.31.0',
    'vue-tsc': '^1.8.8',
    'webext-bridge': '^6.0.1',
  },
  overrides: {
    '@crxjs/vite-plugin': '$@crxjs/vite-plugin',
  },
  pnpm: {
    overrides: {},
    peerDependencyRules: {
      allowAny: [],
      allowedDeprecatedVersions: {
        'sourcemap-codec': '1.4.8',
      },
      allowedVersions: {},
      ignoreMissing: [],
    },
  },
}

// manifest.config.ts
var { version, name, description, displayName } = package_default
var [major, minor, patch, label = '0'] = version
  .replace(/[^\d.-]+/g, '')
  .split(/[.-]/)
var manifest_config_default = defineManifest(async (env) => ({
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
    48: 'src/assets/morning-48.png',
    96: 'src/assets/morning-96.png',
    128: 'src/assets/morning-128.png',
    512: 'src/assets/morning.png',
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

// vite.config.ts
var __vite_injected_original_dirname =
  '/Users/georgedaneke/sites/morning-browser-extension'
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      '~': resolve(join(__vite_injected_original_dirname, 'src')),
      src: resolve(join(__vite_injected_original_dirname, 'src')),
    },
  },
  plugins: [
    crx({ manifest: manifest_config_default }),
    vue(),
    Pages({
      dirs: [
        {
          dir: 'src/pages',
          baseRoute: '',
        },
        {
          dir: 'src/options/pages',
          baseRoute: 'options',
        },
        {
          dir: 'src/popup/pages',
          baseRoute: 'popup',
        },
        {
          dir: 'src/content-script/iframe/pages',
          baseRoute: 'iframe',
        },
      ],
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue/macros',
        '@vueuse/core',
        {
          'webextension-polyfill': [['*', 'browser']],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables/'],
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ['src/components'],
      // generate `components.d.ts` for ts support with Volar
      dts: 'src/components.d.ts',
      resolvers: [
        // auto import icons
        IconsResolver({
          prefix: 'i',
          enabledCollections: ['mdi'],
        }),
      ],
    }),
    // https://github.com/antfu/unplugin-icons
    Icons({
      autoInstall: true,
      compiler: 'vue3',
    }),
    // rewrite assets to use relative path
    {
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), '/assets')}/`
        )
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        iframe: 'src/content-script/iframe/index.html',
      },
    },
  },
  server: {
    port: 8888,
    strictPort: true,
    hmr: {
      port: 8889,
      overlay: false,
    },
  },
  optimizeDeps: {
    include: ['vue', '@vueuse/core', 'webextension-polyfill'],
    exclude: ['vue-demi'],
  },
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9nZW9yZ2VkYW5la2Uvc2l0ZXMvbW9ybmluZy1icm93c2VyLWV4dGVuc2lvblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2dlb3JnZWRhbmVrZS9zaXRlcy9tb3JuaW5nLWJyb3dzZXItZXh0ZW5zaW9uL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9nZW9yZ2VkYW5la2Uvc2l0ZXMvbW9ybmluZy1icm93c2VyLWV4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGNyeCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHsgZGlybmFtZSwgam9pbiwgcmVsYXRpdmUsIHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xuaW1wb3J0IEljb25zIGZyb20gJ3VucGx1Z2luLWljb25zL3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL21hbmlmZXN0LmNvbmZpZydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ34nOiByZXNvbHZlKGpvaW4oX19kaXJuYW1lLCAnc3JjJykpLFxuICAgICAgc3JjOiByZXNvbHZlKGpvaW4oX19kaXJuYW1lLCAnc3JjJykpLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBjcngoeyBtYW5pZmVzdCB9KSxcblxuICAgIHZ1ZSgpLFxuXG4gICAgUGFnZXMoe1xuICAgICAgZGlyczogW1xuICAgICAgICB7XG4gICAgICAgICAgZGlyOiAnc3JjL3BhZ2VzJyxcbiAgICAgICAgICBiYXNlUm91dGU6ICcnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGlyOiAnc3JjL29wdGlvbnMvcGFnZXMnLFxuICAgICAgICAgIGJhc2VSb3V0ZTogJ29wdGlvbnMnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGlyOiAnc3JjL3BvcHVwL3BhZ2VzJyxcbiAgICAgICAgICBiYXNlUm91dGU6ICdwb3B1cCcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBkaXI6ICdzcmMvY29udGVudC1zY3JpcHQvaWZyYW1lL3BhZ2VzJyxcbiAgICAgICAgICBiYXNlUm91dGU6ICdpZnJhbWUnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcblxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgaW1wb3J0czogW1xuICAgICAgICAndnVlJyxcbiAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxuICAgICAgICAndnVlL21hY3JvcycsXG4gICAgICAgICdAdnVldXNlL2NvcmUnLFxuICAgICAgICB7XG4gICAgICAgICAgJ3dlYmV4dGVuc2lvbi1wb2x5ZmlsbCc6IFtbJyonLCAnYnJvd3NlciddXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnRzLmQudHMnLFxuICAgICAgZGlyczogWydzcmMvY29tcG9zYWJsZXMvJ10sXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnXSxcbiAgICAgIC8vIGdlbmVyYXRlIGBjb21wb25lbnRzLmQudHNgIGZvciB0cyBzdXBwb3J0IHdpdGggVm9sYXJcbiAgICAgIGR0czogJ3NyYy9jb21wb25lbnRzLmQudHMnLFxuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIC8vIGF1dG8gaW1wb3J0IGljb25zXG4gICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgIHByZWZpeDogJ2knLFxuICAgICAgICAgIGVuYWJsZWRDb2xsZWN0aW9uczogWydtZGknXSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWljb25zXG4gICAgSWNvbnMoe1xuICAgICAgYXV0b0luc3RhbGw6IHRydWUsXG4gICAgICBjb21waWxlcjogJ3Z1ZTMnLFxuICAgIH0pLFxuXG4gICAgLy8gcmV3cml0ZSBhc3NldHMgdG8gdXNlIHJlbGF0aXZlIHBhdGhcbiAgICB7XG4gICAgICBuYW1lOiAnYXNzZXRzLXJld3JpdGUnLFxuICAgICAgZW5mb3JjZTogJ3Bvc3QnLFxuICAgICAgYXBwbHk6ICdidWlsZCcsXG4gICAgICB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbCwgeyBwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZShcbiAgICAgICAgICAvXCJcXC9hc3NldHNcXC8vZyxcbiAgICAgICAgICBgXCIke3JlbGF0aXZlKGRpcm5hbWUocGF0aCksICcvYXNzZXRzJyl9L2BcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICB9LFxuICBdLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIGlmcmFtZTogJ3NyYy9jb250ZW50LXNjcmlwdC9pZnJhbWUvaW5kZXguaHRtbCcsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDg4ODgsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICBobXI6IHtcbiAgICAgIHBvcnQ6IDg4ODksXG4gICAgICBvdmVybGF5OiBmYWxzZSxcbiAgICB9LFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbJ3Z1ZScsICdAdnVldXNlL2NvcmUnLCAnd2ViZXh0ZW5zaW9uLXBvbHlmaWxsJ10sXG4gICAgZXhjbHVkZTogWyd2dWUtZGVtaSddLFxuICB9LFxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2dlb3JnZWRhbmVrZS9zaXRlcy9tb3JuaW5nLWJyb3dzZXItZXh0ZW5zaW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZ2VvcmdlZGFuZWtlL3NpdGVzL21vcm5pbmctYnJvd3Nlci1leHRlbnNpb24vbWFuaWZlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9nZW9yZ2VkYW5la2Uvc2l0ZXMvbW9ybmluZy1icm93c2VyLWV4dGVuc2lvbi9tYW5pZmVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuY29uc3QgeyB2ZXJzaW9uLCBuYW1lLCBkZXNjcmlwdGlvbiwgZGlzcGxheU5hbWUgfSA9IHBhY2thZ2VKc29uXG4vLyBDb252ZXJ0IGZyb20gU2VtdmVyIChleGFtcGxlOiAwLjEuMC1iZXRhNilcbmNvbnN0IFttYWpvciwgbWlub3IsIHBhdGNoLCBsYWJlbCA9ICcwJ10gPSB2ZXJzaW9uXG4gIC8vIGNhbiBvbmx5IGNvbnRhaW4gZGlnaXRzLCBkb3RzLCBvciBkYXNoXG4gIC5yZXBsYWNlKC9bXlxcZC4tXSsvZywgJycpXG4gIC8vIHNwbGl0IGludG8gdmVyc2lvbiBwYXJ0c1xuICAuc3BsaXQoL1suLV0vKVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVNYW5pZmVzdChhc3luYyAoZW52KSA9PiAoe1xuICAvLyBkZWZhdWx0X2xvY2FsZTogJ2VuJyxcbiAgbmFtZTogZW52Lm1vZGUgPT09ICdzdGFnaW5nJyA/IGBbSU5URVJOQUxdICR7bmFtZX1gIDogZGlzcGxheU5hbWUgfHwgbmFtZSxcbiAgZGVzY3JpcHRpb24sXG4gIC8vIHVwIHRvIGZvdXIgbnVtYmVycyBzZXBhcmF0ZWQgYnkgZG90c1xuICB2ZXJzaW9uOiBgJHttYWpvcn0uJHttaW5vcn0uJHtwYXRjaH0uJHtsYWJlbH1gLFxuICAvLyBzZW12ZXIgaXMgT0sgaW4gXCJ2ZXJzaW9uX25hbWVcIlxuICAvLyBrZXk6IFwibmVvZ2xnbnBjZmlibGxhamVwbmhkb2lkZWxqbGlvYWZcIixcbiAgdmVyc2lvbl9uYW1lOiB2ZXJzaW9uLFxuICBhdXRob3I6ICdEYW5la2UgR2VvcmdlJyxcbiAgbWFuaWZlc3RfdmVyc2lvbjogMyxcbiAgYWN0aW9uOiB7XG4gICAgZGVmYXVsdF9wb3B1cDogJ3NyYy9wb3B1cC9pbmRleC5odG1sJyxcbiAgICBkZWZhdWx0X3RpdGxlOiAnTW9ybmluZyAoR3JlZW5pbnZvaWNlKScsXG4gICAgZGVmYXVsdF9pY29uOiAnc3JjL2Fzc2V0cy9tb3JuaW5nLnBuZycsXG4gIH0sXG4gIGljb25zOiB7XG4gICAgJzQ4JzogJ3NyYy9hc3NldHMvbW9ybmluZy00OC5wbmcnLFxuICAgICc5Nic6ICdzcmMvYXNzZXRzL21vcm5pbmctOTYucG5nJyxcbiAgICAnMTI4JzogJ3NyYy9hc3NldHMvbW9ybmluZy0xMjgucG5nJyxcbiAgICAnNTEyJzogJ3NyYy9hc3NldHMvbW9ybmluZy5wbmcnLFxuICB9LFxuICAvLyBiYWNrZ3JvdW5kOiB7XG4gIC8vICAgc2VydmljZV93b3JrZXI6ICdzcmMvYmFja2dyb3VuZC9pbmRleC50cycsXG4gIC8vIH0sXG4gIC8vIGNvbnRlbnRfc2NyaXB0czogW1xuICAvLyAgIHtcbiAgLy8gICAgIGFsbF9mcmFtZXM6IGZhbHNlLFxuICAvLyAgICAganM6IFsnc3JjL2NvbnRlbnQtc2NyaXB0L2luZGV4LnRzJ10sXG4gIC8vICAgICBtYXRjaGVzOiBbJyo6Ly8qLyonXSxcbiAgLy8gICAgIHJ1bl9hdDogJ2RvY3VtZW50X2VuZCcsXG4gIC8vICAgfSxcbiAgLy8gXSxcbiAgLy8gYWxsb3cgZXh0ZW5zaW9ucyB0byBzZW5kIHJlcXVlc3RzIHRvIGFwaS5ncmVlbmludm9pY2UuY28uaWxcbiAgLy8gY29udGVudF9zZWN1cml0eV9wb2xpY3k6IFwic2NyaXB0LXNyYyAnc2VsZicgaHR0cHM6Ly9hcGkuZ3JlZW5pbnZvaWNlLmNvLmlsOyBvYmplY3Qtc3JjICdzZWxmJ1wiLFxuICAvLyBob3N0X3Blcm1pc3Npb25zOiBbJyo6Ly8qLyonXSxcbiAgaG9zdF9wZXJtaXNzaW9uczogWydodHRwczovL2FwaS5ncmVlbmludm9pY2UuY28uaWwvKiddLFxuICBvcHRpb25zX3BhZ2U6ICdzcmMvb3B0aW9ucy9pbmRleC5odG1sJyxcbiAgcGVybWlzc2lvbnM6IFsnc3RvcmFnZSddLFxuICBjb250ZW50X3NlY3VyaXR5X3BvbGljeToge1xuICAgIGV4dGVuc2lvbl9wYWdlczogXCJzY3JpcHQtc3JjICdzZWxmJzsgb2JqZWN0LXNyYyAnc2VsZidcIixcbiAgfSxcblxuICAvLyBwZXJtaXNzaW9uczogWydzdG9yYWdlJywgJ2FjdGl2ZVRhYicsICdpZGVudGl0eSddLFxuICAvLyB3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXM6IFtcbiAgLy8gICB7XG4gIC8vICAgICBtYXRjaGVzOiBbJyo6Ly8qLyonXSxcbiAgLy8gICAgIHJlc291cmNlczogWydzcmMvY29udGVudC1zY3JpcHQvaW5kZXgudHMnXSxcbiAgLy8gICB9LFxuICAvLyAgIHtcbiAgLy8gICAgIG1hdGNoZXM6IFsnKjovLyovKiddLFxuICAvLyAgICAgcmVzb3VyY2VzOiBbJ3NyYy9jb250ZW50LXNjcmlwdC9pZnJhbWUvaW5kZXguaHRtbCddLFxuICAvLyAgIH0sXG4gIC8vIF0sXG59KSlcbiIsICJ7XG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC4gLS1maXggLS1leHQganMsbWpzLGNqcyx0cyxtdHMsY3RzLHZ1ZVwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxuICAgIFwicHJldHRpZXJcIjogXCJwcmV0dGllciAtLXdyaXRlIC5cIlxuICB9LFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjNcIixcbiAgXCJkaXNwbGF5TmFtZVwiOiBcIk1vcm5pbmcgKFx1MDVEN1x1MDVFOVx1MDVEMVx1MDVENVx1MDVFMFx1MDVEOVx1MDVFQSBcdTA1RDlcdTA1RThcdTA1RDVcdTA1RTdcdTA1RDQpIEV4cGVuc2UgVHJhY2tlclwiLFxuICBcIm5hbWVcIjogXCJtb3JuaW5nLWdyZWVuaW52b2ljZS1leHBlbnNlLXRyYWNrZXJcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkV4dGVuc2lvbiB0byB1cGxvYWQgcmVjZWlwdHMgdG8gYXV0b21hdGljYWxseSBjcmVhdGUgRXhwZW5zZSBkcmFmdCBlbnRyaWVzIG9uIE1vcm5pbmcgKGV4IEdyZWVuaW52b2ljZSlcIixcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGhlcm9pY29ucy92dWVcIjogXCIxLjAuNlwiLFxuICAgIFwidnVlXCI6IFwiXjMuMy40XCIsXG4gICAgXCJ2dWUtcm91dGVyXCI6IFwiXjQuMi40XCIsXG4gICAgXCJAY3J4anMvdml0ZS1wbHVnaW5cIjogXCJeMi4wLjAtYmV0YS4xOFwiLFxuICAgIFwiQGljb25pZnktanNvbi9tZGlcIjogXCJeMS4xLjU0XCIsXG4gICAgXCJAdGFpbHdpbmRjc3MvZm9ybXNcIjogXCJeMC41LjVcIixcbiAgICBcIkB0eXBlcy9jaHJvbWVcIjogXCJeMC4wLjI0NFwiLFxuICAgIFwiQHR5cGVzL2VzbGludFwiOiBcIl44LjQ0LjJcIixcbiAgICBcIkB0eXBlcy9lc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjYuMTEuMFwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMTguMTcuMTFcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjYuNC4xXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjYuNC4xXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNC4zLjNcIixcbiAgICBcIkB2dWUvY29tcGlsZXItc2ZjXCI6IFwiXjMuMy40XCIsXG4gICAgXCJAdnVldXNlL2NvcmVcIjogXCJeMTAuNC4wXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xNVwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNDguMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl45LjAuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi12dWVcIjogXCJeOS4xNy4wXCIsXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4yOFwiLFxuICAgIFwicHJldHRpZXJcIjogXCJeMy4wLjJcIixcbiAgICBcInByZXR0aWVyLXBsdWdpbi10YWlsd2luZGNzc1wiOiBcIl4wLjUuM1wiLFxuICAgIFwic2Fzc1wiOiBcIl4xLjY2LjFcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuMy4zXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMi4yXCIsXG4gICAgXCJ1bnBsdWdpbi1hdXRvLWltcG9ydFwiOiBcIl4wLjE2LjZcIixcbiAgICBcInVucGx1Z2luLWljb25zXCI6IFwiXjAuMTYuNVwiLFxuICAgIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcIjogXCJeMC4yNS4xXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjQuNC45XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1wYWdlc1wiOiBcIl4wLjMxLjBcIixcbiAgICBcInZ1ZS10c2NcIjogXCJeMS44LjhcIixcbiAgICBcIndlYmV4dC1icmlkZ2VcIjogXCJeNi4wLjFcIlxuICB9LFxuICBcIm92ZXJyaWRlc1wiOiB7XG4gICAgXCJAY3J4anMvdml0ZS1wbHVnaW5cIjogXCIkQGNyeGpzL3ZpdGUtcGx1Z2luXCJcbiAgfSxcbiAgXCJwbnBtXCI6IHtcbiAgICBcIm92ZXJyaWRlc1wiOiB7fSxcbiAgICBcInBlZXJEZXBlbmRlbmN5UnVsZXNcIjoge1xuICAgICAgXCJhbGxvd0FueVwiOiBbXSxcbiAgICAgIFwiYWxsb3dlZERlcHJlY2F0ZWRWZXJzaW9uc1wiOiB7XG4gICAgICAgIFwic291cmNlbWFwLWNvZGVjXCI6IFwiMS40LjhcIlxuICAgICAgfSxcbiAgICAgIFwiYWxsb3dlZFZlcnNpb25zXCI6IHt9LFxuICAgICAgXCJpZ25vcmVNaXNzaW5nXCI6IFtdXG4gICAgfVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJVLFNBQVMsV0FBVztBQUMvVixPQUFPLFNBQVM7QUFDaEIsU0FBUyxTQUFTLE1BQU0sVUFBVSxlQUFlO0FBQ2pELE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sV0FBVztBQUNsQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7OztBQ1JpVSxTQUFTLHNCQUFzQjs7O0FDQWxYO0FBQUEsRUFDRSxTQUFXO0FBQUEsRUFDWCxTQUFXO0FBQUEsSUFDVCxPQUFT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
