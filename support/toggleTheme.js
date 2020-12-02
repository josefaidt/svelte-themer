import { get } from 'svelte/store'
import { currentTheme, themes as themesStore } from './store'

export default function toggleTheme() {
  let themes = get(themesStore)
  currentTheme.update(current => {
    let currentIndex = themes.findIndex(entry => entry.name === current)
    if (currentIndex === themes.length - 1) return themes[0].name
    else return themes[currentIndex + 1].name
  })
}
