<script>
  import ThemeWrapper from './ThemeWrapper'
  import ThemeToggle from './ThemeToggle.svelte'
  export let key = 'test'
  $: wrapperProps = {
    key,
  }
</script>

<ThemeWrapper {...wrapperProps}>
  <ThemeToggle {...$$props} data-testid="test-toggle" />
</ThemeWrapper>
