const { Usuarios } = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const fs = require('fs');

const registrarUsuario = async (req, res, next) => {
  try {
    const { nombre, apellido, imagen, email, contraseña, celular, is_admin } = req.body;
    if (!(nombre && apellido && email && contraseña)) {
      res.status(404).send("No se llenaron los campos obligatorios");
    };
    const buscarEmail = await Usuarios.findOne({ where: { email: email } });
    if (!buscarEmail) {
      const encriptarContraseña = await bcrypt.hash(contraseña, 10);
      if (imagen) {
        let decodificarLink = new Buffer(imagen, 'base64');
        let nombreImagenGuardada = `${Date.now()}.png`;
        let AlmacenamientoLinkImagen = `public/upload/${nombreImagenGuardada}`;
        let linkImagenARenderizar = `upload/${nombreImagenGuardada}`;
        fs.writeFileSync(AlmacenamientoLinkImagen, decodificarLink);
        const crearUsuario = await Usuarios.create({
          nombre,
          apellido,
          imagen: `http://localhost:3001/${linkImagenARenderizar}`,
          email,
          contraseña: encriptarContraseña,
          celular,
          is_admin: is_admin ? is_admin : false
        });
      };
      const crearUsuario = await Usuarios.create({
        nombre,
        apellido,
        imagen,
        email,
        contraseña: encriptarContraseña,
        celular,
        is_admin: is_admin ? is_admin : false
      });
      res.send({ 'creado': true, 'usuario': crearUsuario });
    } else {
      res.status(404).send("Ya existe un correo registrado");
    };
  } catch (error) {
    next(error);
  };
};

const loguearUsuario = async (req, res, next) => {
  try {
    const { email, contraseña } = req.body;
    if (!(email && contraseña)) {
      res.status(404).send("Se requiere llenar todos los campos");
    };
    const usuario = await Usuarios.findOne({ where: { email } });
    if (usuario && (await bcrypt.compare(contraseña, usuario.contraseña))) {
      const token = jwt.sign({ usuario_id: usuario.id, email }, "secret", { expiresIn: "10h" });
      usuario.token = token;
      res.status(201).json({
        "usuario": usuario,
        "token": token
      });
    } else {
      res.status(404).send("Datos incorrectos");
    };
  } catch (error) {
    next(error);
  };
};

const obtenerUsuarios = async (req, res, next) => {
  try {
    const { id, nombre } = req.query;
    if (id) {
      const usuario = await Usuarios.findByPk(id);
      usuario ? res.send(usuario) : res.status(404).send("Usuario no encontrado");
    };
    if (nombre) {
      const usuario = await Usuarios.findAll({ where: { nombre: { [Op.iLike]: `%${nombre}%` } } });
      usuario.length ? res.send(usuario) : res.status(404).send("Usuario no encontrado");
    } else {
      const usuarios = await Usuarios.findAll();
      usuarios.length ? res.send(usuarios) : res.status(404).send("No existen usuarios registrados");
    };
  } catch (error) {
    next(error);
  };
};

const actualizarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await Usuarios.findByPk(id);
    if (usuario) {
      if (req.body.imagen) {
        let decodificarLink = new Buffer(req.body.imagen, 'base64');
        let nombreImagenGuardada = `${Date.now()}.png`
        let AlmacenamientoLinkImagen = `public/upload/${nombreImagenGuardada}`
        let linkImagenARenderizar = `upload/${nombreImagenGuardada}`
        fs.writeFileSync(AlmacenamientoLinkImagen, decodificarLink);
        const actualizarConImagen = usuario.update({
          nombre: req.body.nombre ? req.body.nombre : usuario.nombre,
          apellido: req.body.apellido ? req.body.apellido : usuario.apellido,
          email: req.body.email ? req.body.email : usuario.email,
          imagen: `http://localhost:3001/${linkImagenARenderizar}`,
          celular: req.body.celular ? req.body.celular : usuario.celular,
          is_admin: req.body.is_admin ? req.body.is_admin : false
        });
      };
      const actualizar = usuario.update({
        nombre: req.body.nombre ? req.body.nombre : usuario.nombre,
        apellido: req.body.apellido ? req.body.apellido : usuario.apellido,
        email: req.body.email ? req.body.email : usuario.email,
        imagen: usuario.imagen,
        celular: req.body.celular ? req.body.celular : usuario.celular,
        is_admin: req.body.is_admin ? req.body.is_admin : false
      });
    };
    res.send({ "updated": true, "usuario": usuario });
  } catch (error) {
    next(error);
  };
};

const borrarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eliminar = await Usuarios.destroy({ where: { id } });
    res.send({ destroy: true, eliminar });
  } catch (error) {
    next(error);
  };
};

module.exports = {
  registrarUsuario,
  loguearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  borrarUsuario
};