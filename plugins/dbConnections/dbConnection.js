const fastifyPlugin = require("fastify-plugin");
const { Sequelize } = require("sequelize");
const userModel = require("../../models/usersModel/users");
// const postModel = require("../../models/usersModel/post");

const databaseConnection = async (fastify, options) => {
  try {
    const sequelize = new Sequelize("spotify", "postgres", "admin", {
      host: "localhost",
      dialect: "postgres",
    });
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // const Post = postModel(sequelize);
    const User = userModel(sequelize);

    // User.hasMany(Post, { foreignKey: "userId" });
    // Post.belongsTo(User, { foreignKey: "userId" });

    // fastify.decorate("Post", Post);
    fastify.decorate("User", User);

    // await Post.sync({ force: true });
    await User.sync({ force: false });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = fastifyPlugin(databaseConnection);
