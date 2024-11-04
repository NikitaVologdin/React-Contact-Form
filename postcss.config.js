const config = {
  plugins: [
    require("autoprefixer"),
    require("postcss-nesting"),
    require("postcss-pxtorem")({ rootValue: 16, propList: ["*"] }),
    require("postcss-utilities"),
  ],
};

module.exports = config;
