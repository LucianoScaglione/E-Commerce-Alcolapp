import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { obtenerProductos } from '../redux/actions';
import Carrusel from './Carrusel';
import FeaturedProducts from './FeaturedProducts';
import Navbar from './Navbar';
import Paginated from './Paginated';
import style from './styles/Home.module.css';
import { CartContext } from './CartContext';
import Loading from './Loading';

const Home = () => {
  const { addItemToCart } = useContext(CartContext);
  const productos = useSelector(state => state.productos);
  const dispatch = useDispatch();
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 20;
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const recortarProductos = productos.slice(indicePrimerProducto, indiceUltimoProducto);
  const paginado = (numero) => {
    setPaginaActual(numero)
  };
  useEffect(() => {
    dispatch(obtenerProductos());
  }, [dispatch]);
  return (
    <div> 
      <Navbar />
      <Carrusel />
      <Paginated 
        productos={productos.length}
        paginado={paginado}
        productosPorPagina={productosPorPagina}
      />
    <div className={style.contenedorPadre}>
      <div className={style.contenedorHijo}>
    {
      productos.length ? 
      recortarProductos.length && recortarProductos.map((producto) => {
        return (
          <div className={style.contenedorCard}>
            <div className={style.card}>
            <h1 className={style.titulo}>{producto.titulo}</h1>
            <Link to={`/product/${producto.id}`}>
            <img className={style.imagen} src={producto.miniatura} alt='no encontrado' />
            </Link>
            <div className={style.precioYStock}>
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
      }) : <Loading />
    }
     </div>
    </div>
        <FeaturedProducts productos={productos} />
    </div>
  )
}

export default Home;