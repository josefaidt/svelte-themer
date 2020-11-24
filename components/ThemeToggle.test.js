import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/svelte'
import ThemeToggle from './ThemeToggle.test.component'

describe(ThemeToggle.name, () => {
  it('should render', () => {
    const { component } = render(ThemeToggle)
    expect(component).toBeTruthy()
  })
})
