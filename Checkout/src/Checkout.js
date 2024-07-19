import styles from './Checkout.module.css';
import { LoadingIcon } from './Icons';
import { getProducts } from './dataService';
import React, { useState, useEffect, useRef } from 'react';


// You are provided with an incomplete <Checkout /> component.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.

// Demo video - You can view how the completed functionality should look at: https://drive.google.com/file/d/1o2Rz5HBOPOEp9DlvE9FWnLJoW9KUp5-C/view?usp=sharing

// Once the <Checkout /> component is mounted, load the products using the getProducts function.
// Once all the data is successfully loaded, hide the loading icon.
// Render each product object as a <Product/> component, passing in the necessary props.
// Implement the following functionality:
//  - The add and remove buttons should adjust the ordered quantity of each product
//  - The add and remove buttons should be enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the available count for that product.
//  - The total shown for each product should be calculated based on the ordered quantity and the price
//  - The total in the order summary should be calculated
//  - For orders over $1000, apply a 10% discount to the order. Display the discount text only if a discount has been applied.
//  - The total should reflect any discount that has been applied
//  - All dollar amounts should be displayed to 2 decimal places


const Product = ({ id, name, availableCount, price, orderedQuantity, total, onAdd, onRemove }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{availableCount}</td>
      <td>${price}</td>
      <td>{orderedQuantity}</td>
      <td>${total}</td>
      <td>
        <button 
          className={styles.actionButton} 
          onClick={() => onAdd(id)} 
          disabled={orderedQuantity >= availableCount}
        >
          +
        </button>
        <button 
          className={styles.actionButton} 
          onClick={() => onRemove(id)} 
          disabled={orderedQuantity <= 0}
        >
          -
        </button>
      </td>
    </tr>
  );
};

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      const updatedDataWithQuantity= data.map(product => ({ ...product, orderedQuantity: 0 }))
      setProducts(updatedDataWithQuantity);
      setLoading(false);
    };

    fetchProducts();
  });


  const handleAdd = (id) => {
    setProducts(products.map(product =>
      product.id === id
        ? { ...product, orderedQuantity: product.orderedQuantity + 1 }
        : product
    ));
  };

  const handleRemove = (id) => {
    setProducts(products.map(product =>
      product.id === id
        ? { ...product, orderedQuantity: product.orderedQuantity - 1 }
        : product
    ));
  };

  const calculateTotal = () => {
    // reducer function to reduce the total 
    const sumFunction = (sum, product) => {
      return sum + product.orderedQuantity * product.price;
    };
  
    const total = products.reduce(sumFunction, 0);
    return total;
  };

  const total = calculateTotal();
  const discount = total > 1000 ? total * 0.10 : 0;
  
  return (
    <div>
      <header className={styles.header}>        
        <h1>Electro World</h1>        
      </header>
      <main>
        {loading ? <LoadingIcon /> : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th># Available</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <Product
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    availableCount={product.availableCount}
                    price={product.price}
                    orderedQuantity={product.orderedQuantity}
                    total={product.orderedQuantity * product.price}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                  />
                ))}
              </tbody>
            </table>
            <h2>Order summary</h2>
            {discount > 0 && <p><b>Discount: {discount.toFixed(2)}</b></p>}
            <p>Total: ${total.toFixed(2)}</p>
          </>
        )}
      </main>
    </div>
  );
};

export default Checkout;


