export default function setCSS(themes) {
  // create root CSS and document root themes
  let template = `
  <style>
    :root {
      ${themes
        .map(theme => {
          let lines = []
          const create = (prop, value) => `--theme-${theme.name}-${prop}: ${value};`
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
            const prepped = props.map(prop => `--theme-${prop}: var(--theme-${theme.name}-${prop});`).join('\n')
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
