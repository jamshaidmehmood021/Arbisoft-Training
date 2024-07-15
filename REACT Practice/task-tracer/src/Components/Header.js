import React from 'react'
import Button from './Button'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toggleAddForm, toggleApiData } from '../Store/appSlice'

// for props data type for the rubestness in the code
//import PropTypes from 'prop-types';

const Header = ({ title }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch()
  const { showAddForm } = useSelector((state) => state.app);


  const handleAddFormClick = () => {
    if (location.pathname === '/addTask') {
      navigate('/');
    } else {
      navigate('/addTask');
    }
    dispatch(toggleAddForm())
  };

  const handleTaskClick = () => {
    if (location.pathname === '/tasks') {
      navigate('/');
    } else {
      if (location.pathname === '/addTask')
        dispatch(toggleAddForm())
      navigate('/tasks');
    }
  };

  const handleShowApiDataClick = () => {
    if (location.pathname === '/showData') {
      navigate('/');
    } else {
      if (location.pathname === '/addTask')
        dispatch(toggleAddForm())
      navigate('/showData');
    }
    dispatch(toggleApiData())
  };


  return (
    <>
      <header className='header'>
        <h1> {title} </h1>
        <Button text="Tasks" collor="blue" onClick={handleTaskClick} />
        <Button text={showAddForm ? 'Close' : 'Add'} color={showAddForm ? 'red' : "green"} onClick={handleAddFormClick} />
        <Button text="API Data" color="steelblue" onClick={handleShowApiDataClick} />
      </header>
      <hr />
    </>
  )
}
export default Header