import { useContext, useState } from 'react';
import { Container, Row, Col, Button, Image, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, aumentarCantidad, disminuirCantidad, vaciarCarrito, total } = useContext(CartContext);
  const [compraExitosa, setCompraExitosa] = useState(false);

  const manejarPago = () => {
    alert('🎉 ¡Compra realizada con éxito! Gracias por tu pedido en TechMarket.');
    setCompraExitosa(true);
    vaciarCarrito();
  };

  return (
    <Container className="my-5" style={{ maxWidth: '650px' }}>
      <h3 className="fw-bold mb-4">🛒 Tu Carrito de Compras</h3>

      {/* Alerta visual de compra realizada con éxito */}
      {compraExitosa && (
        <Alert variant="success" onClose={() => setCompraExitosa(false)} dismissible>
          <Alert.Heading className="fs-5 fw-bold">
            ✅ ¡Compra realizada con éxito!
          </Alert.Heading>
          <p className="mb-0">
            Tu pedido ha sido procesado correctamente. ¡Gracias por comprar en TechMarket!
          </p>
        </Alert>
      )}

      {/* Renderizado condicional: si el carrito está vacío vs si tiene productos */}
      {cart.length === 0 ? (
        <div className="bg-white p-4 rounded shadow-sm text-center">
          <p className="text-muted mb-3">Tu carrito aún está vacío.</p>
          <Link to="/" className="btn btn-outline-dark">
            ⬅ Ir al Catálogo
          </Link>
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow-sm">
          {cart.map((item) => (
            <Row key={item.id} className="align-items-center mb-3 border-bottom pb-3">
              <Col xs={2}>
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fluid
                  rounded
                  style={{ width: '55px', height: '55px', objectFit: 'contain' }}
                />
              </Col>
              <Col xs={4}>
                <h6 className="mb-0 fw-bold">{item.title}</h6>
              </Col>
              <Col xs={3}>
                <span className="text-muted fw-semibold">
                  ${(item.price * item.count).toLocaleString()}
                </span>
              </Col>
              <Col xs={3} className="d-flex align-items-center justify-content-between">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => disminuirCantidad(item.id)}
                >
                  -
                </Button>
                <span className="fw-bold px-2">{item.count}</span>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => aumentarCantidad(item.id)}
                >
                  +
                </Button>
              </Col>
            </Row>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4 className="fw-bold mb-0">Total: ${total.toLocaleString()}</h4>
            <Button variant="dark" size="lg" onClick={manejarPago}>
              Pagar Pedido
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Cart;