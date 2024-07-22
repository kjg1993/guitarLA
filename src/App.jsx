

import Header from './components/Header';
import Guitar from './components/Guitar';
import { useCart } from './hooks/useCart';

function App() {

  const { data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal 
  
  } = useCart();


  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty= {isEmpty}
        cartTotal = { cartTotal}
      />


      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {/* Mapear a través del estado 'data' y renderizar un componente Guitar por cada guitarra */}
          {data.map((guitar) => {
            return (
              <Guitar
                key={guitar.id} // Clave única para cada componente Guitar
                guitar={guitar} // Pasar los datos de la guitarra como prop
                addToCart={addToCart} // Pasar la función addToCart como prop
              />
            );
          })}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  );
}

export default App;
