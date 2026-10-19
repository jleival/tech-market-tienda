import { useContext } from 'react'; // 1. Importamos useContext
import { Navbar, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // 2. Importamos CartContext

const MyNavbar = () => {
  // 3. Extraemos el total desde CartContext
  const { total } = useContext(CartContext);

  return (
    <Navbar bg="dark" variant="dark" className="py-3 shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          ⚡ TechMarket
        </Navbar.Brand>

        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-outline-light">
            🏠 Catálogo
          </Link>

          <Link to="/cart" className="btn btn-outline-info text-white">
            🛒 Carrito: <Badge bg="info" text="dark">${total.toLocaleString()}</Badge>
          </Link>
        </div>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;