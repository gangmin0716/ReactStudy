export const Input = ({ type = '', place = '', value = 'text', onChange}) => {
  return (
    <input type={type} placeholder={place} value={value} onChange={onChange} className="w-full px-3 py-2 border rounded black" ></input>
  )
}
