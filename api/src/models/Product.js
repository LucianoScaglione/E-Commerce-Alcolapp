const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Productos",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      miniatura: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      precio: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      cantidadVendida: {
        type: DataTypes.INTEGER
      },
      cantidadDisponible: {
        type: DataTypes.INTEGER
      },
      idCategoria: {
        type: DataTypes.STRING,
        allowNull: false
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { timestamps: false }
  );
};
