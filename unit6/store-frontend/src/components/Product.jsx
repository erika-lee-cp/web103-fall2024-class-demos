import { Link } from 'react-router-dom'

const Product = (props) => {

    return (
        <article>
            <header>{props.title}</header>

            <div className='product-info'>
                <img src={props.image} />
                <p>${props.price}</p>
            </div>

            <footer>
                <Link to={'/edit/' + props.id} role='button'>Edit</Link>
            </footer>
        </article>
    )

}

export default Product