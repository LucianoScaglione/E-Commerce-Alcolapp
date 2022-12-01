const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Ordenes",
    {
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