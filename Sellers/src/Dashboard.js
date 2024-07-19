import styles from './Dashboard.module.css';
import { LoadingIcon } from './Icons';
import { getOrders } from './dataService';
import { useState, useEffect } from 'react';


// // Overview:
// // You are provided with an incomplete <Dashboard /> component.
// // Demo video - You can view how the completed functionality should look at: https://drive.google.com/file/d/1lH8ojlvb62I_9z3jGxhNEY_-8S4trNo7/view?usp=sharing 
// // This demo video uses the same dataset, so your total and ranking calculations should match it
// // You are not allowed to add any additional HTML elements.
// // You are not allowed to use refs.

// // Requirements:
// // Once the <Dashboard /> component is mounted, load the order data using the getOrders function imported above
// // Once all the data is successfully loaded, hide the loading icon
// // Calculate and display the total revenue
// // Display a ranking showing the sellers ordered by their total revenue using the <SellerRanking /> component. 
// // The seller with the highest revenue should be shown at the top with position 1. 
// // All the revenue values should only consider Confirmed orders. Canceled orders should be ignored.
// // All dollar amounts should be displayed to 2 decimal places
// // The getOrders function times out frequently. Display any errors returned while loading the data in the provided div. 
// // The retry button should clear the error and reattempt the request


const SellerRanking = ({ position, sellerName, sellerRevenue }) => {
  return (
    <tr>
      <td>{position}</td>
      <td>{sellerName}</td>
      <td>${sellerRevenue.toFixed(2)}</td>
    </tr>
  );
};

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  const sumFunction = (total, order) => {
    return total + order.revenue;
  };
  const calculateTotalRevenue = () => {
    const confirmedOrders = orders.filter(order => order.status === 'Confirmed');
    const totalRevenue = confirmedOrders.reduce(sumFunction, 0);
    return totalRevenue;
  };

  const calculateSellerRevenue = () => {
    const confirmedOrders = orders.filter(order => order.status === 'Confirmed');
    const sellerRevenue = {};
    confirmedOrders.forEach(order => {
      const currentRevenue = sellerRevenue[order.sellerName] || 0;
      sellerRevenue[order.sellerName] = currentRevenue + order.revenue;
    });
    return sellerRevenue;
  };

  const sortedSellers = () => {
    const sellerRevenue = calculateSellerRevenue();
    const entries = Object.entries(sellerRevenue);
    entries.sort((a, b) => b[1] - a[1]);
    const sortedData = entries.map(([sellerName, revenue]) => ({
      sellerName,
      revenue,
    }));
    return sortedData;

  };

  const sortedSellersData = sortedSellers();

  return (
    <div>
      <header className={styles.header}>
        <h1>Top Sellers</h1>
      </header>
      <main>
        {loading && <LoadingIcon />}
        {error && (
          <div className={styles.errorContainer}>
            <div className={styles.errorMessage}>{error}</div>
            <button onClick={fetchOrders}>Retry</button>
          </div>
        )}
        {!loading && !error && (
          <>
            <div>
              <p className={styles.summary}>
                <strong>Total revenue: </strong>
                <span id="totalRevenue">${calculateTotalRevenue().toFixed(2)}</span>
              </p>
            </div>
            <h2>Seller Rankings</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Seller Name</th>
                  <th>Seller Revenue</th>
                </tr>
              </thead>
              <tbody>
              {sortedSellersData.map((seller, index) => (
                  <SellerRanking
                    key={seller.sellerName}
                    position={index + 1}
                    sellerName={seller.sellerName}
                    sellerRevenue={seller.revenue}
                  />
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
