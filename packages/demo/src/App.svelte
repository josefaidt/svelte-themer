<script>
  import { ThemeWrapper, ThemeToggle } from 'svelte-themer'

  const themes = [
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
</script>

<ThemeWrapper>
  <main>
    <div class="rail">
      <h1>Svelte Themer</h1>
      <ThemeToggle />
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
		padding: 1em;
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
		color: var(--theme-text);
		text-transform: lowercase;
		font-size: 4em;
    font-weight: 200;
    margin: 0;
  }
  
  a {
    color: var(--theme-primary)
  }
  a:visited {
    color: var(--theme-primary_dark)
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>