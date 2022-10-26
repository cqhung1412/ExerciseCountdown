const dotenv = require("dotenv");

dotenv.config();

module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      googleIosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseIosApiKey: process.env.FIREBASE_IOS_API_KEY
    }
  };
};
