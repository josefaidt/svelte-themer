import { get } from 'svelte/store'
import {
  currentTheme as currentThemeStore,
  currentMode as currentModeStore,
  themes as themesStore,
} from './store'

export default function toggle() {
  const themes = get(themesStore)
  const currentTheme = get(currentThemeStore)
  const currentMode = get(currentModeStore)

  // create options collection of tuples [['themer', 'light'], ['themer', 'dark']]
  const options = themes.reduce((acc, theme) => {
    let result = []
    for (let mode of ['light', 'dark']) {
      if (theme[mode]) result.push([theme.name, mode])
    }
    return acc.concat(result)
  }, [])

  for (let [index, option] of options.entries()) {
    const [themeName, themeMode] = option
    if (currentTheme === themeName && currentMode === themeMode) {
      const [newThemeName, newThemeMode] = options[index + 1] ? options[index + 1] : options[0]
      currentThemeStore.set(newThemeName)
      currentModeStore.set(newThemeMode)
      break
    }
  }
}
