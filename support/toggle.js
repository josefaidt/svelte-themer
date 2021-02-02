import { get } from 'svelte/store'
import { currentTheme, themes as themesStore } from './store'

export default function toggle() {
  let themes = get(themesStore)
  currentTheme.update(current => {
    let keys = Object.keys(themes)
    return keys.reduce((newCurrent, theme, index, source) => {
      if (theme === current) {
        if (source[index + 1]) return source[index + 1]
        else return source[0]
      }
      return newCurrent
    }, '')
  })
}
