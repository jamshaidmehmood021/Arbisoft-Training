import React,{useEffect } from 'react'
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments} from '../Store/commentSlice';
import { STATUS } from "../Store/commentSlice";
import { Bars } from 'react-loading-icons'

const ApiData = () => {
  
  const dispatch = useDispatch()
  const {data: apiData, status} = useSelector((state) => state.comment)

  useEffect(() => {
    dispatch(fetchComments())
  }, []);

  if(status === STATUS.LOADING){
        return <Bars stroke="red" />
  }
    if(status === STATUS.ERROR){
        return <p>Something went Wrong .....</p>
  }

  return (
    <>
      <div>
      <Header title="Task Tracker"/>
      </div>
      <div>
        
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
      </div>
    </>
  )
}

export default ApiData