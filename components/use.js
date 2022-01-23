import { createCSSVariableCollection } from '../support/css'

/**
 *
 * @param {HTMLElement} node
 * @param {Object.<string, string|number>} theme
 * @returns
 */
export async function theme(node, theme) {
  /**
   *
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

  const variables = createCSSVariableCollection(theme)
  for (let [name, value] of variables) {
    setProperty(name, value)
  }

  return {}
}
