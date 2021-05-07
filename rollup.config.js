import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import sveld from 'sveld'
import pkg from './package.json'

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase())

const svelteConfig = {
  input: pkg.svelte,
  output: [
    { file: pkg.module, format: 'es' },
    { file: pkg.main, format: 'umd', name },
  ],
  external: Object.keys(pkg.dependencies),
  plugins: [
    svelte({
      emitCss: false,
      compilerOptions: {
        generate: 'ssr',
      },
    }),
    resolve(),
    sveld(),
  ],
}

const preprocessConfig = {
  input: 'support/preprocess.js',
  output: [
    { file: './lib/preprocess.mjs', format: 'es' },
    { file: './lib/preprocess.js', format: 'cjs' },
  ],
}

export default [svelteConfig, process.env.RELEASE_PREPROCESSOR && preprocessConfig].filter(Boolean)
