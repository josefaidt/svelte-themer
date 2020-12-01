<script context="module">
  export const STORAGE_KEY = '__svelte-themer__theme'
  export const CONTEXT_KEY = 'theme'
  export const MODE_KEY = 'theme--mode'
  export const VARIABLE_PREFIX = 'theme'
  export const INVALID_THEMES_MESSAGE = 'Invalid themes array supplied'
  export const INVALID_PREFIX_MESSAGE = 'Invalid prefix string supplied'
</script>

<script>
  import { onMount, afterUpdate, setContext } from 'svelte'
  import presets from './presets'
  import setCSS from '../support/setCSS'
  import toggleTheme from '../support/toggleTheme'
  import toggleMode from '../support/toggleMode'
  import { currentMode, currentTheme } from '../support/store'

  // detect dark mode
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  /**
   * Specify the key used for local storage
   * @type {string} [key='__svelte-themer__theme']
   */
  export let key = STORAGE_KEY
  /**
   * Themes
   * @type {string} themes - name of the theme to use
   */
  export let theme = null
  /**
   * Themes
   * @type {Object[]} themes - array of theme objects
   */
  export let themes = presets
  /**
   * Specify custom CSS variable prefix
   * @type {string | null} [prefix='theme']
   */
  export let prefix = VARIABLE_PREFIX
  /** Mode
   * @type {string} mode The preferred color scheme (defaults to 'light')
   */
  export let mode = null
  /**
   * Sites default CSS variables
   * @type {Object}
   */
  export let base = {}

  if (!Array.isArray(themes) || !themes.length) throw new Error(INVALID_THEMES_MESSAGE)
  if (typeof prefix === 'string' && !prefix.trim().length) throw new Error(INVALID_PREFIX_MESSAGE)

  // check for a user-defined theme value and then fallback to the
  // first theme in our themes array
  currentTheme.set(theme || themes[0].name)
  // check for a user-defined mode and then the preferred color scheme and
  // finally fallback to the default 'light' value
  currentMode.set(mode || darkModeQuery.matches ? 'dark' : 'light')

  $: setContext(CONTEXT_KEY, {
    current: currentTheme,
    mode: currentMode,
    toggle: () => toggleTheme(themes, $currentTheme),
    toggleMode: () => toggleMode($currentMode),
    theme: themes.find(({ name }) => name === $currentTheme),
  })

  afterUpdate(() => {
    document.documentElement.setAttribute('data-theme', `${prefix}--${$currentTheme}`)
    localStorage.setItem(key, $currentTheme)

    localStorage.setItem(MODE_KEY, $currentMode)
    document.documentElement.setAttribute('data-theme-mode', $currentMode)
  })

  onMount(() => {
    setCSS(base, themes, prefix)

    const savedTheme = localStorage.getItem(key)
    const savedMode = localStorage.getItem(MODE_KEY)

    if (!theme && savedTheme && themes.some(({ name }) => name === savedTheme)) currentTheme.set(savedTheme)
    else localStorage.setItem(key, $currentTheme)

    if (!mode && savedMode) currentMode.set(savedMode)
    else localStorage.setItem(MODE_KEY, $currentMode)
  })
</script>

<slot>
  <!-- children -->
</slot>
