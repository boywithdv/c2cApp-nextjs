const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-postcss"],
  //静的ファイルを配置するディレクトリを指定する
  staticDirs: ["public"],
  babel: async options => ({
    ...options,
    plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-proposal-private-methods", "@babel/plugin-proposal-private-property-in-object"]
  }),
  //WebpackFinal ---- 必要なアドオンを導入し、tsconfigの設定を引き継ぐ
  webpackFinal: async config => {
    config.resolve.plugins = [new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, "../tsconfig.json")
    })];
    return config;
  },
  typescript: {
    reactDocgen: false
  },
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  docs: {
    autodocs: true
  }
};