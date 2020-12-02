<script context="module">
  export const STORAGE_KEY = '__svelte-themer__theme'
  export const CONTEXT_KEY = 'theme'
  export const VARIABLE_PREFIX = 'theme'
  export const VALID_MODES = ['auto', 'light', 'dark']

  export const INVALID_THEME_MESSAGE = 'Invalid theme name supplied'
  export const INVALID_THEMES_MESSAGE = 'Invalid themes array supplied'
  export const INVALID_PREFIX_MESSAGE = 'Invalid prefix string supplied'
  export const INVALID_MODE_MESSAGE = `Invalid mode string supplied, must be one of: ${VALID_MODES.join(
    ', '
  )}`
</script>

<script>
  import { onMount, afterUpdate, setContext } from 'svelte'
  import { presets } from './presets'
  import toggleTheme from '../support/toggleTheme'
  import toggleMode from '../support/toggleMode'
  import toggle from '../support/toggle'
  import setCSS from '../support/setCSS'
  import { currentTheme, currentMode, themes as themesStore } from '../support/store'

  const preferredMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  /**
   * Specify the key used for local storage
   * @type {string} [key='__svelte-themer__theme']
   */
  export let key = STORAGE_KEY
  /**
   * Specify preferred theme name
   * @type {string | null} [theme='themer'] - name of the theme to use
   */
  export let theme = 'themer'
  /**
   * Themes collection
   * @type {Object[]} themes - array of theme objects
   */
  export let themes = presets
  /**
   * Specify custom CSS variable prefix
   * @type {string | null} [prefix='theme']
   */
  export let prefix = VARIABLE_PREFIX
  /**
   * Specify preferred theme mode
   * @type {"prefers" | "dark" | "light"} [mode='prefers']
   */
  export let mode = 'auto'
  /**
   * Sites default CSS variables
   * @type {Object} [base={}]
   */
  export let base = {}

  if (!Array.isArray(themes) || !themes.length) throw new Error(INVALID_THEMES_MESSAGE)
  if (typeof prefix === 'string' && !prefix.trim().length) throw new Error(INVALID_PREFIX_MESSAGE)
  if (!VALID_MODES.includes(mode)) throw new Error(INVALID_MODE_MESSAGE)
  if (theme !== null && !themes.some(({ name }) => name === theme))
    throw new Error(INVALID_THEME_MESSAGE)

  // check for a user-defined theme value and then fallback to the
  // first theme in our themes array
  currentTheme.set(theme || themes[0].name)
  // check for a user-defined mode and then the preferred color scheme and
  // finally fallback to the default 'light' value
  currentMode.set(mode === 'auto' ? preferredMode : mode)

  $: setContext(CONTEXT_KEY, {
    current: currentTheme,
    mode: currentMode,
    toggle: toggle,
    _toggleTheme: () => toggleTheme(themes),
    _toggleMode: toggleMode,
    theme: themes.find(({ name }) => name === $currentTheme),
  })

  let value = `${$currentTheme}-${$currentMode}`
  $: value = `${$currentTheme}-${$currentMode}`
  $: console.log({ value, preferredMode })

  afterUpdate(() => {
    document.documentElement.setAttribute('data-theme', value)
    localStorage.setItem(key, value)
  })

  onMount(() => {
    themesStore.set(theme === null ? presets : themes.find(({ name }) => name === theme))
    setCSS(base, themes, prefix)

    const saved = localStorage.getItem(key)
    if (saved) {
      const [theme, mode] = saved.split('-')
      console.log({ saved, theme, mode })
      currentTheme.set(theme)
      currentMode.set(mode)
    } else localStorage.setItem(key, value)
  })
</script>

<slot>
  <!-- children -->
</slot>
