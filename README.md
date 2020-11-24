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

Now supports adding _all_ theme colors as theme-specific CSS variables:

```js
{
  name: 'light',
  colors: {
    text: '#282230',
    background: '#f1f1f1',
    primary: '#01796f',
    primary_dark: '#016159',
    secondary: '#562931',
  },
},
```

Turns into

```css
:root {
  --theme-light-text: #282230;
  --theme-light-background: #f1f1f1;
  --theme-light-primary: #01796f;
  --theme-light-primary_dark: #016159;
  --theme-light-secondary: #562931;
}
```

## Getting Started

You can use the preset themes supplied by svelte-themer or create your own! Ensure each theme object has the necessary keys.

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
  import themes from './themes.js'
</script>

<ThemeWrapper themes="{themes}">
  <main>
    <h1>My Svelte App</h1>
  </main>
</ThemeWrapper>
```

This allows any components nested to access the theme [Context](https://svelte.dev/tutorial/context-api) which wraps a writeable `Theme` [store](https://svelte.dev/tutorial/writable-stores)

#### Theme Persistence

By default svelte-themer persists the chosen theme with `localStorage`, and can be modified via the `key` prop.

```html
<ThemeWrapper key="my-svelte-app__theme">
  <!--  -->
</ThemeWrapper>
```

### Accessing Theme Context

```html
<script>
  import { getContext } from 'svelte'
  let { toggle, current, colors } = getContext('theme')
</script>

<button on:click="{toggle}">{$current}</button>
```

## Provided Theme Toggle

```html
<!-- src/App.svelte -->
<script>
  import { ThemeWrapper, ThemeToggle } from 'svelte-themer'
  import themes from './themes.js'
</script>

<ThemeWrapper themes="{themes}">
  <main>
    <h1>My Svelte App</h1>
    <ThemeToggle />
  </main>
</ThemeWrapper>
```
