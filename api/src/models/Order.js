const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Ordenes",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      idUsuario: {
        type: DataTypes.INTEGER
      },
      estado: {
        type: DataTypes.STRING
      },
      fecha: {
        type: DataTypes.DATE
      },
      precio_orden: {
        type: DataTypes.INTEGER
      },
    },
    { timestamps: false }
  );
};