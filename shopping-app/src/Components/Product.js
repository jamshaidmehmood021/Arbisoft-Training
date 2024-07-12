import React, { useEffect } from 'react'
import { add } from '../Store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProducts} from "../Store/productSlice"
import { STATUS } from '../Store/productSlice';
import { Bars } from 'react-loading-icons'


const Product = () => {
    const dispatch = useDispatch()
    const {data: products, status} = useSelector((state) => state.product)

    //const [products, setProducts] = useState([]);

    useEffect(() =>{
        
        dispatch(fetchProducts());
        // const fetchData = async () =>{
        //     const response = await fetch ("https://fakestoreapi.com/products")
        //     const data = await response.json()
        //     //console.log(data)
        //     setProducts(data)
        // }
        // fetchData()
    },[])

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

export default Product