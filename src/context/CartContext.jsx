import { createContext, useState } from 'react';

// 1. Creamos y exportamos el Contexto
export const CartContext = createContext();

// 2. Creamos el Proveedor (CartProvider)
export const CartProvider = ({ children }) => {
  // Nuestro carrito inicia vacío []
  const [cart, setCart] = useState([]);

  // Función para añadir un producto desde el catálogo
  const agregarAlCarrito = (producto) => {
    const existe = cart.find((item) => item.id === producto.id);

    if (existe) {
      setCart(
        cart.map((item) =>
          item.id === producto.id
            ? { ...item, count: item.count + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...producto, count: 1 }]);
    }
  };

  // Función para sumar +1 en la vista Cart
  const aumentarCantidad = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  // Función para restar -1 (y eliminar si llega a 0)
  const disminuirCantidad = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
  };

  // Función para vaciar el carrito al finalizar la compra
  const vaciarCarrito = () => {
    setCart([]);
  };

  // Calculamos el precio total acumulado
  const total = cart.reduce((acum, item) => acum + item.price * item.count, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        agregarAlCarrito,
        aumentarCantidad,
        disminuirCantidad,
        vaciarCarrito,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;