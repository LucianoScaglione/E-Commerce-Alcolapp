import { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { obtenerDetalleProducto, obtenerComentarioProducto, vaciarEstados, agregarFavorito, consultaProductoFavorito, eliminarFavorito } from "../redux/actions";
import { CartContext } from "./CartContext";
import { isAuthenticated } from "./AuthService";
import style from './styles/Detail.module.css';
import usuarioImg from '../images/usuario.png';
import Loading from './Loading';
import sacarFavorito from '../images/svg/favoritoNav.svg';
import agregarAFavorito from '../images/svg/favorito.svg';

const Detail = () => {
  const { addItemToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const detalleProducto = useSelector(state => state.detalleProducto);
  const comentarios = useSelector(state => state.comentarios);
  const favorito = useSelector(state => state.favorito);
  const dispatch = useDispatch();
  const usuario = isAuthenticated();
  const id = useParams();
  const agregarFavoritos = () => {
    dispatch(agregarFavorito({ userId: usuario.usuario.id, productId: detalleProducto.id }));
  };
  const eliminarDeFavorito = () => {
    dispatch(eliminarFavorito(favorito.map(e => (e.favoritos_productos.FavoritoId))));
  };
  useEffect(() => {
    dispatch(obtenerDetalleProducto(id))
      .then(setLoading(false))
    return () => {
      dispatch(vaciarEstados());
    };
  }, [dispatch]);
  useEffect(() => {
    !favorito.length && usuario.usuario && dispatch(consultaProductoFavorito({ userId: usuario.usuario.id, productoId: id.id }));
  }, [favorito, dispatch]);
  useEffect(() => {
    detalleProducto.id && dispatch(obtenerComentarioProducto(detalleProducto.id));
  });
  if (loading) {
    return <Loading />
  };
  return (
    <div>
      <Link className={style.linkUrl} to='/'>
        <p className={style.volver}>{'< Volver'}</p>
      </Link>
      <div className={style.contenedorPrincipal} key={detalleProducto.id}>
        <div className={style.contenedorImagen}>
          {favorito.length ? <img className={style.svg} src={sacarFavorito} alt='not found' title='Eliminar de favoritos' onClick={() => eliminarDeFavorito()} /> : !favorito.length && <img className={style.svg} src={agregarAFavorito} alt='not found' title='Agregar a favoritos' onClick={() => agregarFavoritos(detalleProducto)} />}
          <img className={style.imagen} src={detalleProducto.miniatura} alt='not found' />
        </div>
        <div>
          <div className={style.contenedorDatos}>
            <i>{detalleProducto.categoria}</i>
            <h1 className={style.titulo}>{detalleProducto.titulo}</h1>
            <div className={style.contenedorParrafos}>
              <p>Disponibles: {detalleProducto.cantidadDisponible}</p>
              <p>Vendidos: {detalleProducto.cantidadVendida}</p>
              <p>Precio: ${detalleProducto.precio}</p>
            </div>
            <button className={style.button} onClick={() => addItemToCart(detalleProducto)} disabled={detalleProducto.cantidadDisponible === 0 && true}>+ Añadir al carrito</button>
          </div>
          <div className={style.contenedorTexto}>
            <h4>Envíos y devoluciones</h4>
            <p>Usted será responsable de pagar sus propios costos de envío para devolver su artículo. Los gastos de envío no son reembolsables.</p>
          </div>
        </div>
      </div>
      <div className={style.tituloComentario}>
        <h3>Comentarios:</h3>
      </div>
      {
        comentarios.length ?
          comentarios.map((comentario, index) => {
            return (
              <div key={index} className={style.contenedorComentarios}>
                <div className={style.contenedorImagenUsuario}>
                  <img src={comentario.Usuario.imagen ? comentario.Usuario.imagen : usuarioImg} alt='miniatura' />
                </div>
                <div className={style.contenedorrr}>
                  <div className={style.contenedorNombreApellido}>
                    <p>{comentario.Usuario.nombre}</p>
                    <p>{comentario.Usuario.apellido}</p>
                  </div>
                  <div className={style.contenedorDescripcion}>
                    <p>{comentario.descripcion}</p>
                  </div>
                </div>
              </div>
            )
          })
          :
          <div className={style.sinComentarios}>
            <p>Sin comentarios</p>
          </div>
      }
    </div>
  );
};

export default Detail;