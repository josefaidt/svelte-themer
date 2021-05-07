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

  /**
   * @constant
   * @default '__svelte-themer__theme'
   */
  STORAGE_KEY?: "__svelte-themer__theme";

  /**
   * @constant
   * @default 'theme'
   */
  CONTEXT_KEY?: "theme";

  /**
   * @constant
   * @default 'theme'
   */
  VARIABLE_PREFIX?: "theme";

  /**
   * @constant
   * @default ['auto', 'light', 'dark']
   */
  VALID_MODES?: ["auto", "light", "dark"];

  /**
   * @constant
   * @default 'Invalid themes object supplied'
   */
  INVALID_THEMES_MESSAGE?: "Invalid themes object supplied";

  /**
   * @constant
   * @default 'Invalid prefix string supplied'
   */
  INVALID_PREFIX_MESSAGE?: "Invalid prefix string supplied";

  /**
   * @constant
   */
  INVALID_MODE_MESSAGE?: undefined;
}

export default class ThemeWrapper extends SvelteComponentTyped<
  ThemeWrapperProps,
  {},
  { default: {} }
> {}
