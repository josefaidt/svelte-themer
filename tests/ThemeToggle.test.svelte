<script>
  import ThemeWrapper from '../src/components/ThemeWrapper.svelte'
  import ThemeToggle from '../src/components/ThemeToggle.svelte'
</script>

<ThemeWrapper>
  <ThemeToggle data-testid="test-toggle" {...$$props} />
</ThemeWrapper>
