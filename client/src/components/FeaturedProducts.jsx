import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './styles/FeaturedProducts.module.css';
import izquierda from '../images/izquierda.svg'
import derecha from '../images/derecha.svg'

const FeaturedProducts = ({ productos }) => {
  const masVendidos = productos.sort((a, b) => {
    if (a.cantidadVendida > b.cantidadVendida) {
      return -1
    }
    if (a.cantidadVendida < b.cantidadVendida) {
      return 1
    }
    return 0
  }).slice(0, 30);
  const [paginaProductos, setPaginaProductos] = useState(1);
  const productosPorSeccion = 5;
  const indiceUltimoProducto = paginaProductos * productosPorSeccion;
  const indicePrimerProducto = indiceUltimoProducto - productosPorSeccion;
  const productosDestacados = masVendidos.slice(indicePrimerProducto, indiceUltimoProducto);
  const paginado = (numeroDePagina) => {
    setPaginaProductos(numeroDePagina)
  };
  return (
    <section className={style.contenedor}>
      <div>
      <h2 className={style.titulo}>Productos destacados</h2>
      <div className={style.margen}>
        {paginaProductos !== 1 && <img src={izquierda} className={style.svg} onClick={() => paginado(paginaProductos - 1)} />}
        {productosDestacados.length && productosDestacados.map(destacado => {
          return (
            <div className={style.contenedorDestacados}>
              <div className={style.destacados}>
              <Link to={`/product/${destacado.id}`} className={style.link}>
              <p className={style.nombre}>{destacado.titulo}</p>
              <img className={style.imagen} src={destacado.miniatura} alt='Miniatura' />
              </Link>
              <p className={style.ventas}>Ventas: {destacado.cantidadVendida}</p>
              </div>
            </div>
          )
        })}
        {paginaProductos !== 6 && <img src={derecha} className={style.svg} onClick={() => paginado(paginaProductos + 1)} />}
      </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;