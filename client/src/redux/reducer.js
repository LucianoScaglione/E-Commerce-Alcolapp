import { OBTENER_PRODUCTOS, OBTENER_DETALLE_PRODUCTO, BUSCAR_PRODUCTO, OBTENER_USUARIOS, BUSCAR_USUARIO } from "./actions";

const initialState = {
    productos: [],
    productosCopia: [],
    detalleProducto: [],
    usuarios: [],
    usuario: []
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
            console.log(payload)
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
        default: return state;
    }
}

export default reducer;