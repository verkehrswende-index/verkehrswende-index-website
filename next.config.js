module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.json5$/,
      loader: "json5-loader",
      type: "javascript/auto",
    });
    return config;
  },
};
