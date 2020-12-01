import { currentMode } from './store'

export default function toggleMode(current) {
  const mode = current === 'dark' ? 'light' : 'dark'
  currentMode.set(mode)
}