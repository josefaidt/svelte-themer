import pkg from 'svelte-themer/package.json'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
  const { version } = pkg
  return {
    body: {
      SVELTE_THEMER_VERSION: version,
    },
  }
}
