/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface ThemeWrapperProps {
  /**
   * Specify the key used for local storage
   */
  key?: string;

  /**
   * Themes collection
   */
  themes?: Object;

  /**
   * Sets the specified theme as active
   * @default null
   */
  theme?: string | null;

  /**
   * Specify custom CSS variable prefix
   */
  prefix?: string | null;

  /**
   * Specify preferred theme mode
   * @default 'auto'
   */
  mode?: "auto" | "dark" | "light";

  /**
   * Site default CSS variables
   * @default {}
   */
  base?: Object;
}

export default class ThemeWrapper extends SvelteComponentTyped<
  ThemeWrapperProps,
  {},
  { default: {} }
> {}
