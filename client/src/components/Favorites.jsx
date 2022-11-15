import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { favoritosUsuario, eliminarFavorito } from '../redux/actions';
import { isAuthenticated } from "./AuthService";
import { CartContext } from "./CartContext";
import style from './styles/Favorites.module.css';
import swal from 'sweetalert';

const Favorites = () => {
  const { addItemToCart } = useContext(CartContext);
  const dispatch = useDispatch();
  const favoritos = useSelector(state => state.favoritos);
  const usuario = isAuthenticated();
  const eliminarProductoFavorito = (id) => {
    swal({
      title: "¿Quieres sacar este producto de favoritos?",
      text: "Una vez eliminado, se borrará de favoritos",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(eliminarFavorito(id));
        window.location.reload();
      } else {
        swal("Se ha cancelado la eliminación");
      }
    });
  };
  useEffect(() => {
    usuario.usuario && dispatch(favoritosUsuario(usuario.usuario.id))
  }, []);
  return (
    <div>
     <Link className={style.linkUrl} to='/'>
      <p className={style.volver}>{'< Volver'}</p>
     </Link>
    <div className={style.divContenedor}>
    <h1 className={style.h1}>Lista de favoritos</h1>
    <div className={style.divContenedorHijo}>
      {
        favoritos.length ? favoritos.map(e => e.Productos.map(producto => {
          return (
            <div className={style.divContenedorCard}>
              <div className={style.card}>
              <div className={style.divBorrar}><button title='Eliminar de favoritos' onClick={() => eliminarProductoFavorito(producto.favoritos_productos.FavoritoId)}><svg className={style.svgTacho} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg></button></div>
              <h1 className={style.titulo}>{producto.titulo}</h1>
              <img className={style.imagen} src={producto.miniatura} alt={producto.miniatura} />
              <div className={style.divPrecioYStock}>
              <p className={style.precio}>${producto.precio}</p>
              { producto.cantidadDisponible > 0 ?
               <p className={style.stock}>
              <svg xmlns="http://www.w3.org/2000/svg" className={style.svg} viewBox="0 0 20 20" fill="green">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Disponible</p> : <p className={style.stock}>
              <svg xmlns="http://www.w3.org/2000/svg" className={style.svg} viewBox="0 0 20 20" fill="red">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              No disponible</p>
              } 
            </div>
            <button className={style.button} onClick={() => addItemToCart(producto)} disabled={producto.cantidadDisponible === 0 && true} >+ Añadir al carrito</button>
            </div> 
            </div>
          )
        })) : <p>No hay productos favoritos</p>
      }
    </div>
    </div>
    </div>
  )
}

export default Favorites;