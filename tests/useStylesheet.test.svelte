<script>
  import { stylesheet } from '../src/use'
  export let myTheme = {
    text: 'red',
  }
</script>

<div use:stylesheet="{myTheme}" data-testid="container">
  <p data-testid="paragraph">Hello, World!</p>
</div>

<style>
  p {
    color: var(--text);
  }
</style>
