<script>
  import { setContext, onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { presets } from './presets.js'
  // setup initial theming
  export let themes = [...presets]
  export let storageKey = '__svelte-themer__theme'
  // internal state, useful for quickly setting CSS vars without subscribing
  let _current = themes[0].name
  // temporary
  let _storage = {
    // name of choice
    n: themes[0].name,
  }

  export let base = {
    colors: {
      text: '#282230',
    },
    prefix: 'base',
  }

  // utility to get current theme from name
  const getCurrentTheme = name => themes.find(h => h.name === name)
  
  // set up writeable store
  let Theme = writable(getCurrentTheme(_current))

  setContext("theme", {
    theme: Theme,
    toggle: () => {
      // update internal state
      let _currentIndex = themes.findIndex(h => h.name === _current)
      _current = themes[_currentIndex === themes.length - 1 ? 0 : (_currentIndex += 1)].name
      // update Theme store
      Theme.update(t => ({...t, ...getCurrentTheme(_current) }));
      // updatte cached theme choice
      localStorage.setItem(storageKey, _current)
      // update CSS vars
      setRootColors(getCurrentTheme(_current));
    }
  })


  onMount(() => {
    let storedThemeChoice = localStorage.getItem(storageKey)
    if (storedThemeChoice) {
      // update Theme store with cached theme choice
      if (!getCurrentTheme(storedThemeChoice)) {
        // break
      } else {
        if (isNaN(parseInt(storedThemeChoice)) && getCurrentTheme(storedThemeChoice)) {
          Theme.set(getCurrentTheme(storedThemeChoice))
          _current = storedThemeChoice
        }
      }
    } else {
      // set default internal state if cached choice does not exist
      localStorage.setItem(storageKey, _current)
    }
    // set CSS vars on mount
    setRootColors(base)
    setRootColors(getCurrentTheme(_current))
  })

  // sets CSS vars for easy use in components
  // ex: var(--theme-background)
  const setRootColors = theme => {
    for (let [prop, color] of Object.entries(theme.colors)) {
      let varString = `--theme-${prop}`
      if (theme.prefix) {
        varString = `--theme-${theme.prefix}-${prop}`
      }
      document.documentElement.style.setProperty(varString, color);
    }
    document.documentElement.style.setProperty('--theme-name', theme.name);
  }
</script>

<style>
  :global(html) {
    background-color: var(--theme-background);
    color: var(--theme-text);
  }
</style>

<slot>
  <!-- children -->
</slot>