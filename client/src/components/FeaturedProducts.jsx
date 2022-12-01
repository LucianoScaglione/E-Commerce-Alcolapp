import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './styles/FeaturedProducts.module.css';
import izquierda from '../images/svg/izquierda.svg';
import derecha from '../images/svg/derecha.svg';
import { productosMasVendidos } from '../redux/actions';

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const productosDestacados = useSelector(state => state.productosDestacados);
  const [paginaProductos, setPaginaProductos] = useState(1);
  const productosPorSeccion = 5;
  const indiceUltimoProducto = paginaProductos * productosPorSeccion;
  const indicePrimerProducto = indiceUltimoProducto - productosPorSeccion;
  const masVendidos = productosDestacados.slice(indicePrimerProducto, indiceUltimoProducto);
  const paginado = (numeroDePagina) => {
    setPaginaProductos(numeroDePagina);
  };
  useEffect(() => {
    dispatch(productosMasVendidos());
  }, [dispatch]);
  return (
    <section className={style.contenedor}>
      <div>
      <h2 className={style.titulo}>Productos destacados</h2>
      <div className={style.margen}>
        {paginaProductos !== 1 && <img src={izquierda} className={style.svgIzq} onClick={() => paginado(paginaProductos - 1)} />}
        {masVendidos.length ? masVendidos.map((destacado, index) => {
          return (
            <div key={index} className={style.contenedorDestacados}>
              <div className={style.destacados}>
              <Link to={`/product/${destacado.id}`} className={style.link}>
              <p className={style.nombre}>{destacado.titulo}</p>
              <img className={style.imagen} src={destacado.miniatura} alt='Miniatura' />
              </Link>
              <p className={style.ventas}>Ventas: {destacado.cantidadVendida}</p>
              </div>
            </div>
          )
        }) : <svg className={style.svg} xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle className={style.opacity} cx="12" cy="12" r="10" stroke="black" strokeWidth="4"></circle>
        <path className={style.path} fill="black" // black pinta el circle en negro
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg> } 
        {paginaProductos !== 6 && <img src={derecha} className={style.svgDer} onClick={() => paginado(paginaProductos + 1)} />}
      </div>
      </div>
    </section>
  );
  };
  
export default FeaturedProducts;



  //   <section>
  //     <div className={style.contenedor}>
  //     <h2>Productos destacados</h2>
  //     <div className={style.margenContenedorProductos}>
  //       { paginaProductos !== 1 && <img className={style.svgIzq} src={izquierda} onClick={() => paginado(paginaProductos - 1)} />  } 
  //       { paginaProductos !== 6 && <img className={style.svgDer} src={derecha} onClick={() => paginado(paginaProductos + 1)} /> }
  //     <div className={style.contenedorProductosDestacados}>
  //       { masVendidos.length && masVendidos.map((destacado, index) => {
  //         return (
  //           <div className={style.productos} key={index}>
  //           <div className={style.productosDatos}>
  //             <Link className={style.link} to={`/product/${destacado.id}`}>
  //             <p className={style.nombre}>{destacado.titulo}</p>
  //             <img src={destacado.miniatura} alt='Miniatura' />
  //             </Link>
  //             <p className={style.pVentas}>Ventas: {destacado.cantidadVendida}</p>
  //           </div>
  //           </div>
  //         )
  //       })}
  //     </div>
  //     </div>
  //     </div>
  //   </section>
  // );