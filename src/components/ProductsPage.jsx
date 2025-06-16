import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(`Failed to fetch products: ${error.message}`);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <h3 className="mt-3">Loading Products...</h3>
            </Container>
        );
    }
    if (error) {
        return <Container className="text-center mt-5"><p>{error}</p></Container>;
    }

    return (
        <Container fluid className="min-vh-100 d-flex flex-column align-items-center justify-content-start">
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={6}>
                    <Card
                        className="shadow-lg border-2 rounded"
                        border="warning"
                    >
                        <Card.Body className="text-center py-5 px-5">
                            <Card.Title as="h1" className="mb-4 display-4 fw-bold">
                                Products
                            </Card.Title>
                            <Card.Text className="lead mb-4">
                                Discover our curated collection of products and enjoy a seamless shopping experience.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="g-4 mt-5 w-100 justify-content-center">
                {products.map(product => (
                    <Col key={product.id} md={4} lg={3} className="d-flex">
                        <Card className="h-100 d-flex flex-column shadow-sm" border="warning border-2">
                            <div style={{ width: '100%', height: '15rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'white' }}>
                                <Card.Img
                                    variant="top"
                                    src={product.image}
                                    style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }}
                                />
                            </div>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    {product.description.substring(0, 100)}...
                                </Card.Text>
                                <Card.Text className="text-muted">
                                    ${product.price.toFixed(2)}
                                </Card.Text>
                                <Link to={`/products/${product.id}`} className="btn btn-warning w-100 mt-auto">
                                    View Details
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ProductsPage;
