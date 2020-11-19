/// <reference types="svelte" />

export interface ThemeWrapperProps {
  /**
   * @default '__svelte-themer__theme'
   */
  key?: string;

  themes?: undefined;
}

export default class ThemeWrapper {
  $$prop_def: ThemeWrapperProps;
  $$slot_def: {
    default: {};
  };

  $on(eventname: string, cb: (event: Event) => void): () => void;
}
