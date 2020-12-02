/// <reference types="svelte" />
import { SvelteComponent } from "svelte";

export interface ThemeWrapperProps {
  /**
   * Specify the key used for local storage
   */
  key?: string;

  /**
   * Specify preferred theme name
   * @default 'themer'
   */
  theme?: string | null;

  /**
   * Themes collection
   */
  themes?: Object[];

  /**
   * Specify custom CSS variable prefix
   */
  prefix?: string | null;

  /**
   * Specify preferred theme mode
   * @default 'auto'
   */
  mode?: "prefers" | "dark" | "light";

  /**
   * Sites default CSS variables
   * @default {}
   */
  base?: Object;
}

export default class ThemeWrapper extends SvelteComponent<ThemeWrapperProps, {}, { default: {} }> {}
