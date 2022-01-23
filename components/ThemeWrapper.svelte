<script context="module">
  export const STORAGE_KEY = '__svelte-themer__theme'
  export const CONTEXT_KEY = 'theme'
  export const VARIABLE_PREFIX = 'theme'
  export const VALID_MODES = ['auto', 'light', 'dark']

  export const INVALID_THEMES_MESSAGE = 'Invalid themes object supplied'
  export const INVALID_PREFIX_MESSAGE = 'Invalid prefix string supplied'
  export const INVALID_MODE_MESSAGE = `Invalid mode string supplied, must be one of: ${VALID_MODES.join(
    ', '
  )}`
</script>

<script>
  import { onMount, afterUpdate, setContext } from 'svelte'
  import { presets } from './presets'
  import toggle from '../support/toggle'
  import { createCSSTemplate } from '../support/css'
  import {
    currentThemeName,
    currentThemeObject,
    currentMode,
    themes as themesStore,
  } from '../support/store'
  import isObject from '../support/isObject'

  /**
   * Specify the key used for local storage
   * @type {string} [key='__svelte-themer__theme']
   */
  export let key = STORAGE_KEY
  /**
   * Themes collection
   * @type {Object} themes - theme object
   */
  export let themes = presets
  /**
   * Sets the specified theme as active
   * @type {string | null} [theme='dark']
   */
  export let theme = null
  /**
   * Specify custom CSS variable prefix
   * @type {string | null} [prefix='theme']
   */
  export let prefix = VARIABLE_PREFIX
  /**
   * Specify preferred theme mode
   * @type {"auto" | "dark" | "light"} [mode='auto']
   */
  export let mode = 'auto'
  /**
   * Site default CSS variables
   * @type {Object} [base={}]
   */
  export let base = {}

  if (!isObject(themes) || !Object.keys(themes).length)
    throw new Error(INVALID_THEMES_MESSAGE)
  if (typeof prefix === 'string' && !prefix.trim().length)
    throw new Error(INVALID_PREFIX_MESSAGE)
  if (!VALID_MODES.includes(mode)) throw new Error(INVALID_MODE_MESSAGE)

  themesStore.set(themes)
  const [fallback] = Object.keys(themes)
  if (!Object.keys(themes).includes($currentThemeName)) {
    currentThemeName.set(fallback)
  }
  $: currentThemeObject.set(themes[$currentThemeName])

  // create CSS
  const style = createCSSTemplate(prefix, base, themes)

  setContext(CONTEXT_KEY, {
    current: currentThemeName,
    toggle,
    theme: currentThemeName,
  })

  onMount(() => {
    // detect dark mode
    const darkSchemeQuery = matchMedia('(prefers-color-scheme: dark)')
    // determine the users preferred mode
    const preferredMode = darkSchemeQuery.matches ? 'dark' : 'light'
    // listen for media query status change
    darkSchemeQuery.addEventListener(
      'change',
      ({ matches }) =>
        mode === 'auto' && currentMode.set(matches ? 'dark' : 'light')
    )

    // loading order: saved, prefers, fallback
    const saved = key ? localStorage && localStorage.getItem(key) : null

    if (theme && themes[theme]) {
      currentThemeName.set(theme)
    } else if (saved && themes[saved]) {
      currentThemeName.set(saved)
    } else {
      if (mode === 'auto' && preferredMode && themes[preferredMode]) {
        currentThemeName.set(preferredMode)
      } else if (['light', 'dark'].includes(mode) && themes[mode]) {
        currentThemeName.set(mode)
      } else {
        currentThemeName.set(fallback)
      }
    }

    return () =>
      key && localStorage && localStorage.setItem(key, $currentThemeName)
  })

  afterUpdate(() => {
    if (document)
      document.documentElement.setAttribute('theme', $currentThemeName)
    if (key && localStorage) localStorage.setItem(key, $currentThemeName)
  })
</script>

<svelte:head>
  {@html style}
</svelte:head>

<slot>
  <!-- children -->
</slot>
