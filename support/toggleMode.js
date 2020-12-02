import { currentMode } from './store'

export default function toggleMode() {
  currentMode.update(current => {
    return current === 'dark' ? 'light' : 'dark'
  })
}
