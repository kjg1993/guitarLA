import React from "react";
import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";

export const useCart = () => {
  // useEffect es un buen lugar para colocar código que consulte a una API o localStorage
  // Este useEffect se ejecuta una vez cuando el componente está listo (componentDidMount)
  // useEffect(() => {
  //   console.log('El componente esta listo');
  // }, []) // los corchetes vacíos indican que se ejecutará solo una vez, cuando el componente esté listo

  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  // Estado para almacenar la lista de guitarras
  const [data, setData] = useState(db);
  // Estado para almacenar los artículos en el carrito de compras
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 12;
  const MIN_ITEMS = 1;

  // Obtener el carrito almacenado en el localStorage al cargar la página
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Función para agregar una guitarra al carrito
  function addToCart(item) {
    // Verificar si el artículo ya está en el carrito
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return;
      // Si el artículo ya está en el carrito, incrementar su cantidad
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      // Si el artículo no está en el carrito, agregarlo con una cantidad de 1
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  function removeFromCart(id) {
    // Esta función se encarga de eliminar una guitarra del carrito según su id

    // console.log('Eliminando...', id);
    // Esta línea está comentada, pero si la descomentas, imprimirá en la consola el id del elemento que se está eliminando

    setCart((prevCart) =>
      // La función setCart actualiza el estado del carrito.
      // Se recibe el estado anterior del carrito como argumento (prevCart).
      prevCart.filter(
        (guitar) =>
          // Se filtran las guitarras en el carrito, manteniendo solo aquellas cuyo id no coincida con el id proporcionado.
          guitar.id !== id
        // La función filter crea una nueva matriz que contiene todas las guitarras excepto la que tiene el id proporcionado.
      )
    );
  }

  // Aumentar Cantidad
  function increaseQuantity(id) {
    // Crea una nueva versión del carrito con la cantidad actualizada
    const updatedCart = cart.map((item) => {
      // Busca el ítem con el id coincidente y verifica que la cantidad no exceda el máximo permitido
      if (item.id === id && item.quantity < MAX_ITEMS) {
        // Si se encuentra el ítem y la cantidad es menor al máximo, aumenta la cantidad en 1
        return {
          ...item, // Mantiene las otras propiedades del ítem sin cambios
          quantity: item.quantity + 1, // Pero solamente quiero que Increment la cantidad
        };
      }
      // Si el ítem no coincide con el id o ya tiene la cantidad máxima, retorna el ítem sin cambios
      return item;
    });

    // Actualiza el estado del carrito con la nueva versión
    setCart(updatedCart);
  }

  // Disminuir Cantidad
  function decreaseQuantity(id) {
    // Crea una nueva versión del carrito con la cantidad actualizada
    const updatedCart = cart.map((item) => {
      // Busca el ítem con el id coincidente y verifica que la cantidad sea mayor al mínimo permitido
      if (item.id === id && item.quantity > MIN_ITEMS) {
        // Si se encuentra el ítem y la cantidad es mayor al mínimo, disminuye la cantidad en 1
        return {
          ...item, // Mantiene las otras propiedades del ítem sin cambios
          quantity: item.quantity - 1, // Decrementa la cantidad
        };
      }
      // Si el ítem no coincide con el id o ya tiene la cantidad mínima, retorna el ítem sin cambios
      return item;
    });

    // Actualiza el estado del carrito con la nueva versión
    setCart(updatedCart);
  }

  function clearCart(params) {
    setCart([]);
  }

  // Estado Derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);

 const cartTotal = () =>
    cart.reduce((total, item) => total + item.quantity * item.price, 0);

  return {
    //variables
    data,
    cart,
    isEmpty,
    //funciones
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    cartTotal
  };
};

export default useCart;
