export const Button = ({type = '',onClick, Text = '', className = ''}) => {
  return(
    <button
      type={type}
      onClick={onClick}
      className={`${className} py-2 cursor-pointer border rounded border-black`}
    >
      {Text}
    </button>
  )
}