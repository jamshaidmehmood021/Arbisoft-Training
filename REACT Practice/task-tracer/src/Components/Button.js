import PropTypes from 'prop-types'

function Button({ color, text, onClick }) {
  return (
    <button style={{ background: color }} className='btn' onClick={onClick}>{text}</button>
  )
}
Button.protoType = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
}

export default Button;
