const fastifyPlugin = require("fastify-plugin");
const dotenv = require("dotenv");
dotenv.config();

const googleAuth = async function (fastify, opts) {
  fastify.get("/callback", async function (request, reply) {
    try {
      const token =
        await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
          request
        );
      req.session.token = token;
      console.log(req.session.token);
      reply.redirect("/");
    } catch (err) {
      console.log(err);
    }
  });
};
module.exports = fastifyPlugin(googleAuth);
