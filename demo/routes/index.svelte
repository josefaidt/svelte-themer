<section id="intro">
  <header>
    <h1>Svelte Themer</h1>
    <p>A theming engine for your Svelte apps using CSS Variables, persisted.</p>
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

<style>
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
</style>
