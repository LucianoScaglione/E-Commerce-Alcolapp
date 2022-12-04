const { Comentarios, Usuarios, Productos } = require('../db');

const obtenerComentariosUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comentarios = await Comentarios.findAll({ where: { usuarioId: id }, include: Productos });
    comentarios.length ? res.send(comentarios) : res.status(404).send("No existen comentarios registrados de este usuario");
  } catch (error) {
    next(error);
  };
};

const obtenerComentario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contenedor = await Comentarios.findAll({
      where: {
        ProductoId: id
      }, include: Usuarios
    });
    contenedor.length ? res.send(contenedor) : res.status(404).send('No existen comentarios');
  } catch (error) {
    next(error);
  };
};

const crearComentario = async (req, res, next) => {
  try {
    const crearComentario = await Comentarios.create({
      usuarioId: req.body.usuarioId,
      descripcion: req.body.descripcion,
      UsuarioId: req.body.usuarioId,
      ProductoId: req.body.id
    });
    res.send("Comentario creado correctamente");
  } catch (error) {
    next(error);
  };
};

module.exports = {
  obtenerComentariosUsuario,
  obtenerComentario,
  crearComentario
};