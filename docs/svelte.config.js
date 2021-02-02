const NODE_ENV = process.env.NODE_ENV || 'production'
module.exports = {
  extensions: ['.svelte', '.svx'],
  preprocess: [
    require('svelte-preprocess')({
      typescript: false,
      postcss: {
        plugins: [
          require('autoprefixer')({
            overrideBrowserslist: ['last 1 version', 'ie >= 11'],
          }),
        ],
      },
    }),
    mdsvex({
      remarkPlugins: [slug],
      layout: {
        _: path.join(__dirname, 'src/layouts/ComponentLayout.svelte'),
      },
    }),
  ],
}
