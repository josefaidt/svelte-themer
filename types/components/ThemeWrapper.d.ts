/// <reference types="svelte" />

export interface ThemeWrapperProps {
  /**
   * Specify the key used for local storage
   */
  key?: string;

  /**
   * Themes
   * @default null
   */
  theme?: string;

  /**
   * Themes
   */
  themes?: Object[];

  /**
   * Specify custom CSS variable prefix
   */
  prefix?: string | null;

  /**
   * Mode
   * @default null
   */
  mode?: string;

  /**
   * Sites default CSS variables
   * @default {}
   */
  base?: Object;
}

export default class ThemeWrapper {
  $$prop_def: ThemeWrapperProps;
  $$slot_def: {
    default: {};
  };

  $on(eventname: string, cb: (event: Event) => void): () => void;
}
