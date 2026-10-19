import { Routes, Route } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { CartProvider } from './context/CartContext'; // 1. Importamos CartProvider

function App() {
  return (
    // 2. Envolvemos toda la aplicación con CartProvider
    <CartProvider>
      <div className="min-vh-100 d-flex flex-column">
        <MyNavbar />

        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;