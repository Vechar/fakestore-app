import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';

function AddProductPage() {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
    });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://fakestoreapi.com/products', formData);
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
        <Container className="mt-5" style={{ maxWidth: 700 }}>
            <h2 className="mb-4 text-center">Create Product</h2>

            {submitted && (
                <Alert
                    variant="success"
                    dismissible
                    onClose={() => setSubmitted(false)}
                    className="text-center"
                >
                    Product created successfully!
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

            <Form onSubmit={handleSubmit} className="p-4 rounded shadow-sm bg-light">
                <div className="mb-3">
                    <FloatingLabel controlId="floatingTitle" label="Product Title">
                        <Form.Control
                            type="text"
                            placeholder="Enter product title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                </div>
                <div className="mb-3">
                    <FloatingLabel controlId="floatingCategory" label="Category">
                        <Form.Control
                            type="text"
                            placeholder="Enter category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                </div>
                <div className="mb-3">
                    <FloatingLabel controlId="floatingPrice" label="Price">
                        <Form.Control
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                </div>
                <div className="mb-3">
                    <FloatingLabel controlId="floatingDescription" label="Description">
                        <Form.Control
                            as="textarea"
                            placeholder="Enter product description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            style={{ height: 80 }}
                            required
                        />
                    </FloatingLabel>
                </div>
                <div className="d-flex justify-content-center">
                    <Button variant="warning" type="submit" className="px-5 mt-2">
                        Submit
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default AddProductPage;