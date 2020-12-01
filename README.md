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

## Getting Started

You can use the preset themes supplied by svelte-themer or create your own! Ensure each theme object has the necessary keys.

```js
// src/themes.js
export default [
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

## CSS Variables

CSS variables are created for app-wide consumption using the nomenclature `--theme-[theme name]-[color name]`

For example, `--theme-light-text` where theme name is `light` and color name is `text`

Themes are provided as an array of objects with a required `name` and `colors` key.

```js
;[
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
]
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

.theme--light {
  --theme-text: var(--theme-light-text);
  --theme-background: var(--theme-light-background);
  --theme-primary: var(--theme-light-primary);
  --theme-primary_dark: var(--theme-light-primary_dark);
  --theme-secondary: var(--theme-light-secondary);
}
```

## Components

With svelte-themer there are two components: a wrapper component, and a button for toggling themes. The provided button is more for convenience as the function used to toggle themes is exposed to the theme context.

### ThemeWrapper

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

The wrapper allows child components to access the theme [Context](https://svelte.dev/tutorial/context-api) which wraps a writeable [store](https://svelte.dev/tutorial/writable-stores) for storing the current theme's name.

#### Theme Persistence

By default svelte-themer persists the chosen theme with `localStorage`, and can be modified via the `key` prop.

```html
<ThemeWrapper key="my-svelte-app__theme">
  <!--  -->
</ThemeWrapper>
```

#### Customizing CSS Variable Prefix

By default CSS variables are prefixed with `theme`, and can be customized via the `prefix` prop.

```html
<ThemeWrapper prefix="custom">
  <!--  -->
</ThemeWrapper>
```

Example of CSS variable: `--custom-text`

**To remove the prefix** specify `prefix` as `null`

#### Accessing Theme Context

```html
<!-- src/MyToggleButton.svelte -->
<script>
  import { getContext } from 'svelte'
  let { toggle, current, colors } = getContext('theme')
</script>

<button on:click="{toggle}">{$current}</button>
```

## ThemeToggle

For convenience, a button is provided to toggle the theme choice.

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
