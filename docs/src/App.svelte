<script>
  import { ThemeWrapper, ThemeToggle } from 'svelte-themer'

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
      <section id="intro">
        <header>
          <h1>Svelte Themer</h1>
          <p>
            A theming engine for your Svelte apps using CSS Variables,
            persisted.
          </p>
        </header>
        <div class="apps">
          <a
            href="https://github.com/josefaidt/svelte-themer/blob/main/README.md#svelte-themer"
          >
            readme
          </a>
          <a href="https://www.npmjs.com/package/svelte-themer">npm</a>
          <a href="https://github.com/josefaidt/svelte-themer">github</a>
        </div>
      </section>
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

  section {
    display: grid;
    grid-auto-flow: row;
    grid-auto-rows: min-content;
    grid-gap: 2rem;
    place-items: center;
    place-content: center;
    padding: var(--theme-padding-large);
    text-align: center;
    /* max-width: 240px; */
  }

  #intro {
    grid-area: intro;
  }
  .apps {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 3rem;
    justify-content: center;
  }

  footer {
    position: fixed;
    bottom: 1vh;
    left: 2vw;
    right: 2vw;
    display: flex;
    justify-content: space-between;
  }

  h1,
  h2 {
    color: var(--theme-colors-text);
    margin: 0;
    text-transform: lowercase;
  }

  h1 {
    font-size: 4rem;
    font-weight: var(--theme-font-weight-lighter);
  }

  a,
  a:visited {
    color: var(--theme-colors-primary);
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
