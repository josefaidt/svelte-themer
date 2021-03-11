import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/svelte'
import ThemeWrapper, {
  STORAGE_KEY,
  INVALID_THEMES_MESSAGE,
  INVALID_PREFIX_MESSAGE,
} from './ThemeWrapper'
import { presets } from './presets'

describe(ThemeWrapper.name, () => {
  let style
  let getCSSVar
  let TestHarness

  beforeEach(() => {
    TestHarness = props => render(ThemeWrapper, { props })
    style = doc =>
      Array.from(doc.styleSheets).reduce((acc, sheet) => {
        let rules = Array.from(sheet.cssRules)
        if (rules.some(rule => rule.selectorText === ':root')) {
          acc = rules.find(rule => rule.selectorText === ':root')?.style
        }
        return acc
      }, {})
    getCSSVar = cssVarName => style(document).getPropertyValue(cssVarName)
  })

  afterEach(() => {
    document.querySelectorAll('style').forEach(sheet => sheet.remove())
  })

  it('should render', () => {
    const { component } = TestHarness()
    expect(component).toBeTruthy()
    expect(localStorage.getItem(STORAGE_KEY)).toBeTruthy()
  })

  it('should use custom storage key', () => {
    const key = 'my-custom-key'
    const results = TestHarness({ key })
    expect(localStorage.getItem(key)).toEqual(Object.keys(presets)[0])
  })

  it('should disable persistent storage with null key', () => {
    const key = null
    const results = TestHarness({ key })
    expect(localStorage.getItem(key)).toBeFalsy()
  })

  it('should throw error if supplied with empty themes', () => {
    expect(() => TestHarness({ themes: {} })).toThrow(INVALID_THEMES_MESSAGE)
  })

  describe('prefix prop', () => {
    it('should use custom CSS Variables prefix', () => {
      const { container } = TestHarness({
        prefix: 'custom-theme',
        themes: { test: { colors: { primary: 'blue' } } },
      })
      expect(getCSSVar('--custom-theme-test-colors-primary')).toBeTruthy()
    })

    it('should not use CSS Variables prefix when prefix is null', () => {
      const { container } = TestHarness({ prefix: null })
      expect(getCSSVar('--colors-text')).toBeTruthy()
    })

    it('should error prefix is an empty string', () => {
      expect(() => TestHarness({ prefix: '' })).toThrow(INVALID_PREFIX_MESSAGE)
    })
  })

  describe('server-side context', () => {
    const { window } = global
    beforeEach(() => {
      delete global.window
    })
    afterAll(() => {
      global.window = window
    })
    it('should not fail to render', () => {
      const { component } = TestHarness()
      expect(component).toBeTruthy()
    })
  })
})
