<script>
  import { ThemeWrapper, ThemeToggle, ThemeModeToggle } from 'svelte-themer'

  const base = {
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
      boldest: 900,
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
    }
  };
</script>

<ThemeWrapper base="{base}">
  <main>
    <div class="rail">
      <h1>Svelte Themer</h1>
      <div>
        <ThemeToggle />
        <ThemeModeToggle />
      </div>
    </div>
    <div class="apps">
      <a href="https://www.npmjs.com/package/svelte-themer">npm</a>
      <a href="https://github.com/josefaidt/svelte-themer">github</a>
    </div>
  </main>
</ThemeWrapper>

<style>
  :global(body) {
    display: flex;
    align-items: center;
  }

  main {
    text-align: center;
    padding: var(--theme-padding-large);
    max-width: 240px;
    margin: 0 auto;

    display: grid;
    grid-auto-flow: row;
    grid-gap: 2rem;
  }

  @media (max-width: 768px) {
    main {
      max-width: initial;
    }
  }

  .rail {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 3rem;
    align-items: flex-end;
  }

  @media (max-width: 768px) {
    .rail {
      grid-auto-flow: row;
      justify-items: center;
      grid-gap: 1rem;
    }
  }

  .apps {
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    grid-gap: 3rem;
  }

  h1 {
    color: var(--theme-text-color);
    text-transform: lowercase;
    font-size: 4em;
    font-weight: var(--theme-font-weight-lighter);
    margin: 0;
  }

  a {
    color: var(--theme-color-primary);
  }
  a:visited {
    color: var(--theme-color-primary-dark);
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
