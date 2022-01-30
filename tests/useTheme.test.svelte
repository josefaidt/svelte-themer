<script>
  import { theme } from '../src/use'
  export let myTheme = {
    text: 'red',
  }
</script>

<div use:theme="{myTheme}" data-testid="container">
  <p data-testid="paragraph">Hello, World!</p>
</div>

<style>
  p {
    color: var(--text);
  }
</style>
