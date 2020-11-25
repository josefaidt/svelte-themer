/// <reference types="svelte" />

export interface ThemeModeToggleProps {}

export default class ThemeModeToggle {
  $$prop_def: ThemeModeToggleProps;
  $$slot_def: {};

  $on(eventname: string, cb: (event: Event) => void): () => void;
}
