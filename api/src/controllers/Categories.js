const { Productos } = require('../db');

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { idCategoria, category } = req.body;
    const actualizarCategoria = await Productos.findAll({ where: { idCategoria: id } });
    if (actualizarCategoria) {
      await actualizarCategoria.update({
        idCategoria: idCategoria ? idCategoria : actualizarCategoria.idCategoria,
        category: category ? category : actualizarCategoria.category
      });
    };
    res.send("Categoría actualizada correctamente");
  } catch (error) {
    next(error);
  };
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Productos.destroy({ where: { idCategoria: id } })
    res.send({ destroy: true })
  } catch (error) {
    next(error);
  };
};

module.exports = {
  // updateCategory,
  deleteCategory
};