import { describe, it, beforeEach, expect } from 'vitest'
import { currentThemeName } from '../support/store'
import { presets } from '../components/presets'
import ThemeToggle from './ThemeToggle.test.svelte'

describe(ThemeToggle.name, () => {
  const createTestComponent = (props = {}) => {
    const host = document.createElement('div')
    host.setAttribute('id', 'host')
    document.body.appendChild(host)
    const instance = new ThemeToggle({ target: host, props: props })
    return instance
  }

  it('should render', () => {
    const instance = createTestComponent()
    expect(instance).toBeTruthy()
  })

  it('should update store on toggle', async () => {
    const key = 'testing'
    const names = Object.keys(presets)
    const instance = createTestComponent({
      themes: presets,
      key,
    })
    let current
    let unsub = currentThemeName.subscribe(value => (current = value))
    // const toggleButton = getByTestId(container, 'test-toggle')

    expect(current).toEqual(names[0])
    // await fireEvent.click(toggleButton)
    expect(current).toEqual(names[1])

    return unsub()
  })
})
