const fastifyPlugin = require("fastify-plugin");
const fastifyCsrf = require("@fastify/csrf-protection");
const fastifySession = require("@fastify/session");

const csrf = async (fastify, opts) => {
  fastify.register(fastifyCsrf, {
    sessionPlugin: "@fastify/session",
    getToken: (req) => {
      return req.session.token;
    },
  });
};
module.exports = fastifyPlugin(csrf);
