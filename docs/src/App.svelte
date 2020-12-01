<script>
  import { ThemeWrapper, ThemeToggle, ThemeModeToggle } from 'svelte-themer'

  const base = {
    link: {
      color: '#0000ee',
      visited: '#551A8B',
    },
    borderColor: '#eee',
    borderRadius: {
      small: '1px',
      base: '3px',
      large: '6px'
    },
    fontSize: {
      xxxlarge: '32px',
      xxlarge: '21px',
      xlarge: '17px',
      large: '15px',
      base: '14px',
      medium: '13px',
      small: '12px',
      xsmall: '9px'
    },
    fontWeight: {
      lightest: 100,
      lighter: 200,
      light: 300,
      base: 400,
      medium: 500,
      bold: 700,
      boldest: 900
    },
    margin: {
      small: '4px',
      base: '8px',
      large: '16px',
      xlarge: '32px'
    },
    padding: {
      small: '4px',
      base: '8px',
      large: '16px',
      xlarge: '32px'
    },
    button: {
      primary: {
        backgroundColor: "lightgrey",
        color: "black"
      }
    }
  };
</script>

<ThemeWrapper base="{base}">
  <main>
    <h1>Svelte Themer</h1>
    <div>
      <ThemeToggle />
      <ThemeModeToggle />
    </div>
    <div class="apps">
      <a href="https://www.npmjs.com/package/svelte-themer">npm</a>
      <a href="https://github.com/josefaidt/svelte-themer">github</a>
    </div>
  </main>
</ThemeWrapper>

<style>
  :global(html) {
    background-color: var(--theme-background-color, initial);
    color: var(--theme-text-color, initial);
  }

  :global(body) {
    align-items: center;
    display: flex;
  }

  :global(button) {
    background-color: var(--theme-button-primary-background-color, lightgrey);
    border: none;
    border-radius: var(--theme-border-radius-base, 3px);
    color: var(--theme-button-primary-color, black);
    cursor: pointer;
    padding: var(--theme-padding-base, 8px);
    width: 100px;
  }

  :global(button + button) {
    margin-left: 8px;
  }

  main {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 2rem;
    max-width: 240px;
    margin: 0 auto;
    padding: var(--theme-padding-large);
    text-align: center;
  }

  .apps {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 3rem;
    justify-content: center;
  }

  h1 {
    color: var(--theme-text-color);
    font-size: 4em;
    font-weight: var(--theme-font-weight-lighter);
    margin: 0;
    text-transform: lowercase;
  }

  a,
  a:visited {
    color: var(--theme-text-color);
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
