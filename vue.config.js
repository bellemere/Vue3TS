module.exports = {
  devServer: {
    host: "localhost",
  },
  publicPath: process.env.NODE_ENV === "production" ? "/dist/" : "/",
  configureWebpack: {
    devtool: "source-map",
  },
};
