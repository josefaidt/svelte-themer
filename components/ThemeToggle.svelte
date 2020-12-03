<script>
  import { getContext } from 'svelte'
  const { current, mode, toggle } = getContext('theme')
</script>

<button on:click="{toggle}" {...$$props}>
  <slot>{$current} {$mode}</slot>
</button>
