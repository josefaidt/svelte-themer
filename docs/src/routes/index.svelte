<script context="module">
  export async function load({ fetch }) {
    const { SVELTE_THEMER_VERSION } = await (await fetch('/index.json')).json()
    return {
      props: {
        SVELTE_THEMER_VERSION,
      },
    }
  }
</script>

<script>
  import { ThemeToggle } from 'svelte-themer'
  export let SVELTE_THEMER_VERSION
</script>

<div id="container">
  <div id="nav--container">
    <nav>
      <!-- links -->
    </nav>
    <div>
      <ThemeToggle />
    </div>
  </div>
  <main>
    <section id="intro">
      <header>
        <h1>Svelte Themer</h1>
        <p>
          A theming engine for your Svelte apps using CSS Variables, persisted.
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
  <footer>
    <!-- svelte-ignore missing-declaration -->
    {#if SVELTE_THEMER_VERSION}
      <span>v{SVELTE_THEMER_VERSION}</span>
    {/if}
  </footer>
</div>

<style>
  :global(body) {
    display: flex;
    place-items: center;
    place-content: center;
    font-size: var(--theme-font-size);
    text-size-adjust: 100%;
    font-feature-settings: 'kern', 'liga', 'clig', 'calt';
    max-width: 100vw;
  }

  :global(*) {
    transition-property: background-color;
    transition-duration: 0.2s;
    transition-timing-function: ease;
    text-rendering: optimizeLegibility;
    text-shadow: rgb(0 0 0 / 1%) 0 0 1px;
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

  h1 {
    color: var(--theme-colors-text);
    margin: 0;
    text-transform: lowercase;
    font-size: 4rem;
    font-weight: var(--theme-font-weight-lighter);
  }

  p {
    font-size: 1rem;
  }

  a,
  a:visited {
    color: var(--theme-colors-primary);
    font-size: 1rem;
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
