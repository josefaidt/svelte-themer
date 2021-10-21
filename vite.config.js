import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

const { npm_package_svelte, npm_package_name } = process.env
const pkg = JSON.parse(await readFile(resolve('./package.json')))

export default defineConfig({
  mode: 'production',
  plugins: [
    svelte({
      emitCss: false,
      compilerOptions: {
        generate: 'ssr',
      },
    }),
  ],
  build: {
    minify: true,
    outDir: resolve('./lib'),
    lib: {
      entry: npm_package_svelte,
      name: npm_package_name,
    },
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies || {}), 'svelte'],
      output: {
        globals: {
          'css-vars-ponyfill': 'cssVariablesPolyfill',
          svelte: 'svelte',
        },
      },
      // exports: 'named',
      plugins: [],
    },
  },
  rollupDedupe: ['svelte'],
})
