const fastifyPlugin = require("fastify-plugin");
const oauthPlugin = require("@fastify/oauth2");
require("dotenv").config();

const oAuth = async (fastify, otns) => {
  //   console.log(process.env.GOOGLE_OAUTH_CLIENT_ID,"hii");
  fastify.register(oauthPlugin, {
    name: "googleOAuth2",
    scope: ["profile", "email"],
    credentials: {
      client: {
        id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      },
      auth: oauthPlugin.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/login/google",
    callbackUri: "http://localhost:3000/api/login/google",
    callbackUriParams: {
      // custom query param that will be passed to callbackUri
      access_type: "offline", // will tell Google to send a refreshToken too
    },
  });
 
};

module.exports = fastifyPlugin(oAuth);
