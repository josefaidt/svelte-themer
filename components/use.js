import { createCSSVariableCollection } from '../support/css'

/**
 * @typedef {Object} ActionReturn
 * @property {Function} [update]
 * @property {Function} [destroy]
 */

/**
 * use:theme
 * @param {HTMLElement} node
 * @param {Object.<string, string|number>} theme
 * @returns {ActionReturn}
 */
export async function theme(node, theme) {
  /**
   * setProperty helper with `window` support
   * @param {string} name
   * @param {string} value
   * @returns {void}
   */
  function setProperty(name, value) {
    if (!node.style && node.document?.documentElement) {
      node.document.documentElement.style.setProperty(name, value)
      return
    }
    node.style.setProperty(name, value)
    return
  }

  function setProperties() {
    const variables = createCSSVariableCollection(theme)
    for (let [name, value] of variables) {
      setProperty(name, value)
    }
  }

  return {
    update(newTheme) {
      theme = newTheme
      setProperties()
    },
  }
}
