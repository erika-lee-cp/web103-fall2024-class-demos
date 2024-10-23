import { useState } from 'react'

const AddProduct = () => {

    const [product, setProduct] = useState({title: '', price: '', description: '', image: ''})

    const addProduct = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/products', {
            method: 'POST',
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
        window.location.href = "/";
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
                <input type='text' id='title' name='title' value={product.title} onChange={handleChange} />
            </label>

            <label>
                Price
                <input type='text' id='price' name='price' value={product.price} onChange={handleChange} />
            </label>

            <label>
                Description
                <textarea id='description' name='description' value={product.description} onChange={handleChange} />
            </label>

            <label>
                Image
                <input type='text' id='image' name='image' value={product.image} onChange={handleChange} />
            </label>

            <button type='submit' onClick={addProduct}>Submit</button>
        </form>
    )
}

export default AddProduct