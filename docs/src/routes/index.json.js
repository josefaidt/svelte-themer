import { promises } from 'fs'
import { resolve } from 'path'
const { readFile } = promises

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
  const pkg = JSON.parse(await readFile(resolve('../package.json')))
  const { version } = pkg
  return {
    body: {
      SVELTE_THEMER_VERSION: version,
    },
  }
}
