// const users = require("../../cloud/users");
/**
 * hanlder for user add
 */
const addUserHandler = async (request, reply) => {
  const users = request.server.User;
  const { id, name, username, password, address, gender, contact_number } =
    request.body;

  try {
    const userData = await users.create({
      id,
      name,
      username,
      password,
      address,
      gender,
      contact_number, //contact number is not working properly
    });
    if (userData) {
      reply.code(200).send(userData);
    }
    //  else {
    //   reply.code(400).send({ error: "Unable to save user data." });
    // }
  } catch (error) {
    console.log(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
};
/**
 * hanlder for user list
 */
const getUsersHandler = async (request, reply) => {
  const users = request.server.User;
  try {
    const usersData = await users.findAll();
    return usersData;
  } catch (error) {
    console.log(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
};

/**
 * handler for user details
 */
const getUserDetailsHandler = async (request, reply) => {
  const users = request.server.User;
  const { id } = request.params;
  try {
    const userData = await users.findByPk(id);
    console.log(userData, "dertisadfsdfas");
    // if (!userData) {
    //   reply.code(404).send({ error: "Not Found" });
    // } else {
    reply.code(200).send(userData);
    // }
  } catch (error) {
    console.log(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
};

const updateUserHandler = async (request, reply) => {
  const users = request.server.User;
  const { ...data } = request.body;
  const { id } = request.params;
  try {
    const usersData = await users.update({ ...data }, { where: { id } });
    // reply.code(200).send(usersData);
    if (!usersData) {
      reply.code(400).send({ error: "something is worng" });
    } else {
      reply.code(200).send({ message: "User Update successfully" });
    }
  } catch (error) {
    console.log("Internal error", error);
  }
};

const deleteUsertHandler = async (request, reply) => {
  const users = request.server.User;
  const { id } = request.params;
  await users.destroy({ where: { id } });
  reply.send({ msg: "deleted" });
};

module.exports = {
  getUsersHandler,
  getUserDetailsHandler,
  addUserHandler,
  updateUserHandler,
  deleteUsertHandler,
};
