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

useEffect(() => {
  localStorage.setItem('cartProducts', JSON.stringify(cartItems));
  console.log("cartItems: ", cartItems)
}, [cartItems]);

return (
  <CartContext.Provider value={{ cartItems, addItemToCart, addItemToCart2, deleteItemToCart, deleteAllCart }}>
    { children }
  </CartContext.Provider>
 );
};