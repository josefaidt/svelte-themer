<script>
  import { getContext } from 'svelte'
  const { mode, toggleMode } = getContext('theme')
</script>

<button on:click="{toggleMode}" {...$$props}>{$mode}</button>
