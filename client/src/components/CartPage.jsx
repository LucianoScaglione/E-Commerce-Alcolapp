import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import style from './styles/CartPage.module.css';
import mas from '../images/mas.svg'
import menos from '../images/menos.svg'

const CartPage = () => {
  const [productsLength, setProductsLength] = useState(0);
  const { cartItems, addItemToCart, addItemToCart2, deleteItemToCart, deleteAllCart } = useContext(CartContext);
  const total = cartItems.reduce((previous, current) => previous + current.amount * current.precio, 0);
  useEffect(() => {
    setProductsLength(cartItems.reduce((previous, current) => previous + current.amount, 0));
  }, [cartItems]);
  return (
    <div>
      <Link className={style.linkUrl} to='/'>
      <p className={style.volver}>{'< Volver'}</p>
      </Link>
      <div className={style.contenedorProductos}>
      <h1 className={style.titulo}>Carrito</h1>
     {!productsLength ?
      <p className={style.parrafo}>Tu carrito está vacío</p> 
      :
      <div>
        {cartItems.map(producto => {
          return (
            <div className={style.prueba}>
            <div key={producto.id} className={style.contenedorProducto}>
              {/* <button onClick={() => deleteAllCart()}>Borrar del carrito</button> */}
            <div className={style.imagenTitulo}>
            <img src={producto.miniatura} alt={producto.titulo} />
            <h1>{producto.titulo}</h1>
            </div>
            <div>
            <div className={style.contenedorVarios}>
            <button onClick={() => deleteItemToCart(producto)}><img src={menos} className={style.svg} /></button>
            <p>{producto.amount}</p>
            <button onClick={() => addItemToCart2(producto)}><img src={mas} className={style.svg} /></button>
            <p>${producto.precio * producto.amount}</p>
            </div>
            </div>
            </div>
            </div>
          )
        })}
      </div>
     }
     <p className={style.total}>Total: ${total},00</p>
     <button className={style.comprar} disabled={total === 0}>Comprar</button>
     </div>
    </div>
  )
}

export default CartPage;