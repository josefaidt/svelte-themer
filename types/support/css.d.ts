/**
 * CSS Variable Name
 * @typedef {string} CSSVariableName
 */
/**
 * CSS Variable Statement
 * @typedef {string} CSSVariableStatement
 */
/**
 * @typedef {object} CreateCSSVariableNameInput
 * @property {string} variablePrefix
 * @property {string} prop property name
 * @property {string} [key] optional prop prefix
 *
 * Helper to create CSS Variable name string
 * @param {CreateCSSVariableNameInput}
 * @returns {CSSVariableName}
 */
export function createCSSVariableName({ variablePrefix, prop, key }: CreateCSSVariableNameInput): CSSVariableName;
/**
 * Helper to merge variable name and value to create statement
 * @param {CSSVariableName} variableName CSS Variable name
 * @param {string} value CSS Variable Value
 * @returns {CSSVariableStatement}
 */
export function createCSSVariableStatement(variableName: CSSVariableName, value: string): CSSVariableStatement;
/**
 * @typedef {object} CreateCSSVariableOverrideInput
 * @property {CSSVariableName} initialVariableName
 * @property {CSSVariableName} themeVariableName
 *
 * Helper to create variable overrides for themed use
 * @param {CreateCSSVariableOverrideInput}
 * @returns {string}
 */
export function createCSSVariableOverride({ initialVariableName, themeVariableName, }: CreateCSSVariableOverrideInput): string;
/**
 *
 * @param {object} config
 * @param {Object} options
 * @param {string} options.prefix
 * @returns {[CSSVariableName, <string,CSSVariableName>]}
 */
export function createCSSVariableCollection(config: object, { prefix }?: {
    prefix: string;
}): [string, <string, CSSVariableName_1>() => any];
/**
 * Create CSS template
 * @name createCSSTemplate
 * @param {string} prefix - CSS variable prefix
 * @param {Object[]} themes - themes array
 * @returns {string} CSS template
 */
export function createCSSTemplate(prefix: string, base?: {}): string;
/**
 * CSS Variable Name
 */
export type CSSVariableName = string;
/**
 * CSS Variable Statement
 */
export type CSSVariableStatement = string;
export type CreateCSSVariableNameInput = {
    variablePrefix: string;
    /**
     * property name
     */
    prop: string;
    /**
     * optional prop prefix
     *
     * Helper to create CSS Variable name string
     */
    key?: string;
};
export type CreateCSSVariableOverrideInput = {
    initialVariableName: CSSVariableName;
    /**
     * Helper to create variable overrides for themed use
     */
    themeVariableName: CSSVariableName;
};
