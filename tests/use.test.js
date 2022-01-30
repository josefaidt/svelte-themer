import { describe, expect, it } from 'vitest'
import UseThemeComponent from './useTheme.test.svelte'
import UseStylesheetComponent from './useStylesheet.test.svelte'
import { render as _render, getByTestId } from './support.js'

describe('Theme Action', () => {
  function render(props = {}) {
    return _render(UseThemeComponent, props)
  }

  it('should render', () => {
    const instance = render()
    expect(instance).toBeTruthy()
  })

  it('should create inline styles', () => {
    const myTheme = {
      text: 'red',
    }
    const instance = render({ myTheme })
    const container = getByTestId('container')
    expect(container.style).toBeTruthy()
    expect(container.style.getPropertyValue('--text')).toBe('red')
  })

  it('should not create stylesheet', () => {
    const myTheme = {
      text: 'red',
    }
    const instance = render({ myTheme })
    const container = getByTestId('container')
    const firstChildNode = container.childNodes[0]
    expect(firstChildNode.localName).not.toEqual('style')
  })
})

describe('Stylesheet Action', () => {
  function render(props = {}) {
    return _render(UseStylesheetComponent, props)
  }

  it('should render', () => {
    const instance = render()
    expect(instance).toBeTruthy()
  })

  it('should not create inline styles', () => {
    const myTheme = {
      text: 'red',
    }
    const instance = render({ myTheme })
    const container = getByTestId('container')
    expect(container.style).toBeTruthy()
    expect(container.style.getPropertyValue('--text')).not.toBe('red')
  })

  it('should create stylesheet', () => {
    const myTheme = {
      text: 'red',
    }
    const instance = render({ myTheme })
    const container = getByTestId('container')
    const firstChildNode = container.childNodes[0]
    expect(firstChildNode.localName).toEqual('style')
  })
})
