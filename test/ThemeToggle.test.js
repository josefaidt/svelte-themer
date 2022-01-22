import { describe, expect, it } from 'vitest'
import { currentThemeName } from '../support/store'
import { presets } from '../components/presets'
import ThemeToggle from './ThemeToggle.test.svelte'

describe(ThemeToggle.name, () => {
  const render = (props = {}) => {
    const host = document.createElement('div')
    host.setAttribute('id', 'host')
    document.body.appendChild(host)
    const instance = new ThemeToggle({ target: host, props: props })
    return instance
  }

  it('should render', () => {
    const instance = render()
    expect(instance).toBeTruthy()
  })

  it('should update store on toggle', async () => {
    const key = 'testing'
    const names = Object.keys(presets)
    const instance = render({
      themes: presets,
      key,
    })
    let current
    let unsub = currentThemeName.subscribe(value => (current = value))
    const toggleButton = document.querySelector('[data-testid="test-toggle"]')

    expect(current).toEqual(names[0])
    toggleButton.click()
    expect(current).toEqual(names[1])

    return unsub()
  })
})
