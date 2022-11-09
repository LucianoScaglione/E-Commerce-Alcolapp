import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { obtenerDetalleProducto } from "../redux/actions";
import { CartContext } from "./CartContext";
import style from './styles/Detail.module.css'

const Detail = () => {
  const { addItemToCart } = useContext(CartContext);
  const detalleProducto = useSelector(state => state.detalleProducto);
  console.log("detalle estado: ", detalleProducto)
  const dispatch = useDispatch();
  const id = useParams();
  useEffect(() => {
    dispatch(obtenerDetalleProducto(id))
  }, [dispatch])
  return (
    <div>
      <Link className={style.linkUrl} to='/'>
      <p className={style.volver}>{'< Volver'}</p>
      </Link>
    <div className={style.contenedorPrincipal} key={detalleProducto.id}>
      <div className={style.contenedorImagen}>
      <img className={style.imagen} src={detalleProducto.miniatura} alt='No encontrado' />
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
      <button className={style.button} onClick={() => addItemToCart(detalleProducto)}>+ Añadir al carrito</button>
      </div>
      <div className={style.contenedorTexto}>
       <h4>Envíos y devoluciones</h4>
       <p>Usted será responsable de pagar sus propios costos de envío para devolver su artículo. Los gastos de envío no son reembolsables.</p>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Detail;