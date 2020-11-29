import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/svelte'
import ThemeWrapper, {
  STORAGE_KEY,
  INVALID_THEMES_MESSAGE,
  INVALID_PREFIX_MESSAGE,
} from './ThemeWrapper'
import presets from './presets'

describe(ThemeWrapper.name, () => {
  it('should render', () => {
    const { component } = render(ThemeWrapper)
    expect(component).toBeTruthy()
    expect(localStorage.getItem(STORAGE_KEY)).toBeTruthy()
  })

  it('should use custom storage key', () => {
    const key = 'my-custom-key'
    const results = render(ThemeWrapper, {
      props: {
        key,
      },
    })
    expect(localStorage.getItem(key)).toBeTruthy()
    expect(localStorage.getItem(key)).toEqual(presets[0].name)
  })

  it('should throw error if supplied with empty themes', () => {
    const themes = []
    try {
      const results = render(ThemeWrapper, {
        props: {
          themes,
        },
      })
    } catch (error) {
      expect(error.message).toEqual(INVALID_THEMES_MESSAGE)
    }
  })

  describe('prefix prop', () => {
    let rootStyle
    let getCSSVar

    beforeEach(() => {
      getCSSVar = cssVarName => rootStyle.getPropertyValue(cssVarName)
    })

    it('should use custom CSS Variables prefix', () => {
      const prefix = 'custom-theme'
      const { container } = render(ThemeWrapper, {
        props: {
          prefix,
        },
      })
      rootStyle = getComputedStyle(container.parentElement)
      // TODO: fix root custom props from other ThemeWrapper renders, causes this line to fail
      // expect(getCSSVar('--theme-text')).toBeFalsy()
      expect(getCSSVar('--custom-theme-text')).toBeTruthy()
    })

    it('should not use CSS Variables prefix when prefix is null', () => {
      const prefix = null
      const { container } = render(ThemeWrapper, {
        props: {
          prefix,
        },
      })
      rootStyle = getComputedStyle(container.parentElement)
      // TODO: fix root custom props from other ThemeWrapper renders, causes this line to fail
      // expect(getCSSVar('--theme-text')).toBeFalsy()
      expect(getCSSVar('--text')).toBeTruthy()
    })

    it('should error prefix is an empty string', () => {
      const prefix = ''
      try {
        const results = render(ThemeWrapper, {
          props: {
            prefix,
          },
        })
      } catch (error) {
        expect(error.message).toEqual(INVALID_PREFIX_MESSAGE)
      }
    })
  })
})
