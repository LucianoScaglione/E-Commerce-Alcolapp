const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Favoritos",
    {
      userId: {
        type: DataTypes.INTEGER
      }
    }
  );
};