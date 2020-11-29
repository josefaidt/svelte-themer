/// <reference types="svelte" />
import { SvelteComponent } from "svelte";

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

export default class ThemeWrapper extends SvelteComponent<ThemeWrapperProps, {}, { default: {} }> {}
