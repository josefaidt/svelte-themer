import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/svelte'
import ThemeWrapper, {
  STORAGE_KEY,
  INVALID_THEMES_MESSAGE,
  INVALID_PREFIX_MESSAGE,
} from './ThemeWrapper'
import presets from './presets'

const TestHarness = (props) => render(ThemeWrapper, { props })

const getCSSVar = (node, cssVarName) => getComputedStyle(node).getPropertyValue(cssVarName)

describe(ThemeWrapper.name, () => {
  it('should render', () => {
    const { component } = render(ThemeWrapper)
    expect(component).toBeTruthy()
    expect(localStorage.getItem(STORAGE_KEY)).toBeTruthy()
  })

  it('should use custom storage key', () => {
    const key = 'my-custom-key'
    const results = TestHarness({ key })
    expect(localStorage.getItem(key)).toEqual(presets[0].name)
  })

  it('should throw error if supplied with empty themes', () => {
    expect(() => TestHarness({ themes: [] })).toThrow(INVALID_THEMES_MESSAGE)
  })

  describe('prefix prop', () => {
    it('should use custom CSS Variables prefix', () => {
      const { container } = TestHarness({ prefix: 'custom-theme'})
      expect(getCSSVar(container.parentElement, '--custom-theme-text-color')).toBeTruthy()
    })

    it('should not use CSS Variables prefix when prefix is null', () => {
      const { container } = TestHarness({ prefix: null })
      // TODO: fix root custom props from other ThemeWrapper renders, causes this line to fail
      // expect(getCSSVar('--theme-text')).toBeFalsy()
      expect(getCSSVar(container.parentElement, '--text-color')).toBeTruthy()
    })

    it('should error prefix is an empty string', () => {
      expect(() => TestHarness({ prefix: '' })).toThrow(INVALID_PREFIX_MESSAGE)
    })
  })
})
