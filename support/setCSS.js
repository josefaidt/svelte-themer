/**
 * Set CSS to document
 * @name setCSS
 * @param {string} prefix - CSS variable prefix
 * @param {Object[]} themes - themes array
 *
 */
export default function setCSS(prefix, themes) {
  // create root CSS and document root themes
  const variablePrefix = prefix ? `--${prefix}-` : `--`
  let template = `
  <style>
    :root {
      ${themes
        .map(theme => {
          let lines = []
          const create = (prop, value) => `${variablePrefix}${theme.name}-${prop}: ${value};`
          for (let [property, color] of Object.entries(theme.colors)) {
            lines.push(create(property, color))
          }
          return lines.join('\n')
        })
        .join('')}
      }

      ${themes
        .map(theme => {
          const create = (name, props) => {
            const prepped = props
              .map(prop => `${variablePrefix}${prop}: var(${variablePrefix}${theme.name}-${prop});`)
              .join('\n')
            return `
            .theme--${name} {
              ${prepped}
            }
            :global(.${name}) {
              ${prepped}
            }
        `
          }
          return create(theme.name, Object.keys(theme.colors))
        })
        .join('\n')}
    </style>
    `
  document.head.innerHTML = `${template}\n${document.head.innerHTML}`
}
