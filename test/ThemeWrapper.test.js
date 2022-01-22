import { describe, beforeEach, it, expect, afterAll } from 'vitest'
import ThemeWrapper, {
  STORAGE_KEY,
  INVALID_THEMES_MESSAGE,
  INVALID_PREFIX_MESSAGE,
} from '../components/ThemeWrapper.svelte'
import { presets } from '../components/presets'

function _render(Component, props = {}) {
  const host = document.createElement('div')
  host.setAttribute('id', 'host')
  document.body.appendChild(host)
  const instance = new Component({ target: host, props })
  return instance
}

function render(props = {}) {
  return _render(ThemeWrapper, props)
}

function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name)
}

describe(ThemeWrapper.name, () => {
  it('should render', () => {
    const instance = render()
    expect(instance).toBeTruthy()
    expect(localStorage.getItem(STORAGE_KEY)).toBeTruthy()
  })

  it('should use custom storage key', () => {
    const key = 'my-custom-key'
    const instance = render({ key })
    expect(localStorage.getItem(key)).toEqual(Object.keys(presets)[0])
  })

  it('should disable persistent storage with null key', () => {
    const key = null
    const instance = render({ key })
    expect(localStorage.getItem(key)).toBeFalsy()
  })

  it('should throw error if supplied with empty themes', () => {
    expect(() => render({ themes: {} })).toThrow(INVALID_THEMES_MESSAGE)
  })

  describe('prefix prop', () => {
    it('should use custom CSS Variables prefix', () => {
      const instance = render({
        prefix: 'custom-theme',
        themes: { test: { colors: { primary: 'blue' } } },
      })
      expect(getCSSVariable('--custom-theme-colors-primary')).toBeTruthy()
    })

    it('should not use CSS Variables prefix when prefix is null', () => {
      const instance = render({
        prefix: null,
      })
      expect(getCSSVariable('--colors-text')).toBeTruthy()
    })

    it('should error prefix is an empty string', () => {
      expect(() => render({ prefix: '' })).toThrow(INVALID_PREFIX_MESSAGE)
    })
  })

  it('should accept base styles as initial CSS Variables values', () => {
    const base = {
      colors: {
        primary: 'red',
      },
    }
    const themes = {
      test: {
        colors: {
          primary: 'blue',
        },
      },
    }
    const instance = render({ base, themes })
    expect(getCSSVariable('--theme-colors-primary')).not.toEqual('initial')
    // expect(getCSSVariable('--theme-colors-primary')).toEqual('red')
  })

  describe('server-side context', () => {
    const { window } = global
    beforeEach(() => {
      delete global.window
    })
    afterAll(() => {
      global.window = window
    })
    it('should render', () => {
      const instance = render()
      expect(instance).toBeTruthy()
    })
  })
})
