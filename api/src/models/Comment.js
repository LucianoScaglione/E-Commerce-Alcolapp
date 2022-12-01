const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Comentarios",
    {
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }
  ), { timestamps: false };
};