import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { remove } from '../Store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.cart)

  const handleRemoveToCart = (id) =>{
    dispatch(remove(id))
  }
  
  return (
    <div className='cartPage'>
    <div className="productsWrapper">
            { products.map((product) => (
                <div className="card" key={product.id}>
                    <img src={product.image} alt="" />
                    <h4>{product.title}</h4>
                    <h5>{product.price}</h5>
                    <button onClick= {() => handleRemoveToCart(product.id)} className="btn">
                        Remove
                    </button>
                </div>
            ))}
        </div>
      </div>
  )
}

export default Cart