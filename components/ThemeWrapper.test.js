import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/svelte'
import ThemeWrapper, { STORAGE_KEY } from './ThemeWrapper'
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
      expect(error.message).toEqual('Invalid themes array supplied')
    }
  })
})
