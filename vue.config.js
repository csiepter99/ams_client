const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:"./",
  outputDir:"dist",
  assetsDir: 'static',
  runtimeCompiler: true,
  transpileDependencies: [
    'vuetify'
  ]
})
