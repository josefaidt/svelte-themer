import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/svelte'
import ThemeWrapper, { storageKey } from './ThemeWrapper'
import { presets } from './presets'

describe(ThemeWrapper.name, () => {
  it('should render', () => {
    const { component } = render(ThemeWrapper)
    expect(component).toBeTruthy()
    expect(localStorage.getItem(storageKey)).toBeTruthy()
  })

  it('should use custom storage key', () => {
    const key = 'my-custom-key'
    const results = render(ThemeWrapper, {
      props: {
        key,
      },
    })
    expect(localStorage.getItem(key)).toBeTruthy()
  })

  it('should update storage on toggle', () => {
    const key = 'testing'
    const names = presets.map(preset => preset.name)
    const results = render(ThemeWrapper, {
      props: {
        themes: presets,
        key,
      },
    })
    expect(localStorage.getItem(key)).toEqual(names[0])
  })
})
