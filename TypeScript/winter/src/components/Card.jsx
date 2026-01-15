export const Card = ({ children, className = '' }) => {
  return (
    <div
      className={`${className} border rounded-lg`}
    >
      {children}
    </div>
  )
}