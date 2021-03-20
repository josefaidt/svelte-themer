import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, getByTestId } from '@testing-library/svelte'
import { currentThemeName } from '../support/store'
import { presets } from './presets'
import ThemeToggle from './ThemeToggle.test.component'

describe(ThemeToggle.name, () => {
  let TestHarness

  beforeEach(() => {
    TestHarness = props => render(ThemeToggle, { props })
  })

  it('should render', () => {
    const { component } = TestHarness()
    expect(component).toBeTruthy()
  })

  it('should update store on toggle', async () => {
    const key = 'testing'
    const names = Object.keys(presets)
    const { container } = TestHarness({
      themes: presets,
      key,
    })
    let current
    let unsub = currentThemeName.subscribe(value => (current = value))
    const toggleButton = getByTestId(container, 'test-toggle')

    expect(current).toEqual(names[0])
    await fireEvent.click(toggleButton)
    expect(current).toEqual(names[1])

    return unsub()
  })
})
