/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface ThemeWrapperProps {
  /**
   * Specify the key used for local storage
   * @default undefined
   */
  key?: string;

  /**
   * Themes collection
   * @default undefined
   */
  themes?: Object;

  /**
   * Sets the specified theme as active
   * @default null
   */
  theme?: string | null;

  /**
   * Specify custom CSS variable prefix
   * @default undefined
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
> {
  STORAGE_KEY: string;

  CONTEXT_KEY: string;

  VARIABLE_PREFIX: string;

  VALID_MODES: ["auto", "light", "dark"];

  INVALID_THEMES_MESSAGE: string;

  INVALID_PREFIX_MESSAGE: string;

  INVALID_MODE_MESSAGE: undefined;
}
