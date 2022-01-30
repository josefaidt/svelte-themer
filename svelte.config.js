import fs from 'fs'
import adapter from '@sveltejs/adapter-static'

const pkg = JSON.parse(
  fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8')
)
const CONTENT = {
  NAME: pkg.name,
  VERSION_PACKAGE: pkg.version,
  HOMEPAGE: pkg.homepage,
  TS: new Date().toLocaleString(),
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    {
      script: ({ content }) => {
        let code = content

        Object.entries(CONTENT).map(([key, value]) => {
          code = code.replace(
            new RegExp('process.env.' + key, 'g'),
            JSON.stringify(value)
          )
        })

        return {
          code,
        }
      },
    },
  ],
  kit: {
    adapter: adapter(),
    target: '#svelte',
    files: {
      assets: 'demo/static',
      lib: 'src',
      routes: 'demo/routes',
      template: 'demo/app.html',
    },
    package: {},
    vite: {
      server: {
        fs: {
          allow: ['..'],
        },
      },
    },
  },
}

export default config
