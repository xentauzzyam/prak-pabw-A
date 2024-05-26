"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Auth extends Model {}

  Auth.init(
    {
      id_user: DataTypes.INTEGER,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      verified: { type: DataTypes.BOOLEAN, defaultValue: false },
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Auth",
      hooks: {
        beforeCreate: async (auth, options) => {
          const maxId = await Auth.max("id");
          auth.id = maxId + 1;
        },
      },
    }
  );

  return Auth;
};
