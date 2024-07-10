import React,{useEffect, useState} from 'react'
import Header from './Header';

const ApiData = () => {

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Simulating fetching data from an API
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then((data) => {console.log(data)
        setApiData(data)})
        .catch((error) => {
          console.error("Error fetching data:", error)
        })

  }, []);

  return (
    <>
      <div>
      <Header title="Task Tracker"/>
      </div>
      <div>
        {apiData.length > 0 ? (
        <div>
          <h2>Data fetched from the API:</h2>
          <ul>
            {apiData.map((item) => (
              <div key={item.id}>
              <b>POST ID : </b> {item.name} <br/>
              <b>ID:</b> {item.id}<br/>
              <b>Name : </b> {item.name}<br/>
              <b>Email : </b> {item.email}<br/>
              <b>Comment body :</b> {item.body} <br/>
              <hr/>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading API data...</p>
      )}
      </div>
    </>
  )
}

export default ApiData