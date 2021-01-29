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

CSS variables are created for app-wide consumption using the nomenclature `--[prefix]-[property!]`

For example:

- `--base-text` where `prefix = 'base'` and `property = 'text'`
- `--theme-text` where `prefix = null || undefined` and `property = 'text'`

Now supports adding _all_ theme colors as theme-specific CSS variables:

```js
{
  light: {
    colors: {
      text: '#282230',
      background: {
        _: '#f1f1f1',
        contrast: '#b1b1b1',
      },
      primary: '#01796f',
      primary_dark: '#016159',
      secondary: '#562931',
    },
  },
}
```

Turns into

```css
:root {
  --theme-light-colors-text: #282230;
  --theme-light-colors-background: #f1f1f1;
  --theme-light-colors-background-contrast: #b1b1b1;
  --theme-light-colors-primary: #01796f;
  --theme-light-colors-primary_dark: #016159;
  --theme-light-colors-secondary: #562931;
}

[theme='light'],
.theme--light {
  --theme-colors-text: var(--theme-light-colors-text);
  --theme-colors-background: var(--theme-light-colors-background);
  --theme-colors-background-contrast: --var(theme-light-colors-background-contrast);
  --theme-colors-primary: var(--theme-light-colors-primary);
  --theme-colors-primary_dark: var(--theme-light-colors-primary_dark);
  --theme-colors-secondary: var(--theme-light-colors-secondary);
}
```

## Getting Started

You can use the preset themes supplied by svelte-themer or create your own! Theme names are specified by the key, and all properties are transformed into CSS Variables.

**NOTE**: svelte-themer is preset with 3 themes to showcase the flexible functionality of `toggle()`

```js
// src/themes.js
export const themes = {
  light: {
    colors: {
      text: '#282230',
      background: {
        _: '#f1f1f1',
        contrast: '#b1b1b1',
      },
      primary: '#01796f',
      primary_dark: '#016159',
      secondary: '#562931',
    },
  },
  dark: {
    colors: {
      text: '#f1f1f1',
      background: {
        _: '#27323a',
        contrast: '#0d1215',
      },
      primary: '#01978b',
      primary_dark: '#00887c',
      secondary: '#fe8690',
    },
  },
}
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

This allows any components nested to access the theme [Context](https://svelte.dev/tutorial/context-api) which wraps a writeable `theme` [store](https://svelte.dev/tutorial/writable-stores)

#### Theme Persistence

By default svelte-themer persists the chosen theme with `localStorage`, and can be modified via the `key` prop.

```html
<ThemeWrapper key="my-svelte-app__theme">
  <!--  -->
</ThemeWrapper>
```

#### Theme Loading Order

`ThemeWrapper` will load a theme on first visit based on the following order:

1. Saved - User's stored choice (from `localStorage`)
2. Prefers - User's Operating System settings (via `prefers-color-scheme`)
3. Fallback - First theme in `themes` specified (from presets, `light`)

By default, the "prefers" step will choose a theme based on OS settings, however this can be modified to directly choose "light" or "dark" by leveraging the `mode` prop:

```html
<ThemeWrapper mode="auto|light|dark">
  <!--  -->
</ThemeWrapper>
```

### Accessing Theme Context

```html
<script>
  import { getContext } from 'svelte'
  let { toggle, current, theme } = getContext('theme')
</script>

<button on:click="{toggle}">{$current}</button>
```

### Provided Theme Toggle

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
