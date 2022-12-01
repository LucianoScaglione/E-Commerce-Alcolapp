import swal from "sweetalert";
import { OBTENER_PRODUCTOS, OBTENER_DETALLE_PRODUCTO, BUSCAR_PRODUCTO, OBTENER_USUARIOS, BUSCAR_USUARIO, OBTENER_ORDENES, DETALLE_ORDEN, FILTRAR_PRECIO, VARIOS_FILTROS, ORDENES_USUARIO, FILTROS_PANEL, BUSCAR_USUARIOS, BUSCAR_PRODUCTO_ID, OBTENER_ORDEN_ID, COMENTARIOS_PRODUCTO, VACIAR_ESTADOS, FILTROS_ORDENES_PANEL, PRODUCTOS_DESTACADOS, OBTENER_PRODUCTOS_PANEL, ELIMINAR_USUARIO, ELIMINAR_ORDEN, ELIMINAR_PRODUCTO, FAVORITOS_USUARIO, ELIMINAR_FAVORITO, PRODUCTO_FAVORITO } from "./actions";

const initialState = {
  productos: [],
  productosCopia: [],
  detalleProducto: [],
  usuarios: [],
  usuario: [],
  favoritos: [],
  favorito: {},
  ordenes: [],
  orden: [],
  ordenUsuario: [],
  comentarios: [],
  productosDestacados: [],
  productosPanel: [],
  productosPanelCopia: []
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
    case BUSCAR_PRODUCTO_ID: {
      return {
        ...state,
        productosPanel: [payload]
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
    case BUSCAR_USUARIOS: {
      return {
        ...state,
        usuarios: payload
      }
    }
    case ORDENES_USUARIO: {
      return {
        ...state,
        ordenUsuario: payload
      }
    }
    case OBTENER_ORDENES: {
      return {
        ...state,
        ordenes: payload,
        ordenesCopia: payload
      }
    }
    case DETALLE_ORDEN: {
      return {
        ...state,
        orden: payload
      }
    }
    case OBTENER_ORDEN_ID: {
      return {
        ...state,
        ordenes: [payload]
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
      const filtrados = payload === 'todos' ? state.productosCopia : categoria && !min && !max ? state.productosCopia.filter(producto => producto.categoria === categoria) : state.productosCopia.filter(producto => producto.categoria === categoria && producto.precio >= min && producto.precio <= max);
      const contenedor = filtrados.length ? filtrados : swal("Error", "No se encontraron resultados, intente nuevamente", "error");
      return {
        ...state,
        productos: contenedor.length ? contenedor : state.productosCopia
      };
    }
    case FILTROS_PANEL: {
      const contenedor = payload === 'az' ? state.productosPanelCopia.sort((a, b) => {
        if (a.titulo > b.titulo) {
          return 1
        }
        if (a.titulo < b.titulo) {
          return -1
        }
        return 0
      }) : payload === 'za' ? state.productosPanelCopia.sort((a, b) => {
        if (a.titulo > b.titulo) {
          return -1
        }
        if (a.titulo < b.titulo) {
          return 1
        }
        return 0
      }) : payload === '-ventas' ? state.productosPanelCopia.sort((a, b) => {
        if (a.cantidadVendida > b.cantidadVendida) {
          return 1
        }
        if (a.cantidadVendida < b.cantidadVendida) {
          return -1
        }
        return 0
      }) : payload === '+ventas' && state.productosPanelCopia.sort((a, b) => {
        if (a.cantidadVendida > b.cantidadVendida) {
          return -1
        }
        if (a.cantidadVendida < b.cantidadVendida) {
          return 1
        }
        return 0
      })
      return {
        ...state,
        productosPanel: contenedor
      }
    }
    case FILTROS_ORDENES_PANEL: {
      const contenedor = payload === 'todas' ? state.ordenesCopia : payload === 'cancelada' ? state.ordenesCopia.filter(order => order.estado === payload) : payload === 'pendiente' ? state.ordenesCopia.filter(order => order.estado === payload) : payload === 'finalizada' && state.ordenesCopia.filter(order => order.estado === payload);
      return {
        ...state,
        ordenes: contenedor ? contenedor : state.ordenes
      }
    }
    case COMENTARIOS_PRODUCTO: {
      return {
        ...state,
        comentarios: payload
      }
    }
    case VACIAR_ESTADOS: {
      return {
        ...state,
        detalleProducto: [],
        comentarios: [],
        favorito: []
      }
    }
    case PRODUCTOS_DESTACADOS: {
      const contenedor = payload.sort((a, b) => {
        if (a.cantidadVendida > b.cantidadVendida) {
          return -1
        }
        if (a.cantidadVendida < b.cantidadVendida) {
          return 1
        }
        return 0
      }).slice(0, 30);
      return {
        ...state,
        productosDestacados: contenedor
      }
    }
    case OBTENER_PRODUCTOS_PANEL: {
      return {
        ...state,
        productosPanel: payload,
        productosPanelCopia: payload
      }
    }
    case ELIMINAR_USUARIO: {
      const contenedor = state.usuarios.filter(e => e.id !== payload);
      return {
        ...state,
        usuarios: contenedor
      }
    }
    case ELIMINAR_ORDEN: {
      const contenedor = state.ordenes.filter(e => e.id !== payload);
      return {
        ...state,
        ordenes: contenedor
      }
    }
    case ELIMINAR_PRODUCTO: {
      const contenedor = state.productosPanel.filter(e => e.id !== payload);
      return {
        ...state,
        productosPanel: contenedor
      }
    }
    case FAVORITOS_USUARIO: {
      return {
        ...state,
        favoritos: payload
      }
    }
    case ELIMINAR_FAVORITO: {
      const contenedor = state.favoritos.filter(e => e.id !== payload);
      return {
        ...state,
        favoritos: contenedor
      }
    }
    case PRODUCTO_FAVORITO: {
      return {
        ...state,
        favorito: payload
      }
    }
    default: return state;
  };
};

export default reducer;