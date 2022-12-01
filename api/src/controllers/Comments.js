const { Comentarios, Usuarios, Productos } = require('../db');

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
      descripcion: req.body.descripcion,
      UsuarioId: req.body.UsuarioId,
      ProductoId: req.body.id
    });
    res.send("Comentario creado correctamente");
  } catch (error) {
    next(error);
  };
};

module.exports = {
  obtenerComentario,
  crearComentario
};