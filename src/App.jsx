import { Routes, Route} from 'react-router-dom'
import NavBar from "./components/NavBar"
import NotFound from './components/NotFound'
import HomePage from "./components/HomePage"
import ProductsPage from './components/ProductsPage'
import ProductDetailsPage from './components/ProductDetailsPage'
import AddProductPage from './components/AddProductPage'
import EditProductPage from './components/EditProductPage'

function App() {

  return (
    <>
      <title>Fake Store</title>

      <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/products/edit-product/:productId" element={<EditProductPage />} />
          <Route path='/add-product' element={<AddProductPage />}></Route>
        </Routes>
    </>
  )
}

export default App
