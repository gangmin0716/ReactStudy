export const Card = ({ children, className = '' }) => {
  return (
    <div
      className={`${className} border border-black`}
    >
      {children}
    </div>
  )
}