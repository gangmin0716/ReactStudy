export const Input = ({ type = '', place = '', value = 'text', onChange, className = ''}) => {
  return (
    <input
      type={type}
      placeholder={place}
      value={value}
      onChange={onChange}
      className={`${className} border rounded focus:outline-none`} >
    </input>
  )
}
