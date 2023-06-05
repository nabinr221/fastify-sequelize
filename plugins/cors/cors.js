const fastifyPlugin = require("fastify-plugin");
const cors = require("@fastify/cors");

const corsPlugin = async function (fastify, opts) {
  fastify.register(cors, {
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"], // which domain are allowed to make cross-origin requests
    methods: ["GET", "PUT", "POST", "DELETE"], /// indicates the http methods that are allowed for the cross-origin request
    // allowHeaders: ["Content-Type", "Authorization"], //lists the headers that are allowed to be included in the cross-origin request request
    // exposedHeaders: ["Content-Type", "Set"],
    //this header allows the server to specify which response headers should be exposed to the browser in the response
    // credentials: true,
    //if the server supports sending cookies or authenication credentials with the cross-origin request , then set this option to true
  });
};

module.exports = fastifyPlugin(corsPlugin);
