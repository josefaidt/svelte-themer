import '@testing-library/jest-dom/extend-expect'
import toggleTheme from './toggleTheme'
import { currentTheme } from './store'
import presets from '../components/presets'

describe(toggleTheme.name, () => {
  it('should update store', () => {
    currentTheme.set(presets[0].name)
    let subbed
    let unsub = currentTheme.subscribe(current => {
      subbed = current
    })
    toggleTheme(presets, subbed)
    expect(subbed).toEqual(presets[1].name)
    return unsub()
  })
})
