import Product from "./Product";
import Cart from "./Cart";

function CartApp() {
  const price = 2000;

  return (
    <main>
      <h2>초콜릿 장바구니</h2>
      <Product price={price} />
      <Cart price={price} />
    </main>
  );
}

export default CartApp;
