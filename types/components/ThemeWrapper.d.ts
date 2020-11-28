/// <reference types="svelte" />

export interface ThemeWrapperProps {
  /**
   * Specify the key used for local storage
   */
  key?: string;

  /**
   * Themes
   */
  themes?: Object[];

  /**
   * Specify initial theme name, default to the first theme
   */
  initialName?: string;
}

export default class ThemeWrapper {
  $$prop_def: ThemeWrapperProps;
  $$slot_def: {
    default: {};
  };

  $on(eventname: string, cb: (event: Event) => void): () => void;
}
