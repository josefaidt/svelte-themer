import { createCSSVariableCollection } from '../support/css'

/**
 * @typedef {Object} ActionReturn
 * @property {Function} [update]
 * @property {Function} [destroy]
 */

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

/**
 * use:theme
 * @param {HTMLElement} node
 * @param {Object.<string, string|number>} theme
 * @returns {ActionReturn}
 */
export async function stylesheet(node, theme) {
  const stylesheet = document.createElement('style')

  function setProperties() {
    const variables = createCSSVariableCollection(theme)
    const svelteClass = Array.from(node.classList).find(className =>
      className.startsWith('s-')
    )
    let innerHTML = `${node.localName}${svelteClass ? `.${svelteClass}` : ''}{`
    for (let [name, value] of variables) {
      innerHTML += `${name}:${value};`
    }
    innerHTML += '}'
    stylesheet.innerHTML = innerHTML
    node.prepend(stylesheet)
  }

  setProperties()

  return {
    update(newTheme) {
      theme = newTheme
      setProperties()
    },
  }
}
