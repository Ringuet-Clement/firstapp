const webpack = require('webpack');

module.exports = {
  // Configuration du serveur de développement (devServer)
  devServer: {
    port: 8081,  // Changer le port à 8081 pour éviter le conflit avec Electron
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // Proxy pour les appels API si nécessaire
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // Configuration Webpack pour injecter les feature flags de Vue
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ],
  },
};
