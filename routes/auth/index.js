const fastifyPlugin = require("fastify-plugin");
const {
  singupHandler,
  loginHandler,
} = require("../../controllers/handlers/authHandler");
const {
  signupSchema,
  loginSchema,
} = require("../../controllers/schemas/authSchema");

const signupOpts = {
  schema: signupSchema,
  validatorCompiler: ({ schema, method, url, httpPart }) => {
    return (data) => schema.validate(data);
  },
  handler: singupHandler,
};
const userLoginOpts = {
  schema: loginSchema,
  validatorCompiler: ({ schema, method, url, httpPart }) => {
    return (data) => schema.validate(data);
  },
  handler: loginHandler,
};

const authRoutes = async (fastify, opts, done) => {
  await fastify.post("/api/auth/register", signupOpts);
  await fastify.post("/api/auth/login", userLoginOpts);

  done();
};
module.exports = fastifyPlugin(authRoutes);
