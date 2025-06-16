import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

function EditProductButton({ productId }) {
    return (
        <Button variant="primary" href={`/products/edit-product/${productId}`}>
            Edit Product
        </Button>
    );
}

function AddToCart() {
    const [showAlert, setShowAlert] = useState(false);

    if (showAlert) {
        return (
            <Alert variant="success">
                Product added to cart!
            </Alert>
        );
    }

    return (
        <Button variant="warning" className="mb-3" onClick={() => setShowAlert(true)}>
            Add To Cart
        </Button>
    );
}
function DeleteProduct({ productId })
{
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            console.log(`Deleting product with ID: ${productId}`);
            await axios.delete(`https://fakestoreapi.com/products/${productId}`);
            console.log('Product deleted successfully');
            // Set a state to show the alert after successful delete
            setShowAlert(true);
            window.location.href = '/products';

        } catch (error) {
            console.error(`Failed to delete product: ${error.message}`);
            setShowAlert(false);
            setError(error);
            setShowError(true);
        }
    }

    const handleModal = () => {
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    if (showAlert) {
        return (
            <Alert variant="success">
                Product deleted successfully!
            </Alert>
        );
    }
    
    if (showError) {
        return (
            <Alert variant="danger">
                {error.message || 'Failed to delete product.'}
            </Alert>
        );
    }

    if (showModal) {
        return (
             <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
                >
                <Modal.Dialog>
                    <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Delete Product?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <p>Are you sure you want to delete this product?</p>
                    <p>You will be redirected to Home Page</p>
                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>Close</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete Product</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
    
    else {
        return (
            <Button variant="danger" onClick={handleModal}>
                Delete Product
            </Button>
        );
    }
}

function ProductDetailsPage() {
    const {  productId } = useParams();          
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(`ProductDetailsPage rendered with productID: ${productId}`);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log(`Fetching product with ID: ${productId}`);
                const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
                setProduct(response.data);
                console.log('Product fetched successfully:', response.data);
            } 
            catch (error) {
                setError(`Failed to fetch product: ${error.message}`);
            } 
            finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }
    , [productId]); // Refetch product if productID changes

    if (loading) {
        return (
            <Container>
                <h3>
                <Spinner
                    animation="border"
                    variant="info"
                    style={{ marginRight: '15px' }}
                    role="status"
                />
                Loading The Product Details...
                </h3>
            </Container>
            )
        }
    if (error) return <Alert variant='danger'>{error}</Alert>;

    if (!product) return null;

    return (
        <Container className="mt-5 d-flex gap-4 justify-content-center text-start">
            <Card border="warning border-2" style={{ width: '30rem', padding: '2rem' }}>
                <Card.Img src={product.image}></Card.Img>
            </Card>
            <Card border="warning border-2" style={{ width: '30rem' }}>
                <Card.Header>
                    <h2 style={{ textAlign: 'center', width: '100%' }}>{product.title}</h2>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                       <span style={{ fontWeight: 'bold' }}>Category:</span> {product.category}
                    </Card.Text>
                    <Card.Text>
                       <span style={{ fontWeight: 'bold' }}>Description:</span> {product.description}
                    </Card.Text>
                    <Card.Text>
                       <span style={{ fontWeight: 'bold' }}>Price:</span> ${product.price}
                    </Card.Text>
                    <div className="d-grid gap-2 mb-2">
                        <AddToCart />
                        <DeleteProduct productId={productId} />
                        <EditProductButton productId={productId} />
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}
export default ProductDetailsPage;