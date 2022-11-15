import axios from 'axios';
import swal from 'sweetalert';

export const OBTENER_PRODUCTOS = "OBTENER_PRODUCTOS";
export const OBTENER_DETALLE_PRODUCTO = "OBTENER_DETALLE_PRODUCTO";
export const BUSCAR_PRODUCTO = "BUSCAR_PRODUCTO";
export const OBTENER_USUARIOS = "OBTENER_USUARIOS";
export const BUSCAR_USUARIO = "BUSCAR_USUARIO";
export const FAVORITOS_USUARIO = "FAVORITOS_USUARIO";
export const OBTENER_ORDENES = "OBTENER_ORDENES";
export const DETALLE_ORDEN = "DETALLE_ORDEN";
export const FILTRAR_PRECIO = "FILTRAR_PRECIO";
export const VARIOS_FILTROS = "VARIOS_FILTROS";
export const ORDENES_USUARIO = "ORDENES_USUARIO";

export const obtenerProductos = () => {
  return (dispatch) => {
    return axios.get('http://localhost:3001/products')
      .then(res => dispatch({ type: OBTENER_PRODUCTOS, payload: res.data }))
      .catch(error => console.log(error))
  }
}

export const obtenerDetalleProducto = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/products/${payload.id}`)
      .then(res => dispatch({ type: OBTENER_DETALLE_PRODUCTO, payload: res.data }))
      .catch(error => console.log(error))
  }
}

export const buscarProducto = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/products?titulo=${payload}`)
      .then(res => dispatch({ type: BUSCAR_PRODUCTO, payload: res.data }))
      .catch(error => swal({
        title: "No se encontraron resultados",
        text: "intente nuevamente",
        icon: "error",
      }))
  }
}

export const actualizarProducto = (id, payload) => {
  return () => {
    return axios.put(`http://localhost:3001/products/${id}`, payload)
      .then(res => { return res })
      .catch(error => console.log(error))
  }
}

export const eliminarProducto = (payload) => {
  return () => {
    return axios.delete(`http://localhost:3001/products/${payload}`)
      .then(res => { return swal("Producto eliminado correctamente", {
        icon: "success" }); })
      .catch(error => console.log(error));
  };
};

export const obtenerUsuarios = () => {
  return (dispatch) => {
    return axios.get('http://localhost:3001/users')
      .then(res => dispatch({ type: OBTENER_USUARIOS, payload: res.data }))
      .catch(error => console.log(error))
    }
  }
  
export const buscarUsuario = (payload) => {
  return (dispatch) => {
   return axios.get(`http://localhost:3001/users?id=${payload}`)
      .then(res => dispatch({type: BUSCAR_USUARIO, payload: res.data}))
      .catch(error => console.log(error))
  }
} 
  
export const actualizarUsuario = (id, payload) => {
  return () => {
    return axios.put(`http://localhost:3001/users/${id}`, payload)
      .then(res => { return res })
      .catch(error => console.log(error))
  }
}

export const eliminarUsuario = (payload) => {
  return () => {
    return axios.delete(`http://localhost:3001/users/${payload}`)
      .then(res => { return swal("Usuario eliminado correctamente", {
        icon: "success",
      }); })
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

export const obtenerDetalleOrden = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/orders/${payload}`)
      .then(res => dispatch({ type: DETALLE_ORDEN, payload: res.data }))
      .catch(error => console.log(error));
  };
};

export const actualizarOrden = (id, payload) => {
  return () => {
    return axios.put(`http://localhost:3001/orders/${id}`, {estado: payload})
      .then(res => { return res })
      .catch(error => console.log(error));
  };
};

export const eliminarOrden = (payload) => {
  return () => {
    return axios.delete(`http://localhost:3001/orders/${payload}`)
      .then(res => { return swal("Orden eliminada correctamente", {
        icon: "success",
      }); })
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

export const buscarOrdenesUsuario = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/orders/user/${payload}`)
      .then(res => dispatch({ type: ORDENES_USUARIO, payload: res.data }))
      .catch(error => console.log(error));
  };
};




export const agregarFavorito = async (payload) => {
  const agregar = await axios.post('http://localhost:3001/favorites', payload);
  return agregar;
};
  
export const favoritosUsuario = (payload) => {
  console.log(payload)
  return (dispatch) => {
    return axios.get(`http://localhost:3001/favorites/${payload}`)
      .then(res => dispatch({ type: FAVORITOS_USUARIO, payload: res.data }))
      .catch(error => console.log(error))
  }
}
  
export const eliminarFavorito = async (payload) => {
   const eliminar = axios.delete(`http://localhost:3001/favorites/${payload}`) 
   return eliminar;
}