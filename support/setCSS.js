const processConfig = (obj, name, prefix) => {
  const result = {};

  const recurse = (obj, current) => {
    for(let prop in obj) {
      const value = obj[prop];
      const key = (current ? `${current}-${prop}` : prop)
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
        .toLowerCase();

      if(value && typeof value === 'object') {
        recurse(value, key);
      } else {
        result[key] = `${value}`.replace(/\{prefix\}/g, prefix);
      }
    }
  };

  recurse(obj);

  return result;
};

const createVariables = (prefix, themeName, themeVariableNames, themeVariables) => {
  return themeVariableNames.map(variableName => {
    // returns base variables
    if (!themeName) {
      return `${prefix}${variableName}: ${themeVariables[variableName]};`;
    }

    // returns theme variable
    if (themeVariables) {
      return `${prefix}${themeName}-${variableName}: ${themeVariables[variableName]};`;
    }

    // returns global theme overrides of current theme
    return `${prefix}${variableName}: var(${prefix}${themeName}-${variableName});`;
  }).join('\n\t');
};

export default function setCSS(base = {}, themes = [], prefix = 'theme') {
  const rootCSSContent = [];
  const themeCSSContent = [];
  const prefixed = prefix ? `--${prefix}-` : '--';
  const baseConfig = processConfig(base, null, prefix);
  const baseVariables = createVariables(prefixed, null, Object.keys(baseConfig), baseConfig);

  rootCSSContent.push(baseVariables);

  themes.forEach(theme => {
    const { name, light = {}, dark = {} } = theme;

    const themeName = `${prefix}--${name}`;
    const defaultConfig = processConfig(light, name, prefix);
    const defaultVariables = Object.keys(defaultConfig);
    const defaultThemeVariables = createVariables(prefixed, name, defaultVariables, defaultConfig);

    const darkConfig = processConfig(dark, name, prefix);
    const darkThemeVariables = createVariables(prefixed, name, Object.keys(darkConfig), darkConfig);

    const themeVariables = createVariables(prefixed, name, defaultVariables);

    rootCSSContent.push(defaultThemeVariables);

    themeCSSContent.push(`
      [data-theme="${themeName}"],
      .${themeName} {
        ${themeVariables}
      }

      [data-theme-mode="dark"][data-theme="${themeName}"],
      [data-theme-mode="dark"] .${themeName} {
        ${darkThemeVariables}
      }

      :global(.${name}) {
        ${themeVariables}
      }`
    );
  });

  const style = `
    <style>
      :root {
        ${rootCSSContent.join('\n')}
      }

      ${themeCSSContent.join('\n')}
    </style>
  `;

  document.head.innerHTML = `${style}\n${document.head.innerHTML}`;
}
