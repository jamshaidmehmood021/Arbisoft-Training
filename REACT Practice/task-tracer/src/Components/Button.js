// {{color , text }} ---> this is because as the props are objects so these can be destructured like this 
import PropTypes from 'prop-types'

function Button({color , text , onClick}) {
  return (
    <button style={{background:color}} className='btn' onClick={onClick}>{text}</button>
  )
}

// this is not recomended now and will result in a warning in latest version 
//so instead of this using default parameters is recomended

// Button.defaultProps ={
//     color : 'steelblue'
// }

Button.protoType = {
    text : PropTypes.string,
    color : PropTypes.string, 
    onClick : PropTypes.func
}

export default Button
