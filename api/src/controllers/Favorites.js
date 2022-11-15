const { Favoritos, Productos } = require('../db');

const createFavorite = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;
    const crear = await Favoritos.create({
        userId
    });
    const buscarProducto = await Productos.findByPk(productId);
    await crear.addProductos(buscarProducto);
    res.send(buscarProducto);
  } catch (error) {
    next(error);
  };
};

const findFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const buscarFavoritos = await Favoritos.findAll({
      where: {
        userId: id
      },
      include: Productos
    });
    buscarFavoritos.length ? res.send(buscarFavoritos) : res.status(404).send('No existen productos agregados a favoritos');
  } catch (error) {
    next(error);
  };
};

const deleteFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eliminar = await Favoritos.destroy({ where: { id } });
    res.send({ destroy: true, eliminar });
  } catch (error) {
    next(error);
  };
};

module.exports = {
  createFavorite,
  findFavorite,
  deleteFavorite
}