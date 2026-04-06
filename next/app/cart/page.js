import { Item, Button } from "./data";

const Cart = () => {
  let cartItems = ['Tomatoes', 'Pasta']
  return (
    <div>
      <h4 className="title">Cart</h4>
      {
        cartItems.map((item, index) => {
          return (
            <Item key={index} item={item} />
          )
        })
      }
      <Button bgcolor = "blue" />
    </div>
  );
};

export default Cart;
