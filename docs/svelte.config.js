import adapter from '@sveltejs/adapter-static'
import autoprefixer from 'autoprefixer'
import sveltePreprocess from 'svelte-preprocess'

// add preprocess
// style global

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: adapter(),
    ssr: false,
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
  preprocess: sveltePreprocess(),
}

export default config
