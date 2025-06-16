import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function NotFound() {
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
                            <Card.Title as="h3" className="mb-4 display- fw-bold">
                               404 - Page Not Found
                            </Card.Title>
                            <Button as={NavLink} to="/" variant="warning" size="lg">
                                Go to Home
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
  );
}

export default NotFound;