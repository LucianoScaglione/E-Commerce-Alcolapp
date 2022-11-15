const { Productos } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');

const getInformation = async () => {
  const url = 'https://api.mercadolibre.com/sites/MLA/search?category=';
  const categorias = [
    "MLA10511",
    "MLA40995",
    "MLA403656",
    "MLA1404"
    // "MLA194298" jugos
  ].map(category => url + category);
  const resultado = await Promise.all(
    categorias.map(async (link) => {
      return (await axios(link)).data.results;
    })
  );
  return resultado;
}

const findAllProducts = async (req, res, next) => {
  try {
    const { titulo, orden } = req.query;
    if (titulo) {
      const encontrarProductos = await Productos.findAll({
        where: {
          titulo: { 
            [Op.iLike]: `%${titulo}%` 
          } 
        }
      })
      encontrarProductos.length ? res.send(encontrarProductos) : res.status(404).send('No se encontraron productos');
    }
    if (orden === 'descendente') {
      const productos = await Productos.findAll();
      const ordenarProductos = productos.sort((a, b) => {
        if(a.precio > b.precio) {
          return 1
        }
        if (a.precio < b.precio) {
          return -1
        }
        return 0
      });
      res.send(ordenarProductos);
    }
    if (orden === 'ascendente') {
      const productos = await Productos.findAll();
      const ordenarProductos = productos.sort((a, b) => {
        if(a.precio > b.precio) {
          return -1
        }
        if (a.precio < b.precio) {
          return 1
        }
        return 0
      });
      res.send(ordenarProductos);
    }
    else {
    const cargarInformacion = await getInformation();
    const obtenerDatos = await Productos.findAll();
    if (!obtenerDatos.length) {
      const crearProductos = cargarInformacion.flat().map((dato) => {
        return {
          id: dato.id,
          titulo: dato.title,
          miniatura: dato.thumbnail,
          precio: dato.price,
          cantidadVendida: dato.sold_quantity,
          cantidadDisponible: dato.available_quantity,
          idCategoria: dato.category_id,
          categoria: dato.category_id === "MLA10511" ? "Whisky" : dato.category_id === "MLA40995" ? "Gin" : dato.category_id === "MLA403656" ? "Cerveza" : dato.category_id === "MLA1404" && "Vino"
      }
    });
      await Productos.bulkCreate(crearProductos);
      res.status(200).send(crearProductos);
    } else {
      res.send(obtenerDatos);
     }
    }
  } catch (error) {
    next(error);
  }
};

const findOneProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const buscarProducto = await Productos.findOne({ where: { id } });
    buscarProducto ? res.send(buscarProducto) : res.status(404).send("No existe producto");
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { titulo, miniatura, precio, cantidadVendida, cantidadDisponible, idCategoria } = req.body;
    if (!(titulo && miniatura && precio && idCategoria)) { res.status(404).send("No se llenaron todos los campos requeridos") };
    const crearProducto = await Productos.create({
      id: `MLA${Math.round(Math.random() * 1000000000)}`,
      titulo,
      miniatura,
      precio,
      cantidadVendida: cantidadVendida ? cantidadVendida : 0,
      cantidadDisponible: cantidadDisponible ? cantidadDisponible : 0,
      idCategoria
    });
    res.send({ "created": true, crearProducto });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { titulo, miniatura, precio, cantidadVendida, cantidadDisponible } = req.body;
    const producto = await Productos.findByPk(id);
    if (!producto) { res.status(404).send("Producto no encontrado") };
    const actualizarProducto = producto.update({
    titulo: titulo ? titulo : producto.titulo,
    miniatura: miniatura ? miniatura : producto.miniatura,
    precio: precio ? precio : producto.miniatura,
    cantidadVendida: cantidadVendida ? cantidadVendida : producto.cantidadVendida,
    cantidadDisponible: cantidadDisponible ? cantidadDisponible : producto.cantidadDisponible
    });
    res.send({ "updated": true, "producto": producto });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await Productos.findByPk(id);
    if (producto) {
      await producto.destroy();
      res.send({ "destroy": true });
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllProducts,
  findOneProduct,
  updateProduct,
  deleteProduct,
  createProduct
}