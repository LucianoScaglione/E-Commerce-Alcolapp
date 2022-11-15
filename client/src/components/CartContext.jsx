import axios from "axios";
import { isAuthenticated } from './AuthService';
import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import swal from 'sweetalert';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const productosEnLocalStorage = localStorage.getItem('cartProducts');
      return productosEnLocalStorage ? JSON.parse(productosEnLocalStorage) : [];
    } catch (error) {
      return [];
    };
  });
  const usuario = isAuthenticated();
  const history = useHistory();
  
  const addItemToCart = (product) => {
    const inCart = cartItems.find((productInCart) => productInCart.id === product.id);
    if (inCart) {
      setCartItems(cartItems.map((productInCart) => {
        if (productInCart.id === product.id) {
          return { ...inCart, amount: inCart.amount + 1 };
        } else return productInCart;
      }));
    } else {
    setCartItems([...cartItems, { ...product, amount: 1 }]);
  };
  swal({
    title: "Producto agregado al carrito",
    input: "text",
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
    buttons: {
      confirm: { text: 'Ir al carrito' },
      cancel: 'Seguir comprando'
    }
  })
    .then((will) => {
      if (will) {
        history.push('/cart')
      } else {
        return null
      }
    });
 };

 const addItemToCart2 = (product) => {
  const inCart = cartItems.find((productInCart) => productInCart.id === product.id);
  if (inCart) {
    setCartItems(cartItems.map((productInCart) => {
      if (productInCart.id === product.id) {
        return { ...inCart, amount: inCart.amount + 1 };
      } else return productInCart;
    }));
  } else {
  setCartItems([...cartItems, { ...product, amount: 1 }]);
 };
};

 const deleteItemToCart = (product) => {
  const inCart = cartItems.find((productInCart) => productInCart.id === product.id);
  console.log("inCart deleteitemtocart", inCart)
  if (inCart.amount === 1) {
    return setCartItems(cartItems.filter((productInCart) => productInCart.id !== product.id));
  } else {
    setCartItems(cartItems.map((productInCart) => {
        if (productInCart.id === product.id) {
          return { ...inCart, amount: inCart.amount - 1 };
        } else return productInCart;
      })
    );
  }
};

const deleteAllCart = () => {
  setCartItems([]);
}

const sendMP = async () => {
    const compra = cartItems.map(item => {
      return {
        id: item.id,
        title: item.title,
        description: item.titulo,
        picture_url: item.miniatura,
        category_id: item.idCategoria,
        quantity: item.amount,
        unit_price: item.precio,
      };
    });
    const body = {
      item: compra,
      id_usuario: usuario.usuario.id,
      productId: cartItems.map(e => e.id)
    };
    try {
      const respuesta = await axios.post('http://localhost:3001/payments', body)
        .then(res => { return res.data[0] })
        .catch(error => console.log(error));
      swal({
        title: "¡Link de compra generado correctamente!",
        icon: "success",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        buttons: {
          confirm: { text: 'Ir al link' },
          cancel: 'Cancelar'
        }
      })
        .then((will) => {
          if (will) {
            window.location.href = respuesta;
            setCartItems([]);
          } else {
            return swal("Cancelaste tu compra", {
              icon: "error",
            });;
          };
        });
      return respuesta;
    } catch (error) {
      console.log(error);
    }
}

useEffect(() => {
  localStorage.setItem('cartProducts', JSON.stringify(cartItems));
  console.log("cartItems: ", cartItems)
}, [cartItems]);

return (
  <CartContext.Provider value={{ cartItems, addItemToCart, addItemToCart2, deleteItemToCart, deleteAllCart , sendMP}}>
    { children }
  </CartContext.Provider>
 );
};