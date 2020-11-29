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
   * Specify custom CSS variable prefix
   */
  prefix?: string | null;
}

export default class ThemeWrapper {
  $$prop_def: ThemeWrapperProps;
  $$slot_def: {
    default: {};
  };

  $on(eventname: string, cb: (event: Event) => void): () => void;
}
