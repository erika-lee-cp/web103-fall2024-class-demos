import { useState, useEffect } from 'react'
import Product from '../components/Product'
import panic from '../assets/panic.gif'

const AllProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        }
        fetchData();
    }, []);

    return (
        <section>
            {
                products && products.length > 0 ?
                products.map((product, index) =>
                <Product
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    image={product.image}
                />
                ) : <img src={panic} />
            }
        </section>
    )

}

export default AllProducts