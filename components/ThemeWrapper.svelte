<script context="module">
  export const STORAGE_KEY = '__svelte-themer__theme'
  export const CONTEXT_KEY = 'theme'
  export const VARIABLE_PREFIX = 'theme'
  export const INVALID_THEMES_MESSAGE = 'Invalid themes array supplied'
  export const INVALID_PREFIX_MESSAGE = 'Invalid prefix string supplied'
</script>

<script>
  import { onMount, afterUpdate, setContext } from 'svelte'
  import presets from './presets'
  import setCSS from '../support/setCSS'
  import toggleTheme from '../support/toggleTheme'
  import { currentTheme } from '../support/store'

  /**
   * Specify the key used for local storage
   * @type {string} [key='__svelte-themer__theme']
   */
  export let key = STORAGE_KEY
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

  if (!Array.isArray(themes) || !themes.length) throw new Error(INVALID_THEMES_MESSAGE)
  if (typeof prefix === 'string' && !prefix.trim().length) throw new Error(INVALID_PREFIX_MESSAGE)

  currentTheme.set(themes[0].name)
  onMount(function () {
    setCSS(prefix, themes)
    let existing = window.localStorage.getItem(key)
    if (existing && themes.some(theme => theme.name === existing)) currentTheme.set(existing)
    else window.localStorage.setItem(key, $currentTheme)
  })

  $: setContext(CONTEXT_KEY, {
    current: currentTheme,
    toggle: () => toggleTheme(themes, $currentTheme),
    colors: themes.find(theme => theme.name === $currentTheme).colors,
  })

  afterUpdate(function () {
    return window.localStorage.setItem(key, $currentTheme)
  })

  $: document.documentElement.className = `theme--${$currentTheme}`
</script>

<slot>
  <!-- children -->
</slot>
