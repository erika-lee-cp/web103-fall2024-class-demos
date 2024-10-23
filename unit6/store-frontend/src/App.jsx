import { useRoutes, Link } from 'react-router-dom'
import AllProducts from './pages/AllProducts'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import './App.css'

const App = () => {
  
  let element = useRoutes([
    {
      path: '/',
      element: <AllProducts />
    },
    {
      path: '/add',
      element: <AddProduct />
    },
    {
      path: '/edit/:id',
      element: <EditProduct />
    }
  ])

  return (
    <main>
      <nav>
        <ul>
          <li><h1>🎇 Fancy Electronics Store</h1></li>
        </ul>
        <ul>
          <li><Link to='/' role='button'>All Products</Link></li>
          <li><Link to='/add' role='button'>Add Product</Link></li>
        </ul>
      </nav>

      <section>
        {element}
      </section>
    </main>
  )
}

export default App
