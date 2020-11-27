import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, getByTestId } from '@testing-library/svelte'
import { currentTheme } from '../support/store'
import presets from './presets'
import ThemeToggle from './ThemeToggle.test.svelte'

describe(ThemeToggle.name, () => {
  it('should render', () => {
    const { component } = render(ThemeToggle)
    expect(component).toBeTruthy()
  })

  it('should update store on toggle', async () => {
    const key = 'testing'
    const names = presets.map(preset => preset.name)
    const { container } = render(ThemeToggle, {
      props: {
        themes: presets,
        key,
      },
    })
    let current
    let unsub = currentTheme.subscribe(value => (current = value))
    const toggleButton = getByTestId(container, 'test-toggle')

    expect(current).toEqual(names[0])
    await fireEvent.click(toggleButton)
    expect(current).toEqual(names[1])

    return unsub()
  })
})
