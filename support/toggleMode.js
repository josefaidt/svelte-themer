import { currentMode } from './store'

export default function toggleMode(mode) {
  currentMode.set(mode === 'dark' ? 'light' : 'dark');
}
