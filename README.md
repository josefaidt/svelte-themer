# svelte-themer

Styling your Svelte apps with CSS Variables, persisted.

```html
<script>
  import { ThemeWrapper, ThemeToggle } from 'svelte-themer'
</script>

<ThemeWrapper>
  <main>
    <h1>svelte themer</h1>
    <ThemeToggle />
  </main>
</ThemeWrapper>
```

## CSS Variables

CSS variables are created for app-wide consumption using the nomenclature `--theme-[prefix]-[property!]`

For example:

- `--theme-base-text` where `prefix = 'base'` and `property = 'text'`
- `--theme-text` where `prefix = null || undefined` and `property = 'text'`

## Getting Started

Use the following as a base for your custom themes:

```js
// src/theme.js
export const themes = [
  {
    name: 'light',
    colors: {
      text: '#282230',
      background: '#f1f1f1',
    },
  },
  {
    name: 'dark',
    colors: {
      text: '#f1f1f1',
      background: '#27323a',
    },
  },
]
```

### ThemeWrapper

Then, provide the new themes to the `ThemeWrapper` component

```html
<!-- src/App.svelte -->
<script>
  import { ThemeWrapper } from 'svelte-themer'
  import { themes } from './theme.js'
</script>

<ThemeWrapper themes="{themes}">
  <main>
    <h1>My Svelte App</h1>
  </main>
</ThemeWrapper>
```

This allows any components nested to access the theme [Context](https://svelte.dev/tutorial/context-api) which wraps a writeable `Theme` [store](https://svelte.dev/tutorial/writable-stores)

#### Theme Persistence

By default svelte-themer persists the chosen theme with `localStorage`, and can be modified via the `storageKey` prop.

```html
<ThemeWrapper storageKey="my-svelte-app__theme">
  <!--  -->
</ThemeWrapper>
```

### Accessing Theme Context

```html
<script>
  import { getContext } from 'svelte'
  let { toggle, theme } = getContext('theme')
</script>

<button on:click="{toggle}">
  {$theme.name}
</button>
```

## Provided Theme Toggle

```html
<!-- src/App.svelte -->
<script>
  import { ThemeWrapper, ThemeToggle } from 'svelte-themer'
  import { themes } from './theme.js'
</script>

<ThemeWrapper themes="{themes}">
  <main>
    <h1>My Svelte App</h1>
    <ThemeToggle />
  </main>
</ThemeWrapper>
```
