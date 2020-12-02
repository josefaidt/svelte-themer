import createVariables from './createCSSVariables'
import processConfig from './processConfig'

/**
 * Set CSS to document
 * @name setCSS
 * @param {string} prefix - CSS variable prefix
 * @param {Object[]} themes - themes array
 *
 */
export default function setCSS(base = {}, themes = [], prefix = 'theme') {
  const rootCSSContent = []
  const themeCSSContent = []
  const prefixed = prefix ? `--${prefix}-` : '--'
  const baseConfig = processConfig(base)
  const baseVariables = createVariables(prefixed, null, Object.keys(baseConfig), baseConfig)

  rootCSSContent.push(baseVariables)

  themes.forEach(theme => {
    const { name, light = {}, dark = {} } = theme

    const themeName = `${prefix}--${name}`
    const defaultConfig = processConfig(light, name)
    const defaultVariables = Object.keys(defaultConfig)
    const defaultThemeVariables = createVariables(prefixed, name, defaultVariables, defaultConfig)

    const darkConfig = processConfig(dark, name)
    const darkThemeVariables = createVariables(prefixed, name, Object.keys(darkConfig), darkConfig)

    const themeVariables = createVariables(prefixed, name, defaultVariables)

    rootCSSContent.push(defaultThemeVariables)

    themeCSSContent.push(`
      [data-theme="${themeName}"],
      .${themeName} {
        ${themeVariables}
      }

      [data-theme-mode="dark"][data-theme="${themeName}"],
      [data-theme-mode="dark"] .${themeName} {
        ${darkThemeVariables}
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
