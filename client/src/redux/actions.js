import axios from 'axios';
import swal from 'sweetalert';

export const OBTENER_PRODUCTOS = "OBTENER_PRODUCTOS";
export const OBTENER_DETALLE_PRODUCTO = "OBTENER_DETALLE_PRODUCTO";
export const BUSCAR_PRODUCTO = "BUSCAR_PRODUCTO";
export const OBTENER_USUARIOS = "OBTENER_USUARIOS";
export const BUSCAR_USUARIO = "BUSCAR_USUARIO";

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

export const eliminarProducto = async (payload) => {
const eliminar = await axios.delete(`http://localhost:3001/products/${payload}`);
return swal("Producto eliminado correctamente", {
  icon: "success",
});
}

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

export const eliminarUsuario = async (payload) => {
  const eliminar = await axios.delete(`http://localhost:3001/users/${payload}`);
  return swal("Usuario eliminado correctamente", {
    icon: "success",
  });
}
