<script>
  import { setContext, onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { presets } from './presets.js'
  // setup initial theming
  export let themes = [...presets]
  export let storageKey = '__svelte-themer__theme'
  // internal state, useful for quickly setting CSS vars without subscribing
  let _current = 0

  export let base = {
    colors: {
      text: '#282230',
    },
    prefix: 'base',
  }

  let Theme = writable(themes[_current])

  setContext("theme", {
    theme: Theme,
    toggle: () => {
      // update internal state
      _current = _current === themes.length - 1 ? 0 : (_current += 1)
      // update Theme store
      Theme.update(t => themes[_current]);
      // updatte cached theme choice
      localStorage.setItem(storageKey, _current)
      // update CSS vars
      setRootColors(themes[_current]);
    }
  })



  onMount(() => {
    let storedThemeChoice = localStorage.getItem(storageKey)
    if (storedThemeChoice) {
      // update Theme store with cached theme choice
      Theme.update(t => themes[parseInt(storedThemeChoice)])
      _current = parseInt(storedThemeChoice)
    } else {
      // set default internal state if cached choice does not exist
      localStorage.setItem(storageKey, _current)
    }
    // set CSS vars on mount
    setRootColors(base)
    setRootColors(themes[_current])
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