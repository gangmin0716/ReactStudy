import useCartStore from "./useCartStore.tsx";

type CartProps = {
  price: number;
};

function Cart({ price }: CartProps) {
  const { count, removeItem, resetCart } = useCartStore();

  const totalPrice = price * count;
  return (
    <main>
      <h3>장바구니</h3>
      <p>담은 수량: {count}개</p>
      <p>총금액: {totalPrice.toLocaleString()}원</p>
      <button onClick={removeItem}>빼기</button>
      <button onClick={resetCart}>초기화</button>
    </main>
  );
}

export default Cart;
