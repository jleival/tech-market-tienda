import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="text-center my-5 py-5">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h3 className="mb-3">¡Ups! Página no encontrada</h3>
      <p className="text-muted mb-4">
        La ruta que intentas visitar no existe en TechMarket.
      </p>
      <Link to="/" className="btn btn-dark px-4">
        🏠 Volver al Inicio
      </Link>
    </Container>
  );
};

export default NotFound;