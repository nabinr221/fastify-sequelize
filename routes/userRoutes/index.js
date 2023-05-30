const fastifyPlugin = require("fastify-plugin");
const {
  getUsersSchema,
  getUserDetailsSchema,
  addUserSchema,
  updateUserSchema,
  deleteUserSchema,
} = require("../../controllers/schemas/usersSchema");
const {
  getUsersHandler,
  getUserDetailsHandler,
  addUserHandler,
  updateUserHandler,
  deleteUsertHandler,
} = require("../../controllers/handlers/usersHandler");

const getUsersOpts = {
  schema: getUsersSchema,
  handler: getUsersHandler,
};

const getUserDetailsOpts = {
  schema: getUserDetailsSchema,
  handler: getUserDetailsHandler,
};

const addUserOpts = {
  schema: addUserSchema,
  handler: addUserHandler,
};

const updateUserOpts = {
  schema: updateUserSchema, // will be created in schemas/posts.js
  handler: updateUserHandler, // will be created in handlers/posts.js
};

const deleteUserOpts = {
  schema: deleteUserSchema, // will be created in schemas/posts.js
  handler: deleteUsertHandler, // will be created in handlers/posts.js
};

const usersRoutes = async (fastify, opts, done) => {
  await fastify.get("/api/users", getUsersOpts);
  await fastify.post("/api/users", addUserOpts);
  await fastify.put("/api/users/:id", updateUserOpts);
  await fastify.get("/api/users/:id", getUserDetailsOpts);
  await fastify.delete("/api/users/:id", deleteUserOpts);

  done();
};
module.exports = fastifyPlugin(usersRoutes);
