import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductos, filtrarPorPrecio } from '../redux/actions';
import Carrusel from './Carrusel';
import FeaturedProducts from './FeaturedProducts';
import Navbar from './Navbar';
import Paginated from './Paginated';
import style from './styles/Home.module.css';
import Loading from './Loading';
import Filters from './Filters';
import Card from './Card';

const Home = () => {
  const productos = useSelector(state => state.productos);
  const dispatch = useDispatch();
  const [order, setOrder] = useState(1);
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtros, setFiltros] = useState(false);
  const productosPorPagina = 20;
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const recortarProductos = productos.slice(indicePrimerProducto, indiceUltimoProducto);
  const paginado = (numero) => {
    setPaginaActual(numero);
  };
  const handleChange = (e) => {
    setOrder(e.target.value);
    dispatch(filtrarPorPrecio(e.target.value));
    setPaginaActual(1);
  }
  useEffect(() => {
    dispatch(obtenerProductos());
  }, [dispatch]);
  return (
    <div> 
      <Navbar />
      <Carrusel />
    <div className={style.divFiltroPaginadoRangoPrecio}>
      <button className={style.botonFiltro} onClick={() => {!filtros ? setFiltros(true) : setFiltros(false)}}><svg className={style.svgFiltro} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/></svg>Filtros</button>
      <Paginated 
        productos={productos.length}
        paginado={paginado}
        productosPorPagina={productosPorPagina}
      />
    <div className={style.divSelectPrecioYSvg}>
      <svg className={style.svgSelect} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3 0 0c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z"/></svg>
      <select onChange={e => handleChange(e)}>
        <option hidden>Precio</option>
        <option value='descendente'>Menor precio</option>
        <option value='ascendente'>Mayor precio</option>
      </select>
    </div>
    </div>
    <div className={style.divContenedorPadre}>
    { filtros && 
    <div className={style.divFiltros}>
      <Filters setPaginaActual={setPaginaActual} />
    </div>
    }
    <div className={style.divMargenContenedor}>
    <div>
    {
      productos.length ? 
      <Card productos={recortarProductos} /> : <Loading />
    }
    </div>
    </div>
    </div>
      <FeaturedProducts productos={productos} />
    </div>
  )
}

export default Home;