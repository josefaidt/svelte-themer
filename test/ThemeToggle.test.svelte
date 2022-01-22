<script>
  import ThemeWrapper from '../components/ThemeWrapper.svelte'
  import ThemeToggle from '../components/ThemeToggle.svelte'
</script>

<ThemeWrapper>
  <ThemeToggle data-testid="test-toggle" {...$$props} />
</ThemeWrapper>
