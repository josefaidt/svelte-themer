<script context="module">
  export const storageKey = '__svelte-themer__theme'
  export const contextKey = 'theme'
</script>

<script>
  import { onMount, afterUpdate, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { presets } from './presets'
  import setCSS from '../support/setCSS'

  /**
   * Specify the key used for local storage
   * @type {string} [key='__svelte-themer__theme']
   */
  export let key = storageKey
  /**
   * Themes
   * @type {Object[]} themes - array of theme objects
   */
  export let themes = presets
  /**
   * Dark mode flag
   * @type {Boolean}
   */
  export let darkmode = false;
  /**
   * Sites default CSS variables
   * @type {Object}
   */
  export let base = {}

  if (!Array.isArray(themes) || !themes.length) throw new Error('Invalid themes array supplied')

  let currentTheme = writable(themes[0].name)
  let darkMode = writable(darkmode)

  $: setContext(contextKey, {
    current: currentTheme,
    darkmode: darkMode,
    toggle: toggleTheme,
    toggleMode: toggleDarkMode,
    theme: themes.find(theme => theme.name === $currentTheme),
  })

  function toggleTheme() {
    let currentIndex = themes.findIndex(entry => entry.name === $currentTheme)
    if (currentIndex === themes.length - 1) currentTheme.set(themes[0].name)
    else currentTheme.set(themes[currentIndex + 1].name)
  }

  function toggleDarkMode() {
    document.documentElement.setAttribute('data-theme-mode', $darkMode ? '' : 'dark');
    darkMode.set(!$darkMode);
  }

  afterUpdate(function (){
    return window.localStorage.setItem(key, $currentTheme)
  })
  $: document.documentElement.setAttribute('data-theme', `theme--${$currentTheme}`);

  onMount(function () {
    setCSS(base, themes)
    let existing = window.localStorage.getItem(key)
    if (existing && themes.some(theme => theme.name === existing)) currentTheme.set(existing)
    else window.localStorage.setItem(key, $currentTheme)

    document.documentElement.setAttribute('data-theme-mode', $darkMode ? 'dark' : '');
  })
</script>

<slot>
  <!-- children -->
</slot>

<style>
  :global(html) {
    background-color: var(--theme-background-color, initial);
    color: var(--theme-text-color, initial);
  }
</style>
