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

const findOneFavorite = async (req, res, next) => {
  try {
    const { id, productoId } = req.params;
    const contenedor = await Favoritos.findAll({ where: { userId: id }, include: Productos });
    const contieneFavorito = contenedor.map(e => e.Productos).flat().filter(e => e.id === productoId);
    contieneFavorito.length ? res.send(contieneFavorito) : res.status(404).send("No existe producto favorito con ese id");
  } catch (error) {
    next(error);
  };
};

const deleteFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const borrarId = id.toString();
    const eliminar = await Favoritos.destroy({ where: { id: borrarId } });
    const actualizarBd = await Favoritos.findAll({ include: Productos });
    res.send({ actualizarBd });
  } catch (error) {
    next(error);
  };
};

module.exports = {
  createFavorite,
  findOneFavorite,
  findFavorite,
  deleteFavorite
};