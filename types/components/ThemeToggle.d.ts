/// <reference types="svelte" />

export interface ThemeToggleProps {}

export default class ThemeToggle {
  $$prop_def: ThemeToggleProps;
  $$slot_def: {};

  $on(eventname: string, cb: (event: Event) => void): () => void;
}
