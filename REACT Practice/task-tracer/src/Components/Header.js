import React from 'react'
import Button
 from './Button'
// for props data type for the rubestness in the code
//import PropTypes from 'prop-types';

const Header = ({title , onAddForm, showAddForm}) => {

  return (
      <header className='header'>
       <h1> {title} </h1>
       <Button text = {showAddForm ? 'Close' : 'Add'} color={showAddForm ? 'red': "green"} onClick={onAddForm}/>
      </header>
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