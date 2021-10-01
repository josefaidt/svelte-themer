import { get } from 'svelte/store'
import processConfig from './processConfig'
import { themes as themesStore } from './store'

/**
 * CSS Variable Name
 * @typedef {string} VariableName
 */

/**
 * Set CSS to document
 * @name setCSS
 * @param {string} prefix - CSS variable prefix
 * @param {Object[]} themes - themes array
 * @returns {string} CSS template
 */
export function createCSS(prefix, base = {}) {
  const variablePrefix = prefix ? `--${prefix}` : '-'

  /**
   * Helper to create CSS Variable name string
   * @param {string} prop property name
   * @param {string} [key] optional prop prefix
   * @returns {VariableName}
   */
  function createCSSVariableName(prop, key) {
    if (key) return `${variablePrefix}-${key}-${prop}`
    else return `${variablePrefix}-${prop}`
  }

  /**
   * Helper to merge variable name and value to create statement
   * @param {VariableName} variableName CSS Variable name
   * @param {string} value CSS Variable Value
   */
  function createCSSVariableStatement(variableName, value) {
    return `${variableName}: ${value};`
  }

  /**
   * Helper to create variable overrides for themed use
   * @param {VariableName} variableName CSS Variable name
   * @param {string} prop theme property
   * @param {string} key theme key
   * @returns {string}
   */
  function createCSSVariableOverride(variableName, prop, key) {
    return `${variablePrefix}-${prop}: var(${variablePrefix}-${key}-${prop});`
  }

  const themes = get(themesStore)

  // process and add base config to root content
  const processedBaseConfig = processConfig(base)

  const baseCSSVariables = Object.entries(processedBaseConfig).map(
    ([prop, value]) => [createCSSVariableName(prop), value]
  )
  const rootCSSVariables = [].concat(baseCSSVariables)
  const themeCSSContent = []

  for (let [themeName, themeValues] of Object.entries(themes)) {
    const processed = processConfig(themeValues)

    const overrides = []
    for (let [prop, value] of Object.entries(processed)) {
      // create and add initial variables
      const initialVariableName = createCSSVariableName(prop)
      // do not add initial variable if provided by base
      if (
        !rootCSSVariables.some(
          ([variableName]) => variableName === initialVariableName
        )
      ) {
        rootCSSVariables.push([initialVariableName, value])
      }
      // add theme vars to root theme array
      rootCSSVariables.push([createCSSVariableName(prop, themeName), value])
      // add theme-specific overrides of initial variables
      overrides.push(
        createCSSVariableOverride(createCSSVariableName(prop), prop, themeName)
      )
    }

    const themeCSSClassName = prefix ? `${prefix}--${themeName}` : themeName
    themeCSSContent.push(`
      [theme='${themeName}'],
      .${themeCSSClassName} {
        ${overrides.join('\n\t')}
      }
    `)
  }
  // add to root

  const template = `
    <style>
      :root {
        ${rootCSSVariables
          .map(vars => createCSSVariableStatement(...vars))
          .join('\n\t')}
      }

      ${themeCSSContent.join('')}
    </style>
  `

  return template.trim()
}
