import { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CartContext } from './CartContext';
import style from './styles/CartPage.module.css';
import mas from '../images/svg/mas.svg';
import menos from '../images/svg/menos.svg';
import swal from 'sweetalert';
import { isAuthenticated } from './AuthService';
import Loading from './Loading';

const CartPage = () => {
  const usuario = isAuthenticated();
  const history = useHistory();
  const [productsLength, setProductsLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const { cartItems, addItemToCart2, deleteItemToCart, removeProductsCart, sendMP } = useContext(CartContext);
  const total = cartItems.reduce((previous, current) => previous + current.amount * current.precio, 0);
  const comprarMP = () => {
    if (usuario.usuario) {
      swal({
        title: "¿Quieres continuar con la compra?",
        text: "Una vez confirmada, generaremos el link de pago",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            setLoading(true);
            sendMP();
          } else {
            return swal("Cancelaste tu compra", {
              icon: "error",
            });
          };
        });
    } else {
      swal("Debes iniciar sesión para poder comprar", {
        icon: "warning",
      });
      history.push('/login');
    };
  };
  useEffect(() => {
    setProductsLength(cartItems.reduce((previous, current) => previous + current.amount, 0));
  }, [cartItems]);
  if (loading) {
    return <Loading />
  };
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
            {cartItems.map((producto, index) => {
              return (
                <div key={index} className={style.prueba}>
                  <div key={producto.id} className={style.contenedorProducto}>
                    <div className={style.imagenTitulo}>
                      <img src={producto.miniatura} alt={producto.titulo} />
                      <h1>{producto.titulo}</h1>
                      <button className={style.botonEliminar} title='Eliminar producto' onClick={() => removeProductsCart(producto)}><svg className={style.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" /></svg></button>
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
        <button className={style.comprar}
          onClick={() => comprarMP()} disabled={total === 0}>Comprar</button>
      </div>
    </div>
  );
};

export default CartPage;