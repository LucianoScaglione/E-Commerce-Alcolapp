const { Ordenes, Usuarios, Productos } = require('../db');

const findAllOrder = async (req, res, next) => {
  try {
    // const ordenesTotales = await Ordenes.findAll({ include: { model: Usuarios, attributes: ['id', 'nombre', 'apellido', 'imagen', 'email', 'celular'] }});
    const ordenesTotales = await Ordenes.findAll({ include: { all: true } /*Productos*/ });

    ordenesTotales.length ? res.send(ordenesTotales) : res.status(404).send("No existen órdenes registradas");
  } catch (error) {
    next(error);
  };
};

const createOrder = async (req, res, next) => {
  try {
    const { id, estado, fecha, precio_orden, productId } = req.body
    const orden = req.body;
    console.log("order: ", orden);
    const usuario = await Usuarios.findByPk(req.body.id_usuario);
    const crearOrden = await Ordenes.create({
      id,
      estado,
      fecha,
      precio_orden,
    })
    productId.map(async e => { await crearOrden.addProductos(e) })
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
    const orden = await Ordenes.findOne({ where: { id } });
    if (orden) {
      await orden.update({ estado });
      res.send("Orden actualizada", orden)
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
  createOrder,
  updateOrder,
  deleteOrder
}



        