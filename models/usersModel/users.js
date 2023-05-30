const { DataTypes } = require("sequelize");

const userModel = (sequelize) => {
  return sequelize.define(
    "User",
    {
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        // allowNull defaults to true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      address: {
        type: DataTypes.STRING,
        // allowNull: false,
        // allowNull defaults to true
      },
      gender: {
        type: DataTypes.STRING,

        // allowNull defaults to true
      },
      contact_number: {
        type: DataTypes.INTEGER,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      tableName: "users",
      timestamps: true, // don't forget to enable timestamps!
      createdAt: false, // I don't want createdAt
      updatedAt: false, // "updateTimestamp", // I want updatedAt to actually be called updateTimestamp
    }
  );
  return User;
};
module.exports = userModel;
