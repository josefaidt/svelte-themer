import { get } from 'svelte/store'
import processConfig from './processConfig'
import { themes as themesStore } from './store'

/**
 * CSS Variable Name
 * @typedef {string} CSSVariableName
 */

/**
 * CSS Variable Statement
 * @typedef {string} CSSVariableStatement
 */

/**
 * @typedef {object} CreateCSSVariableNameInput
 * @property {string} variablePrefix
 * @property {string} prop property name
 * @property {string} [key] optional prop prefix
 *
 * Helper to create CSS Variable name string
 * @param {CreateCSSVariableNameInput}
 * @returns {CSSVariableName}
 */
export function createCSSVariableName({ variablePrefix, prop, key }) {
  if (key) return `${variablePrefix}-${key}-${prop}`
  else return `${variablePrefix}-${prop}`
}

/**
 * Helper to merge variable name and value to create statement
 * @param {CSSVariableName} variableName CSS Variable name
 * @param {string} value CSS Variable Value
 * @returns {CSSVariableStatement}
 */
export function createCSSVariableStatement(variableName, value) {
  return `${variableName}: ${value};`
}

/**
 * @typedef {object} CreateCSSVariableOverrideInput
 * @property {string} variablePrefix
 * @property {string} prop property name
 * @property {string} [key] optional prop prefix
 *
 * Helper to create variable overrides for themed use
 * @param {CreateCSSVariableOverrideInput}
 * @returns {string}
 */
export function createCSSVariableOverride({ variablePrefix, prop, key }) {
  return `${variablePrefix}-${prop}: var(${variablePrefix}-${key}-${prop});`
}

/**
 * Create CSS template
 * @name setCSS
 * @param {string} prefix - CSS variable prefix
 * @param {Object[]} themes - themes array
 * @returns {string} CSS template
 */
export function createCSS(prefix, base = {}) {
  const variablePrefix = prefix ? `--${prefix}` : '-'

  const themes = get(themesStore)

  // process and add base config to root content
  const processedBaseConfig = processConfig(base)

  const baseCSSVariables = Object.entries(processedBaseConfig).map(
    ([prop, value]) => [createCSSVariableName({ variablePrefix, prop }), value]
  )
  const rootCSSVariables = [].concat(baseCSSVariables)
  const themeCSSContent = []

  for (let [themeName, themeValues] of Object.entries(themes)) {
    const processed = processConfig(themeValues)

    const overrides = []
    for (let [prop, value] of Object.entries(processed)) {
      // create and add initial variables
      const initialVariableName = createCSSVariableName({
        variablePrefix,
        prop,
      })
      // do not add initial variable if provided by base
      if (
        !rootCSSVariables.some(
          ([variableName]) => variableName === initialVariableName
        )
      ) {
        rootCSSVariables.push([initialVariableName, value])
      }
      // add theme vars to root theme array
      rootCSSVariables.push([
        createCSSVariableName({ variablePrefix, prop, key: themeName }),
        value,
      ])
      // add theme-specific overrides of initial variables
      overrides.push(
        createCSSVariableOverride({
          variableName: createCSSVariableName({ variablePrefix, prop }),
          prop,
          key: themeName,
        })
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
