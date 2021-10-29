import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveld from 'sveld'
// import sveltePreprocess from 'svelte-preprocess'

const { npm_package_svelte, npm_package_name } = process.env
const pkg = JSON.parse(await readFile(resolve('./package.json')))

const svelteConfig = {
  // preprocess: sveltePreprocess(),
  // compilerOptions: {
  //   generate: 'ssr',
  // },
}

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [svelte(svelteConfig)],
  build: {
    minify: true,
    outDir: resolve('./lib'),
    emptyOutDir: true,
    lib: {
      entry: npm_package_svelte,
      name: npm_package_name,
      formats: ['es', 'umd'],
      fileName: format => `svelte-themer${format === 'umd' ? '.umd' : ''}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies || {}), 'svelte'],
      output: {
        globals: {
          'css-vars-ponyfill': 'cssVariablesPolyfill',
          svelte: 'svelte',
        },
      },
      plugins: [sveld.default()],
    },
  },
  rollupDedupe: ['svelte'],
}
