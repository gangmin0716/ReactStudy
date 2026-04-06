const Item = (props) => {
  return (
    <div className="cart-item">
      <p>{props.item}</p>
      <p>$40</p>
      <p>1개</p>
    </div>
  );
};

const Button = (props) => {
  return (
    <button style={{ background : props.bgcolor }} >버튼</button>
  )
}

export { Item, Button };
