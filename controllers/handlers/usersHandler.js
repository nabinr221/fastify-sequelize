// const users = require("../../cloud/users");
const bcrypt = require("bcrypt");
const Joi = require("joi");
/**
 * hanlder for user add
 */
const addUserHandler = async (request, reply) => {
  // const users = request.server.User;
  // const data = request.body;

  try {
    const users = request.server.User;
    const hash = await bcrypt.hashSync(request.body.password, 10);
    request.body.password = hash;
    const user = await users.findOne({
      where: { username: request.body.username },
    });
    if (!user) {
      const userData = await users.create(request.body);
      if (userData) {
        reply.code(200).send({ msg: "User Added Successfully" });
      } else {
        reply.code(400).send({ error: "Unable to Save User data. " });
      }
    } else {
      reply.code(409).send({ error: "User already axist !!!" });
    }
    // const userData = await users.create(data);
    // if (userData) {
    //   reply.code(200).send({ message: "User Added successfully" });
    // } else {
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
  request.session.isAuth = true;
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
    if (!userData) {
      reply.code(404).send({ error: "Data Not Found" });
    } else {
      reply.code(200).send(userData);
    }
  } catch (error) {
    // console.log(error);
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
      reply.code(400).send({ error: "Something went worng !!!" });
    } else {
      reply.code(200).send({ msg: "User Update successfully" });
    }
  } catch (error) {
    reply.code(500).send({ error: "Internal Server error" });
  }
};

const deleteUsertHandler = async (request, reply) => {
  const users = request.server.User;
  const { id } = request.params;
  try {
    const userData = await users.destroy({ where: { id } });
    if (userData) {
      reply.code(200).send({ msg: "Data deleted succesfully" });
    } else {
      reply.code(400).send({ error: "something went worng!! " });
    }
  } catch (error) {
    reply.code(500).send({ error: "Internal Server error" });
  }
};

module.exports = {
  getUsersHandler,
  getUserDetailsHandler,
  addUserHandler,
  updateUserHandler,
  deleteUsertHandler,
};
