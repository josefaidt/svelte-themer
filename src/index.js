import cssVariablesPolyfill from 'css-vars-ponyfill'

// CSS Variable support in legacy browsers
cssVariablesPolyfill()

export { default as ThemeWrapper } from './components/ThemeWrapper.svelte'
export { default as ThemeToggle } from './components/ThemeToggle.svelte'
