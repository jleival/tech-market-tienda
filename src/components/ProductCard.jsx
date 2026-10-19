import { useContext } from 'react'; // 1. Importamos useContext
import { Card, Button, Badge } from 'react-bootstrap';
import { CartContext } from '../context/CartContext'; // 2. Importamos CartContext

const ProductCard = ({ id, title, price, category, thumbnail, stock }) => {
  // 3. Extraemos agregarAlCarrito del contexto
  const { agregarAlCarrito } = useContext(CartContext);

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={thumbnail}
        alt={title}
        style={{ height: '180px', objectFit: 'contain', padding: '12px', backgroundColor: '#fff' }}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Badge bg="secondary" className="text-uppercase">
              {category}
            </Badge>

            {stock <= 5 && (
              <Badge bg="danger">
                🔥 ¡Quedan {stock}!
              </Badge>
            )}
          </div>

          <Card.Title className="fs-6 fw-bold">{title}</Card.Title>
        </div>

        <div className="mt-3">
          <h5 className="fw-bold text-primary mb-3">${price.toLocaleString()}</h5>
          {/* 4. Conectamos el onClick del botón */}
          <Button
            variant="dark"
            className="w-100"
            size="sm"
            onClick={() => agregarAlCarrito({ id, title, price, thumbnail })}
          >
            Añadir al carrito 🛒
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;