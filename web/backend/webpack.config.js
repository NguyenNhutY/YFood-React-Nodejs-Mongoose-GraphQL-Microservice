module.exports = {
    module: {
      rules: [
        {
          test: /\.graphql$/,
          use: 'graphql-tag/loader',
        },
      ],
    },
  };
  