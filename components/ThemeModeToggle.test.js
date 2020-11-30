import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/svelte'
import ThemeModeToggle from './ThemeModeToggle.test.component'

describe(ThemeModeToggle.name, () => {
  it('should render', () => {
    const { component } = render(ThemeModeToggle)
    expect(component).toBeTruthy()
  })
})
