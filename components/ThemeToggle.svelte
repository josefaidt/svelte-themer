<script>
  import { getContext } from 'svelte'
  const { current, toggle } = getContext('theme')
</script>

<button on:click="{toggle}" {...$$props}>
  <slot>{$current}</slot>
</button>

<style>
  button {
    border: none;
    padding: 8px 12px;
    border-radius: 3px;
    background-color: lightgrey;
    cursor: pointer;
    min-width: 8ch;
    max-width: 15ch;
    max-height: 60px;
    color: black;
  }
</style>
