import preprocess from 'svelte-preprocess'

const config = {
  preprocess: preprocess(),
  compilerOptions: {
    generate: 'ssr',
  },
}

export default config
