const dotenv = require("dotenv");

dotenv.config();

module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      testVar: process.env.TEST_VAR,
    },
  };
};
