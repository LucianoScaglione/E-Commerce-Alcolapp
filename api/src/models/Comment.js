const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Comentarios",
    {
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }
  ), { timestamps: false };
};