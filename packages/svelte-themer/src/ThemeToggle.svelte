<script>
	import { getContext } from "svelte";
	let { toggle, theme } = getContext("theme");
</script>

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
	  /* background-color: var(--theme-text); */
		color: var(--theme-base-text);
	}
</style>

<button on:click={toggle}>
  {$theme.name}
</button>