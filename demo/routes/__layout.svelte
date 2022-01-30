<script>
  import ThemeWrapper from '$lib/components/ThemeWrapper.svelte'
  import ThemeToggle from '$lib/components/ThemeToggle.svelte'
  import { stylesheet } from '$lib/use.js'

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
  <meta name="keywords" content="{keywords.join(',')}" />

  <meta property="og:url" content="{url}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" content="/favicon.ico" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:creator" content="{author}" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description}" />
  <meta name="twitter:image" content="/favicon.ico" />
</svelte:head>

<ThemeWrapper base="{base}">
  <div id="container">
    <div id="nav--container">
      <div></div>
      <div>
        <ThemeToggle />
      </div>
    </div>
    <main>
      <slot />
    </main>
  </div>
</ThemeWrapper>

<style>
  :global(html) {
    background-color: var(--theme-colors-background, initial);
    color: var(--theme-colors-text, initial);
    font-size: 20px;
  }

  :global(body) {
    place-items: center;
    place-content: center;
    display: flex;
    font-size: var(--theme-font-size);
  }

  #nav--container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  }

  main {
    margin: 0 auto;
    display: grid;
    grid-auto-flow: row;
    /* grid-template-rows: 100vh max-content; */
    grid-template-areas: 'intro';
  }

  #container {
    margin: 0 auto;
    display: grid;
    grid-auto-flow: row;
  }

  @media (max-width: 768px) {
    main {
      max-width: initial;
    }
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
