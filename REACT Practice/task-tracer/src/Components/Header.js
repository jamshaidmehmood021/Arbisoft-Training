import React, { useContext } from 'react'
import Button from './Button'
import { useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

// for props data type for the rubestness in the code
//import PropTypes from 'prop-types';

const Header = ({ title }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const { showAddForm, setShowAddForm, showApiData, setShowApiData } = useContext(AppContext);


  const handleAddFormClick = () => {
    if (location.pathname === '/addTask') {
      navigate('/');
    } else {
      navigate('/addTask');
    }
    setShowAddForm(!showAddForm);
  };

  const handleTaskClick = () => {
    if (location.pathname === '/tasks') {
      navigate('/');
    } else {
      if (location.pathname === '/addTask')
        setShowAddForm(!showAddForm);
      navigate('/tasks');
    }
  };

  const handleShowApiDataClick = () => {
    if (location.pathname === '/showData') {
      navigate('/');
    } else {
      if (location.pathname === '/addTask')
        setShowAddForm(!showAddForm);
      navigate('/showData');
    }
    setShowApiData(!showApiData);
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

// // default props
// Header.defaultProps = {
//   title : "Task Tracker"
// }
// // props type
// Header.propTypes = {
//     title : PropTypes.string,
// }

export default Header