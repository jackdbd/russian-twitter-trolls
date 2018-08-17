const path = require("path");

module.exports = {
  target: "node",

  entry: path.resolve(__dirname, "src", "server.js"),

  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },

  module: {
    rules: [
      // rule for .js/.jsx files
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "public")
        ],
        use: "babel-loader"
      },
      // rule for .graphql/.gql files
      {
        test: /\.(graphql|gql)$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        use: "graphql-tag/loader"
      }
    ]
  }
};
