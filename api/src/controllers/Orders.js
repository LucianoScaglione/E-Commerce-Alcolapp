const { Ordenes, Usuarios, Productos } = require('../db');

const findAllOrder = async (req, res, next) => {
  try {
    // const ordenesTotales = await Ordenes.findAll({ include: { model: Usuarios, attributes: ['id', 'nombre', 'apellido', 'imagen', 'email', 'celular'] }});
    const ordenesTotales = await Ordenes.findAll({ include: { all: true } });
    ordenesTotales.length ? res.send(ordenesTotales) : res.status(404).send("No existen órdenes registradas");
  } catch (error) {
    next(error);
  };
};

const findOneOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contenedor = await Ordenes.findOne({ where: { id }, include: { all: true } })
    contenedor ? res.send(contenedor) : res.status(404).send("Orden no encontrada");
  } catch (error) {
    next(error);
  };
};

const findAllOrderUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id", id)
    const ordenes = await Ordenes.findAll({ where: { idUsuario: id }, include: Productos });
    ordenes.length ? res.send(ordenes) : res.status(404).send("El usuario no tiene órdenes realizadas");
  } catch (error) {
    next(error);
  };
};

const createOrder = async (req, res, next) => {
  try {
    console.log("le llega a ordenes: ", req.body)
    const usuario = await Usuarios.findByPk(req.body.id_usuario);
    const crearOrden = await Ordenes.create({
      id: req.body.id,
      idUsuario: req.body.id_usuario,
      estado: req.body.estado,
      fecha: req.body.fecha,
      precio_orden: req.body.precio_orden,
    })
    req.body.productId.map(async e => { await crearOrden.addProductos(e) })
    await crearOrden.addUsuarios(usuario)
    res.send(crearOrden);
  } catch (error) {
    next(error);
  };
};

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    console.log("llega ", req.body)
    const orden = await Ordenes.findOne({ where: { id } });
    if (orden) {
      await orden.update({ estado });
      res.status(200).send("Orden actualizada");
    } else {
      res.status(404).send("No existe orden con ese id");
    }
  } catch (error) {
    next(error);
  };
};

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Ordenes.destroy({ where: { id } });
    res.send({ destroy: true });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  findAllOrder,
  findOneOrder,
  findAllOrderUser,
  createOrder,
  updateOrder,
  deleteOrder
}