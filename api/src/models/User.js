const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Usuarios",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imagen: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contraseña: {
        type: DataTypes.STRING,
        allowNull: false
      },
      celular: {
        type: DataTypes.STRING,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    { timestamps: false }
  );
};
