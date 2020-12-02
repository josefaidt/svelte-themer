/**
 * Create CSS Variables from theme object
 * @name createCSSVariables
 * @param {string} prefix - CSS variable prefix
 * @param {Object} theme - theme object
 * @param {string} theme.name - theme name
 * @param {Object} theme.colors - theme color palette
 *
 */
// export default function createCSSVariables(prefix, theme) {
export default function createCSSVariables(prefix, themeName, themeVariableNames, themeVariables) {
  return themeVariableNames
    .map(variableName => {
      // returns base variables
      if (!themeName) {
        return `${prefix}${variableName}: ${themeVariables[variableName]};`
      }

      // returns theme variable
      if (themeVariables) {
        return `${prefix}${themeName}-${variableName}: ${themeVariables[variableName]};`
      }

      // returns global theme overrides of current theme
      return `${prefix}${variableName}: var(${prefix}${themeName}-${variableName});`
    })
    .join('\n\t')
}
