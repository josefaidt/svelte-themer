export default function getStylesheets() {
  const stylesheet = [...document.styleSheets].find(sheet => /\/theme\.css$/.test(sheet.href))
  const rootCSS = [...stylesheet.rules].find(rule => /^\:root$/gm.test(rule.selectorText))
  if (!rootCSS) throw new Error('ThemeProvider is unable to recognize CSS on root element')
  const themeCSS = [...stylesheet.rules].filter(rule => /^html\.theme--[A-z]\w+$/gm.test(rule.selectorText))
  if (!themeCSS.length) throw new Error('ThemeProvider is unable to recognize presence of themes')

  return themeCSS.map(theme => /(^html\.theme--)([A-z]\w+)$/g.exec(theme.selectorText)[2])
}
