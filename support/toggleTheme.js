import { currentTheme } from './store'

export default function toggleTheme(themes, current) {
  let currentIndex = themes.findIndex(entry => entry.name === current)
  if (currentIndex === themes.length - 1) currentTheme.set(themes[0].name)
  else currentTheme.set(themes[currentIndex + 1].name)
}
