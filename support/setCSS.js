const processConfig = (obj, name) => {
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
        result[key] = value;
      }
    }
  };

  recurse(obj);

  return result;
};

const createVariables = (themeName, themeVariableNames, themeVariables) => {
  return themeVariableNames.map(variableName => {
    // returns base variables
    if (!themeName) {
      return `--theme-${variableName}: ${themeVariables[variableName]};`;
    }

    // returns theme variable
    if (themeVariables) {
      return `--theme-${themeName}-${variableName}: ${themeVariables[variableName]};`;
    }

    // returns global theme overrides of current theme
    return `--theme-${variableName}: var(--theme-${themeName}-${variableName});`;
  }).join('\n\t');
};

export default function setCSS(base = {}, themes = []) {
  const rootCSSContent = [];
  const themeCSSContent = [];
  const baseConfig = processConfig(base);
  const baseVariables = createVariables('', Object.keys(baseConfig), baseConfig);

  rootCSSContent.push(baseVariables);

  themes.forEach(theme => {
    const { name, defaults = {}, dark = {} } = theme;

    const themeName = `theme--${name}`;

    const defaultConfig = processConfig(defaults, name);
    const defaultVariables = Object.keys(defaultConfig);
    const defaultThemeVariables = createVariables(name, defaultVariables, defaultConfig);

    const darkConfig = processConfig(dark, name);
    const darkThemeVariables = createVariables(name, Object.keys(darkConfig), darkConfig);

    const themeVariables = createVariables(name, defaultVariables);

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
