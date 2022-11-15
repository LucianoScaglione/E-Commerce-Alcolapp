import swal from "sweetalert";
import { OBTENER_PRODUCTOS, OBTENER_DETALLE_PRODUCTO, BUSCAR_PRODUCTO, OBTENER_USUARIOS, BUSCAR_USUARIO, FAVORITOS_USUARIO, OBTENER_ORDENES, DETALLE_ORDEN, FILTRAR_PRECIO, VARIOS_FILTROS, ORDENES_USUARIO } from "./actions";

const initialState = {
    productos: [],
    productosCopia: [],
    detalleProducto: [],
    usuarios: [],
    usuario: [],
    favoritos: [],
    ordenes: [],
    orden: [],
    ordenUsuario: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case OBTENER_PRODUCTOS: {
            return {
                ...state,
                productos: payload,
                productosCopia: payload
            }
        }
        case OBTENER_DETALLE_PRODUCTO: {
            return {
                ...state,
                detalleProducto: payload
            }
        }
        case BUSCAR_PRODUCTO: {
            return {
                ...state,
                productos: payload 
            }
        }
        case OBTENER_USUARIOS: {
            return {
                ...state,
                usuarios: payload
            }
        }
        case BUSCAR_USUARIO: {
            return {
                ...state,
                usuario: payload
            }
        }
        case FAVORITOS_USUARIO: {
            console.log(payload)
            return {
                ...state,
                favoritos: payload
            }
        }
        case OBTENER_ORDENES: {
            return {
                ...state,
                ordenes: payload
            }
        }
        case DETALLE_ORDEN: {
            return {
                ...state,
                orden: payload
            }
        }
        case FILTRAR_PRECIO: {
            return {
                ...state,
                productos: payload
            }
        }
        case VARIOS_FILTROS: {
            const { categoria, min, max } = payload;
            const filtrados = categoria && !min && !max ? state.productosCopia.filter(producto => producto.categoria === categoria) : state.productosCopia.filter(producto => producto.categoria === categoria && producto.precio > min && producto.precio < max);
            const contenedor = filtrados.length ? filtrados : swal("Error", "No se encontraron resultados, intente nuevamente", "error");
            return {
                ...state,
                productos: contenedor.length ? contenedor : state.productosCopia
            };
        }
        case ORDENES_USUARIO: {
            return {
                ...state,
                ordenUsuario: payload
            }
        }
        default: return state;
    }
}

export default reducer;