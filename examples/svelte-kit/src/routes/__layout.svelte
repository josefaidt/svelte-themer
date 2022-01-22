<script>
  import { ThemeWrapper } from 'svelte-themer'
  import '../styles/global.css'

  const author = '@josefaidt'
  const title = 'svelte themer'
  const description =
    'A theming engine for your Svelte apps using CSS Variables, persisted.'
  const url = 'https://svelte-themer.vercel.app'
  const keywords = ['svelte', 'theme', 'themer']

  const base = {
    font: {
      size: {
        _: '18px',
      },
      weight: {
        lightest: 100,
        lighter: 200,
        light: 300,
        base: 400,
        medium: 500,
        bold: 700,
        boldest: 900,
      },
    },
  }
</script>

<svelte:head>
  <meta name="description" content="{description}" />
  <meta name="keywords" content="{keywords}" />

  <meta property="og:url" content="{url}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" content="/favicon.png" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:creator" content="{author}" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description}" />
  <meta name="twitter:image" content="/favicon.png" />
</svelte:head>

<ThemeWrapper base="{base}">
  <slot />
</ThemeWrapper>

<style>
  :global(html) {
    background-color: var(--theme-colors-background, initial);
    color: var(--theme-colors-text, initial);
    font-size: 20px;
  }
</style>
