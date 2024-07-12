import React, { useEffect, useState } from 'react'
import { add } from '../Store/cartSlice';
import { useDispatch } from 'react-redux';

const Product = () => {
    const dispatch = useDispatch()

    const [products, setProducts] = useState([]);

    useEffect(() =>{
        const fetchData = async () =>{
            const response = await fetch ("https://fakestoreapi.com/products")
            const data = await response.json()
            //console.log(data)
            setProducts(data)
        }
        fetchData()
    },[])

    const handleAddToCart = ( product) =>{
        dispatch(add(product))

    }



  return (
    <div className="productsWrapper">
            {products.map((product) => (
                <div className="card" key={product.id}>
                    <img src={product.image} alt="" />
                    <h4>{product.title}</h4>
                    <h5>{product.price}</h5>
                    <button onClick={() => handleAddToCart(product)} className="btn">
                        Add to cart
                    </button>
                </div>
            ))}
        </div>
  )
}

export default Product