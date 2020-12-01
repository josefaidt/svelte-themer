export const presets = [
  {
    name: 'pure',
    light: {
      textColor: '#818d9f',
      backgroundColor: '#f1f1f1',
      button: {
        primary: {
          backgroundColor: 'var(--theme-colors-primary)',
          color: 'var(--theme-text-color)',
        },
      },
      colors: {
        primary: '#fff',
        secondary: '#562931',
      },
    },
    dark: {
      textColor: '#fff',
      backgroundColor: '#121212',
      button: {
        primary: {
          backgroundColor: '#222',
          color: '#f1f1f1',
        },
      },
    },
  },
  {
    name: 'midnight',
    light: {
      textColor: '#f1f1f1',
      backgroundColor: '#1e272e',
      button: {
        primary: {
          backgroundColor: 'var(--theme-colors-primary)',
          color: 'var(--theme-text-color)',
        },
      },
      colors: {
        primary: '#4b9eff',
        secondary: '#fe8690',
        text: '#f1f1f1',
      },
    },
    dark: {
      textColor: '#888',
      backgroundColor: '#0d1215',
      colors: {
        primary: '#16242d',
      },
    },
  },
  {
    name: 'forest',
    light: {
      textColor: '#f9f2cf',
      backgroundColor: '#3b6c4c',
      button: {
        primary: {
          backgroundColor: 'var(--theme-colors-primary)',
          color: 'var(--theme-text-color)',
        },
      },
      colors: {
        primary: '#51a56e',
        secondary: '#4a875f',
      },
    },
    dark: {
      textColor: '#beb9a0',
      backgroundColor: '#1d492c',
      colors: {
        primary: '#316643',
      },
    },
  },
]
