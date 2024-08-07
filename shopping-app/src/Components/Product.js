import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Bars } from 'react-loading-icons'

import { add } from '../Store/cartSlice';
import {fetchProducts} from "../Store/productSlice"
import { STATUS } from '../Store/productSlice';


const Product = () => {
    const dispatch = useDispatch()
    const {data: products, status} = useSelector((state) => state.product)
    useEffect(() =>{
        
        dispatch(fetchProducts());
    },[dispatch])

    const handleAddToCart = ( product) =>{
        dispatch(add(product))

    }
    if(status === STATUS.LOADING)
    {
        return <Bars stroke="#98ff98" />
    }
    if(status === STATUS.ERROR)
    {
        return <p>Something went Wrong .....</p>
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

export default Product;
