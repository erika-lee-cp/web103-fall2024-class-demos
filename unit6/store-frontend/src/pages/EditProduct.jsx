import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const EditProduct = () => {
    const { id } = useParams()
    const [product, setProduct] = useState({title: '', price: '', description: '', image: ''})

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/products/${id}`)
            const data = await res.json();
            setProduct(data);
        }
        fetchData();
    }, [])

    const updateProduct = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/products/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    image: product.image
                }
            )
        });
        const data = await res.json();
        console.log(data);
        window.location.href= "/";
    }

    const deleteProduct = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        console.log(data);
        window.location.href= "/";
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setProduct((prev) => {
            return {
                ...prev,
                [name]:value
            }
        })
    }

    return (
        <form>
            <label>
                Product Name
                <input type='text' name='title' value={product.title} onChange={handleChange} />
            </label>

            <label>
                Price
                <input type='text' name='price' value={product.price} onChange={handleChange} />
            </label>

            <label>
                Description
                <input type='text' name='description' value={product.description} onChange={handleChange} />
            </label>

            <label>
                Image
                <input type='text' name='image' value={product.image} onChange={handleChange} />
            </label>

            <div className='edit-delete-buttons'>
                <button onClick={updateProduct}>Update</button>
                <button onClick={deleteProduct}>Delete</button>
            </div>
        </form>
    )
}

export default EditProduct