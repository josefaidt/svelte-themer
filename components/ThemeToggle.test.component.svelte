<script>
  import ThemeWrapper from './ThemeWrapper'
  import ThemeToggle from './ThemeToggle.svelte'
</script>

<ThemeWrapper>
  <ThemeToggle data-testid="test-toggle" {...$$props} />
</ThemeWrapper>
