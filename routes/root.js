// "use strict";

const getServer = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    const name = "ram";
    return { root: name };
  });
};
module.exports = getServer;
