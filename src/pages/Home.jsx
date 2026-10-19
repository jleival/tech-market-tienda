import { useState, useEffect } from 'react'; // 1. Importamos useEffect
import { Container, Row, Col, Form, Button, ButtonGroup, Alert, Spinner } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
// import { PRODUCTOS_INICIALES } from '../data/productos'; // Lo dejamos comentado como respaldo

const Home = () => {
    // 2. Estado para guardar los productos que vienen de la API
    const [productos, setProductos] = useState([]);
    // 3. Estado para saber si la API todavía está cargando
    const [cargando, setCargando] = useState(true);

    const [busqueda, setBusqueda] = useState('');
    const [categoria, setCategoria] = useState('todos');

    // 4. Función asíncrona que consulta la API real
    const consultarApi = async () => {
        try {
            setCargando(true);
            // Consultamos smartphones y laptops reales desde DummyJSON API
            const resPhones = await fetch('https://dummyjson.com/products/category/smartphones');
            const dataPhones = await resPhones.json();

            const resLaptops = await fetch('https://dummyjson.com/products/category/laptops');
            const dataLaptops = await resLaptops.json();

            // Unimos ambos arreglos en nuestro estado "productos"
            setProductos([...dataPhones.products, ...dataLaptops.products]);
        } catch (error) {
            console.error('Error al cargar la API:', error);
        } finally {
            setCargando(false); // Terminó de cargar
        }
    };

    // 5. useEffect con [] para ejecutar consultarApi una sola vez al montar el componente
    useEffect(() => {
        consultarApi();
    }, []);

    // 6. Ahora filtramos sobre el estado "productos" que vino de la API
    const productosFiltrados = productos.filter((producto) => {
        const coincideCategoria = categoria === 'todos' || producto.category === categoria;
        const coincideBusqueda = producto.title.toLowerCase().includes(busqueda.toLowerCase());
        return coincideCategoria && coincideBusqueda;
    });

    return (
        <Container className="my-4">
            <h2 className="fw-bold mb-3">Catálogo Tecnológico</h2>

            {/* Panel de Búsqueda y Filtros */}
            <Row className="mb-4 g-3 align-items-center bg-white p-3 rounded shadow-sm mx-0">
                <Col md={6}>
                    <div className="d-flex gap-2">
                        <Form.Control
                            type="text"
                            placeholder="🔍 Buscar en la API (ej. iPhone, Samsung, Lenovo, MacBook)..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <Button variant="outline-secondary" onClick={() => setBusqueda('')}>
                            Limpiar
                        </Button>
                    </div>
                </Col>

                <Col md={6} className="d-flex justify-content-md-end">
                    <ButtonGroup>
                        <Button
                            variant={categoria === 'todos' ? 'dark' : 'outline-dark'}
                            onClick={() => setCategoria('todos')}
                        >
                            Todos ({productos.length})
                        </Button>
                        <Button
                            variant={categoria === 'smartphones' ? 'dark' : 'outline-dark'}
                            onClick={() => setCategoria('smartphones')}
                        >
                            📱 Smartphones
                        </Button>
                        <Button
                            variant={categoria === 'laptops' ? 'dark' : 'outline-dark'}
                            onClick={() => setCategoria('laptops')}
                        >
                            💻 Laptops
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>

            {/* Si está cargando mostramos un Spinner; si ya cargó, mostramos la grilla */}
            {cargando ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2 text-muted">Cargando catálogo desde la API...</p>
                </div>
            ) : productosFiltrados.length > 0 ? (
                <Row className="g-4">
                    {productosFiltrados.map((producto) => (
                        <Col md={3} sm={6} xs={12} key={producto.id}>
                            <ProductCard
                                id={producto.id}
                                title={producto.title}
                                price={producto.price}
                                category={producto.category}
                                thumbnail={producto.thumbnail}
                                stock={producto.stock}
                            />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Alert variant="warning" className="text-center">
                    😕 No encontramos productos que coincidan con <strong>"{busqueda}"</strong> en esta categoría.
                </Alert>
            )}
        </Container>
    );
};

export default Home;