import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import sveld from 'sveld'
import pkg from './package.json'

export default ['es', 'umd'].map(format => {
  const UMD = format === 'umd'

  const svelteConfig = {
    emitCss: false,
  }

  if (UMD) {
    svelteConfig.compilerOptions = { generate: 'ssr' }
  }

  return {
    input: pkg.svelte,
    output: {
      file: UMD ? pkg.main : pkg.module,
      format,
      name: UMD ? pkg.name : undefined,
    },
    external: Object.keys(pkg.dependencies),
    plugins: [svelte(svelteConfig), resolve(), UMD && sveld()],
  }
})
