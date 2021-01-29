import { get } from 'svelte/store'
import processConfig from './processConfig'
import { themes as themesStore } from './store'

/**
 * Set CSS to document
 * @name setCSS
 * @param {string} prefix - CSS variable prefix
 * @param {Object[]} themes - themes array
 *
 */
export default function setCSS(prefix, base = {}) {
  const variablePrefix = prefix ? `--${prefix}` : '-'

  function createVariable(key, prop, value) {
    if (key) return `${variablePrefix}-${key}-${prop}: ${value};`
    else return `${variablePrefix}-${prop}: ${value};`
  }

  function createOverride(key, prop) {
    return `${variablePrefix}-${prop}: var(${variablePrefix}-${key}-${prop});`
  }

  const themes = get(themesStore)
  const rootCSSContent = []
  const themeCSSContent = []

  // process and add base config to root content
  const processedBaseConfig = processConfig(base)
  rootCSSContent.push(
    ...Object.entries(processedBaseConfig).map(([prop, value]) => createVariable(null, prop, value))
  )

  const rootThemeVars = []
  const rootInitialVars = []
  for (let [themeName, themeValues] of Object.entries(themes)) {
    const processed = processConfig(themeValues)
    const themeClassName = prefix ? `${prefix}--${themeName}` : themeName

    const overrides = []
    for (let [prop, value] of Object.entries(processed)) {
      // add theme vars to root theme array
      rootThemeVars.push(createVariable(themeName, prop, value))
      // add theme-specific overrides of initial variables
      overrides.push(createOverride(themeName, prop))
      // create and add initial variables
      const initialVar = createVariable(null, prop, 'initial')
      if (!rootInitialVars.includes(initialVar)) rootInitialVars.push(initialVar)
    }

    themeCSSContent.push(`
      [theme='${themeName}'],
      .${themeClassName} {
        ${overrides.join('\n\t')}
      }
    `)
  }
  // add to root
  rootCSSContent.push(...rootInitialVars)
  rootCSSContent.push(...rootThemeVars)

  const template = `
    <style>
      :root {
        ${rootCSSContent.join('\n\t')}
      }

      ${themeCSSContent.join('')}
    </style>
  `

  document.head.innerHTML = `${template.trim()}\n${document.head.innerHTML}`
}
