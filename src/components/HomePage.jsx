import { NavLink } from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function HomePage() {
    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={6}>
                    <Card
                        className="shadow-lg border-2 rounded"
                        border="warning"
                        style={{ marginTop: '-10rem' }}
                    >
                        <Card.Body className="text-center py-5 px-5">
                            <Card.Title as="h1" className="mb-4 display-4 fw-bold">
                                Welcome to the Fake Store
                            </Card.Title>
                            <Card.Text className="lead mb-4">
                                Discover our curated collection of products and enjoy a seamless shopping experience.
                            </Card.Text>
                            <Button as={NavLink} to="/products" variant="warning" size="lg">
                                Shop Now
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;