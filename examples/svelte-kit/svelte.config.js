import adapter from '@sveltejs/adapter-static'
import autoprefixer from 'autoprefixer'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: adapter(),
    vite: {
      css: {
        postcss: {
          plugins: [
            autoprefixer({
              overrideBrowserslist: ['last 1 version', 'ie >= 11'],
            }),
          ],
        },
      },
    },
  },
}

export default config
