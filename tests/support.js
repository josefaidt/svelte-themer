export function render(Component, props = {}) {
  const host = document.createElement('div')
  host.setAttribute('id', 'host')
  document.body.appendChild(host)
  const instance = new Component({ target: host, props })
  return instance
}

export function getByTestId(id) {
  return document.querySelector(`[data-testid="${id}"]`)
}
