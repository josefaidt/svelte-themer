import { get } from 'svelte/store'
import createVariables from './createCSSVariables'
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
  const themes = get(themesStore)

  const rootCSSContent = []
  const themeCSSContent = []
  const prefixed = prefix ? `--${prefix}-` : '--'
  const baseConfig = processConfig(base)
  const baseVariables = createVariables(prefixed, null, Object.keys(baseConfig), baseConfig)

  rootCSSContent.push(baseVariables)

  themes.forEach(theme => {
    const { name, light = {}, dark = {} } = theme

    const lightConfig = processConfig(light, name)
    const lightVariables = Object.keys(lightConfig)
    const lightThemeVariables = createVariables(prefixed, name, lightVariables, lightConfig)

    const darkConfig = processConfig(dark, name)
    const darkThemeVariables = createVariables(prefixed, name, Object.keys(darkConfig), darkConfig)

    const themeVariables = createVariables(prefixed, name, lightVariables)

    rootCSSContent.push(lightThemeVariables)

    themeCSSContent.push(`
      [data-theme="${name}-light"],
      .${prefix}--${name}-light {
        ${lightThemeVariables}
      }

      [data-theme="${name}-dark"],
      .${prefix}--${name}-dark {
        ${darkThemeVariables}
      }

      [data-theme^="${name}"] {
        ${themeVariables}
      }

      :global(.${name}) {
        ${themeVariables}
      }`)
  })

  const style = `
    <style>
      :root {
        ${rootCSSContent.join('\n')}
      }

      ${themeCSSContent.join('\n')}
    </style>
  `

  document.head.innerHTML = `${style}\n${document.head.innerHTML}`
}
