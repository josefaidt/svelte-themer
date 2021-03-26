import { readFile } from 'fs/promises'
import { resolve } from 'path'
import svelte from '@sveltejs/vite-plugin-svelte'
import replace from '@rollup/plugin-replace'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'

const pkg = JSON.parse(await readFile(resolve('../package.json'), 'utf-8'))

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  return {
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['last 1 version', 'ie >= 11'],
          }),
        ],
      },
    },
    plugins: [
      svelte(),
      replace({
        PKG_VERSION: JSON.stringify(pkg.version),
      }),
    ],
    build: {
      minify: isProduction,
      outDir: 'build',
    },
  }
})
