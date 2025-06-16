import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function EditProductPage() {
    const { productId } = useParams();          
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
    });

    const [submitted, setSubmitted] = useState(false);


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
    }, [productId]); // Refetch product if productID changes

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title || '',
                price: product.price || '',
                description: product.description || '',
                category: product.category || '',
            });
        }
    }, [product]);

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

    // Handler to update product state on form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === "price" ? parseFloat(value) : value;

        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: newValue,
        }));

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue,
        }));

        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`https://fakestoreapi.com/products/${product.id}`, formData);
            console.log(response.data);
            setSubmitted(true);
            setError(null);
            } 
            catch (err) {
            setError(`Error submitting the form. Please try again: ${err.message}`);
        setSubmitted(false);
        }
    };

    return (

        <Container className="mt-5 d-flex gap-4 justify-content-center text-start">
             <Form onSubmit={handleSubmit} className="p-4 rounded shadow-sm bg-light">
            <h2 className="mb-4 text-center">Edit Product</h2>

            <Card border="warning border-2" style={{ width: '30rem', padding: '2rem' }}>
                <Card.Img src={product.image}></Card.Img>
            </Card>
            <Card border="warning border-2" style={{ width: '30rem' }}>
                <Card.Header>
                   <FloatingLabel controlId="floatingTitle" label="Product Title">
                        <Form.Control
                            type="text"
                            placeholder="Enter product title"
                            name="title"
                            value={product.title}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                       <FloatingLabel controlId="floatingCategory" label="Category">
                        <Form.Control
                            type="text"
                            placeholder="Enter category"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                    </Card.Text>
                    <Card.Text>
                        <FloatingLabel controlId="floatingDescription" label="Description">
                        <Form.Control
                            as="textarea"
                            placeholder="Enter product description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            style={{ height: '20rem' }}
                            required
                        />
                    </FloatingLabel>
                    </Card.Text>
                    <Card.Text>
                       <FloatingLabel controlId="floatingPrice" label="Price">
                        <Form.Control
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Price"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                    </Card.Text>
                     <div className="d-flex justify-content-center">
                    <Button variant="warning" type="submit" className="px-5 mt-2">
                        Submit
                    </Button>
                </div>
                </Card.Body>

                {submitted && (
                    <Alert
                        variant="success"
                        dismissible
                        onClose={() => setSubmitted(false)}
                        className="text-center"
                       
                    >
                        Product edited successfully!
                    </Alert>
                    )}
                {error && (
                    <Alert
                        variant="danger"
                        dismissible
                        onClose={() => setError(null)}
                        className="text-center"
                    >
                        {error}
                    </Alert>
                )}
            </Card>
            </Form>
        </Container>
    );
}

export default EditProductPage;