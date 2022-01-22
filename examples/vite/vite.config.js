import { svelte } from '@sveltejs/vite-plugin-svelte'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
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
    plugins: [svelte()],
    build: {
      minify: isProduction,
      outDir: 'build',
    },
  }
})
