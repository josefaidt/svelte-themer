<script>
  import { getContext } from 'svelte'
  let { darkmode, toggleMode } = getContext('theme')
</script>

<button on:click="{toggleMode}" {...$$props}>{$darkmode ? 'Dark' : 'Light'}</button>

<style>
  button {
    background-color: var(--theme-colors-primary, lightgrey);
    border: none;
    border-radius: var(--theme-border-radius-base, 3px);
    color: var(--theme-text-color, black);
    cursor: pointer;
    max-height: 60px;
    max-width: 15ch;
    min-width: 8ch;
    padding: var(--theme-padding-base, 8px);
  }
</style>
