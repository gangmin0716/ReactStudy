export const Button = ({type = '',onClick, Text = '', className = '', Disabled}) => {
  return(
    <button
      type={type}
      onClick={onClick}
      className={`${className} py-2 cursor-pointer border rounded border-black`}
      disabled={Disabled}
    >
      {Text}
    </button>
  )
}