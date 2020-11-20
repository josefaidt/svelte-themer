<script>
  import { onMount, afterUpdate, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { presets } from './presets'
  export let key = '__svelte-themer__theme'
  export let themes = presets
  if (!Array.isArray(themes) || !themes.length) throw new Error('Invalid themes array supplied')

  // const stylesheet = [...document.styleSheets].find(sheet => /\/theme\.css$/.test(sheet.href))
  // const rootCSS = [...stylesheet.rules].find(rule => /^\:root$/gm.test(rule.selectorText))
  // if (!rootCSS) throw new Error('ThemeProvider is unable to recognize CSS on root element')
  // const themeCSS = [...stylesheet.rules].filter(rule =>
  //   /^html\.theme--[A-z]\w+$/gm.test(rule.selectorText)
  // )
  // if (!themeCSS.length) throw new Error('ThemeProvider is unable to recognize presence of themes')

  // const themes = themeCSS.map(theme => /(^html\.theme--)([A-z]\w+)$/g.exec(theme.selectorText)[2])
  let currentTheme = writable(themes[0].name)
  $: setContext('theme', { 
    current: currentTheme, 
    toggle: toggleTheme, 
    colors: themes.find(theme => theme.name === $currentTheme).colors
  })

  function toggleTheme() {
    let currentIndex = themes.findIndex(entry => entry.name === $currentTheme)
    if (currentIndex === themes.length - 1) currentTheme.set(themes[0].name)
    else currentTheme.set(themes[currentIndex + 1].name)
  }

  afterUpdate(function() {
    return window.localStorage.setItem(key, $currentTheme)
  })
  $: document.documentElement.className = `theme--${$currentTheme}`

  onMount(function() {
    setCSS()
    let existing = window.localStorage.getItem(key)
    if (existing && themes.some(theme => theme.name === existing)) currentTheme.set(existing)
    else window.localStorage.setItem(key, $currentTheme)
  })

  function setCSS() {
    // create root CSS and document root themes
    let template = `
    <style>
      :root {
        ${presets.map(theme => {
            let lines = []
            const create = (prop, value) => `--theme-${theme.name}-${prop}: ${value};`
            for (let [property, color] of Object.entries(theme.colors)) {
              lines.push(create(property, color))
            }
            return lines.join('\n')
          }).join('')}
        }

        ${presets.map(theme => {
          const create = (name, props) => {
            const prepped = props.map(prop => `--theme-${prop}: var(--theme-${theme.name}-${prop});`).join('\n')
            return `
              html.theme--${name} {
                ${prepped}
              }
              :global(.${name}) {
                ${prepped}
              }
          `}
          return create(theme.name, Object.keys(theme.colors))
        }).join('\n')}
      </style>
      `
    return document.head.innerHTML = `${template}\n${document.head.innerHTML}`
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
