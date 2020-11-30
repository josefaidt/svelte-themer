<script>
  import { getContext } from 'svelte'
  const { current, toggle } = getContext('theme')
</script>

<button on:click="{toggle}" {...$$props}>{$current}</button>
