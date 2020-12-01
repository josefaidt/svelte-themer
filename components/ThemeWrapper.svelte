<script context="module">
  export const storageKey = '__svelte-themer__theme'
  export const contextKey = 'theme'
</script>

<script>
  import { onMount, afterUpdate, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { presets } from './presets'
  import setCSS from '../support/setCSS'

  // detect dark mode
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')

  /**
   * Specify the key used for local storage
   * @type {string} [key='__svelte-themer__theme']
   */
  export let key = storageKey
  /**
   * Dark mode localStorage key
   * @type {string}
   */
  const darkModeLSKey = `${key}__mode`
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
   * Mode
   * @type {string} mode The preferred color scheme (defaults to 'light')
   */
  export let mode = null
  /**
   * Sites default CSS variables
   * @type {Object}
   */
  export let base = {}

  if (!Array.isArray(themes) || !themes.length) throw new Error('Invalid themes array supplied')

  // check for a user-defined theme value and then fallback to the
  // first theme in our themes array
  let currentTheme = writable(theme || themes[0].name)
  // check for a user-defined mode and then the preferred color scheme and
  // finally fallback to the default 'light' value
  let currentMode = writable(mode || darkModeQuery.matches ? 'dark' : 'light')

  $: setContext(contextKey, {
    current: currentTheme,
    mode: currentMode,
    toggle: toggleTheme,
    toggleMode: toggleDarkMode,
    theme: themes.find(({ name }) => name === $currentTheme),
  })

  function toggleTheme() {
    let currentIndex = themes.findIndex(({ name }) => name === $currentTheme)
    if (currentIndex === themes.length - 1) currentTheme.set(themes[0].name)
    else currentTheme.set(themes[currentIndex + 1].name)
  }

  function toggleDarkMode() {
    const mode = $currentMode === 'dark' ? 'light' : 'dark'
    currentMode.set(mode)
  }

  afterUpdate(() => {
    document.documentElement.setAttribute('data-theme', `theme--${$currentTheme}`)
    localStorage.setItem(key, $currentTheme)

    localStorage.setItem(darkModeLSKey, $currentMode)
    document.documentElement.setAttribute('data-theme-mode', $currentMode)
  })

  onMount(() => {
    setCSS(base, themes)

    const savedTheme = localStorage.getItem(key)
    const savedMode = localStorage.getItem(darkModeLSKey)

    if (!theme && savedTheme && themes.some(({ name }) => name === savedTheme))
      currentTheme.set(savedTheme)
    else localStorage.setItem(key, $currentTheme)

    if (!mode && savedMode) currentMode.set(savedMode)
    else localStorage.setItem(darkModeLSKey, $currentMode)
  })
</script>

<slot>
  <!-- children -->
</slot>
