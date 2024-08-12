import React from 'react';
import { useDispatch } from 'react-redux';
import { Bars } from 'react-loading-icons';
import { useGetProductsQuery } from '../Services/productApi';
import { add } from '../Store/cartSlice';

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, error, isLoading } = useGetProductsQuery();

  const handleAddToCart = (product) => {
    dispatch(add(product));
  };

  if (isLoading) {
    return <Bars stroke="#98ff98" />;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div className="productsWrapper">
      {products?.map((product) => (
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
  );
};

export default Product;
