import useCartStore from "./useCartStore.tsx";

type ProductProps = {
  price: number;
};
function Product({ price }: ProductProps) {
  const { addItem } = useCartStore();

  return (
    <>
      <h3>상품</h3>
      <p>초콜릿: {price.toLocaleString()}원</p>
      <button onClick={addItem}>담기</button>
    </>
  );
}

export default Product;
