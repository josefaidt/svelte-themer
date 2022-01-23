import { describe, expect, it } from 'vitest'
import UseComponent from './use.test.svelte'
import { render as _render, getByTestId } from './support.js'

function render(props = {}) {
  return _render(UseComponent, props)
}

describe('Theme Action', () => {
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

  it('should create stylesheet scoped to parent', () => {
    const myTheme = {
      text: 'red',
    }
    const instance = render({ myTheme })
    const container = getByTestId('container')
    const childStylesheet = container.childNodes[0]
    expect(childStylesheet).toBeTruthy()
  })
})
