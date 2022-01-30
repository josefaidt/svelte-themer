/**
 * @typedef {Object} SvelteActionReturn
 * @property {Function} [update]
 * @property {Function} [destroy]
 */
/**
 * use:theme
 * @param {HTMLElement} node
 * @param {Object.<string, string|number>} theme
 * @returns
 */
export function theme(node: HTMLElement, theme: {
    [x: string]: string | number;
}): Promise<{
    update(newTheme: any): void;
}>;
/**
 * use:stylesheet
 * @param {HTMLElement} node
 * @param {Object.<string, string|number>} theme
 * @returns {SvelteActionReturn}
 */
export function stylesheet(node: HTMLElement, theme: {
    [x: string]: string | number;
}): SvelteActionReturn;
export type SvelteActionReturn = {
    update?: Function;
    destroy?: Function;
};
