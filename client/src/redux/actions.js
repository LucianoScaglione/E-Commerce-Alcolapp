import axios from 'axios';
import swal from 'sweetalert';

export const OBTENER_PRODUCTOS = "OBTENER_PRODUCTOS";
export const OBTENER_DETALLE_PRODUCTO = "OBTENER_DETALLE_PRODUCTO";
export const BUSCAR_PRODUCTO = "BUSCAR_PRODUCTO";
export const OBTENER_USUARIOS = "OBTENER_USUARIOS";
export const BUSCAR_USUARIO = "BUSCAR_USUARIO";
export const OBTENER_ORDENES = "OBTENER_ORDENES";
export const DETALLE_ORDEN = "DETALLE_ORDEN";
export const FILTRAR_PRECIO = "FILTRAR_PRECIO";
export const VARIOS_FILTROS = "VARIOS_FILTROS";
export const ORDENES_USUARIO = "ORDENES_USUARIO";
export const FILTROS_PANEL = "FILTROS_PANEL";
export const BUSCAR_USUARIOS = "BUSCAR_USUARIOS";
export const BUSCAR_PRODUCTO_ID = "BUSCAR_PRODUCTO_ID";
export const OBTENER_ORDEN_ID = "OBTENER_ORDEN_ID";
export const COMENTARIOS_PRODUCTO = "COMENTARIOS_PRODUCTO";
export const VACIAR_ESTADOS = "VACIAR_ESTADOS";
export const FILTROS_ORDENES_PANEL = "FILTROS_ORDENES_PANEL";
export const PRODUCTOS_DESTACADOS = "PRODUCTOS_DESTACADOS";
export const OBTENER_PRODUCTOS_PANEL = "OBTENER_PRODUCTOS_PANEL";
export const ELIMINAR_USUARIO = "ELIMINAR_USUARIO";
export const ELIMINAR_ORDEN = "ELIMINAR_ORDEN";
export const ELIMINAR_PRODUCTO = "ELIMINAR_PRODUCTO";
export const FAVORITOS_USUARIO = "FAVORITOS_USUARIO";
export const ELIMINAR_FAVORITO = "ELIMINAR_FAVORITO";
export const PRODUCTO_FAVORITO = "PRODUCTO_FAVORITO";
export const COMENTARIOS_USUARIO = "COMENTARIOS_USUARIO";
export const VACIAR_ESTADO_COMENTARIOS_USUARIO = "VACIAR_ESTADO_COMENTARIOS_USUARIO";
export const ELIMINAR_PRODUCTOS_CATEGORIA = "ELIMINAR_PRODUCTOS_CATEGORIA";

export const obtenerProductos = () => {
  return (dispatch) => {
    return axios.get('http://localhost:3001/products')
      .then(res => dispatch({ type: OBTENER_PRODUCTOS, payload: res.data }))
      .catch(error => console.log(error))
  };
};

export const obtenerDetalleProducto = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/products/${payload.id}`)
      .then(res => dispatch({ type: OBTENER_DETALLE_PRODUCTO, payload: res.data }))
      .catch(error => console.log(error))
  };
};

export const buscarProducto = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/products?titulo=${payload}`)
      .then(res => dispatch({ type: BUSCAR_PRODUCTO, payload: res.data }))
      .catch(error => swal({
        title: "No se encontraron resultados",
        text: "intente nuevamente",
        icon: "error",
      }));
  };
};

export const buscarProductoPorId = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/products?id=${payload}`)
      .then(res => dispatch({ type: BUSCAR_PRODUCTO_ID, payload: res.data }))
      .catch(error => swal({
        title: "No se encontraron resultados",
        text: "intente nuevamente",
        icon: "error",
      }))
  };
};

export const actualizarProducto = (id, payload) => {
  return () => {
    return axios.put(`http://localhost:3001/products/${id}`, payload)
      .then(res => { return res })
      .catch(error => console.log(error))
  };
};

export const crearProducto = (payload) => {
  return () => {
    return axios.post('http://localhost:3001/products', payload)
      .then(res => { return res })
      .catch(error => console.log(error));
  };
};

export const eliminarProducto = (payload) => {
  return (dispatch) => {
    return axios.delete(`http://localhost:3001/products/${payload}`)
      .then(res => dispatch({ type: ELIMINAR_PRODUCTO, payload }))
      .catch(error => console.log(error));
  };
};

export const obtenerUsuarios = () => {
  return (dispatch) => {
    return axios.get('http://localhost:3001/users')
      .then(res => dispatch({ type: OBTENER_USUARIOS, payload: res.data }))
      .catch(error => console.log(error))
  };
};

export const buscarUsuario = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/users?id=${payload}`)
      .then(res => dispatch({ type: BUSCAR_USUARIO, payload: res.data }))
      .catch(error => console.log(error))
  };
};

export const buscarUsuariosPorNombre = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/users?nombre=${payload}`)
      .then(res => dispatch({ type: BUSCAR_USUARIOS, payload: res.data }))
      .catch(error => swal({
        title: "No se encontraron usuarios registrados con ese nombre",
        text: "intente nuevamente",
        icon: "error",
      }))
  };
};

export const actualizarUsuario = (id, payload) => {
  return () => {
    return axios.put(`http://localhost:3001/users/${id}`, payload)
      .then(res => { return res })
      .catch(error => console.log(error))
  }
}

export const eliminarUsuario = (payload) => {
  return (dispatch) => {
    return axios.delete(`http://localhost:3001/users/${payload}`)
      .then(res => dispatch({ type: ELIMINAR_USUARIO, payload }))
      .catch(error => console.log(error));
  };
};

export const obtenerOrdenes = () => {
  return (dispatch) => {
    return axios.get('http://localhost:3001/orders')
      .then(res => dispatch({ type: OBTENER_ORDENES, payload: res.data }))
      .catch(error => console.log(error));
  };
};

export const obtenerOrdenesPorId = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/orders?id=${payload}`)
      .then(res => dispatch({ type: OBTENER_ORDEN_ID, payload: res.data }))
      .catch(error => swal({
        title: "No se encontraron órdenes registradas con ese id",
        text: "intente nuevamente",
        icon: "error",
      }));
  };
};

export const obtenerDetalleOrden = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/orders/${payload}`)
      .then(res => dispatch({ type: DETALLE_ORDEN, payload: res.data }))
      .catch(error => console.log(error));
  };
};

export const buscarOrdenesUsuario = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/orders/user/${payload}`)
      .then(res => dispatch({ type: ORDENES_USUARIO, payload: res.data }))
      .catch(error => console.log(error));
  };
};

export const actualizarOrden = (id, payload) => {
  return () => {
    return axios.put(`http://localhost:3001/orders/${id}`, { estado: payload })
      .then(res => { return res })
      .catch(error => console.log(error));
  };
};

export const eliminarOrden = (payload) => {
  return (dispatch) => {
    return axios.delete(`http://localhost:3001/orders/${payload}`)
      .then(res => dispatch({ type: ELIMINAR_ORDEN, payload }))
      .catch(error => console.log(error));
  };
};

export const filtrarPorPrecio = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/products?orden=${payload}`)
      .then(res => dispatch({ type: FILTRAR_PRECIO, payload: res.data }))
      .catch(error => console.log(error));
  };
};

export const filtrarPorCategoria = (payload) => {
  return {
    type: VARIOS_FILTROS,
    payload
  };
};

export const filtrosProductosPanel = (payload) => {
  return {
    type: FILTROS_PANEL,
    payload
  };
};

export const filtrosOrdenesPanel = (payload) => {
  return {
    type: FILTROS_ORDENES_PANEL,
    payload
  };
};

export const obtenerProductosPanel = () => {
  return (dispatch) => {
    return axios.get('http://localhost:3001/products')
      .then(res => dispatch({ type: OBTENER_PRODUCTOS_PANEL, payload: res.data }))
      .catch(error => console.log(error))
  };
};

export const crearComentario = (payload) => {
  return () => {
    return axios.post('http://localhost:3001/comments', payload)
      .then(res => {
        return swal("Comentario creado correctamente", {
          icon: "success",
        })
      })
      .catch(error => console.log(error));
  };
};

export const obtenerComentarioProducto = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/comments/${payload}`)
      .then(res => dispatch({ type: COMENTARIOS_PRODUCTO, payload: res.data }))
      .catch(error => console.log(error));
  };
};

export const vaciarEstados = () => {
  return {
    type: VACIAR_ESTADOS
  };
};

export const productosMasVendidos = () => {
  return (dispatch) => {
    return axios.get('http://localhost:3001/products')
      .then(res => dispatch({ type: PRODUCTOS_DESTACADOS, payload: res.data }))
      .catch(error => console.log(error))
  };
};

export const agregarFavorito = async (payload) => {
  const agregar = await axios.post('http://localhost:3001/favorites', payload);
  return agregar;
};

export const favoritosUsuario = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/favorites/${payload}`)
      .then(res => dispatch({ type: FAVORITOS_USUARIO, payload: res.data }))
      .catch(error => console.log(error));
  };
};

export const eliminarFavorito = (payload) => {
  return (dispatch) => {
    return axios.delete(`http://localhost:3001/favorites/${payload}`)
      .then(res => dispatch({ type: ELIMINAR_FAVORITO, payload }))
      .catch(error => console.log(error));
  };
};

export const consultaProductoFavorito = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/favorites/${payload.userId}/${payload.productoId}`)
      .then(res => dispatch({ type: PRODUCTO_FAVORITO, payload: res.data }))
      .catch(error => console.log(error));
  };
};

export const comentariosDeUsuario = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/comments/user/${payload}`)
      .then(res => dispatch({ type: COMENTARIOS_USUARIO, payload: res.data }))
      .catch(error => console.log(error));
  };
};

export const vaciarComentariosDeUsuario = () => {
  return {
    type: VACIAR_ESTADO_COMENTARIOS_USUARIO
  };
};

export const eliminarProductosCategoria = (payload) => {
  return (dispatch) => {
    return axios.delete(`http://localhost:3001/categories/${payload}`)
      .then(res => dispatch({ type: ELIMINAR_PRODUCTOS_CATEGORIA, payload: payload }))
      .catch(error => console.log(error));
  };
};