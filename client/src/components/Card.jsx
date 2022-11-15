import { useContext } from 'react';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';
import style from './styles/Card.module.css';

const Card = ({ productos }) => {
  const { addItemToCart } = useContext(CartContext);
  return (
    <div>
    { productos?.map(producto => {
      return (
      <div className={style.divContenedorCard}>
      <div className={style.divCard}>
      <h1 className={style.titulo}>{producto.titulo}</h1>
      <Link to={`/product/${producto.id}`}>
      <img className={style.imagen} src={producto.miniatura} alt='no encontrado' />
      </Link>
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
      </div> )
      })
    }
    </div>
    )
  }

export default Card;