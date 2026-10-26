import { useMemo, useState } from "react";
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
};
const products: Product[] = [
  { id: 1, name: "기계식 키보드", category: "입력장치", price: 85000 },
  { id: 2, name: "무선 키보드", category: "입력장치", price: 45000 },
  { id: 3, name: "게이밍 마우스", category: "입력장치", price: 55000 },
  { id: 4, name: "무선 마우스", category: "입력장치", price: 25000 },
  { id: 5, name: "27인치 모니터", category: "모니터", price: 220000 },
  { id: 6, name: "32인치 모니터", category: "모니터", price: 320000 },
  { id: 7, name: "USB 허브", category: "주변기기", price: 18000 },
  { id: 8, name: "노트북 거치대", category: "주변기기", price: 32000 },
];
function UseMemoPractice() {
  const [keyword, setKeyword] = useState<string>("");
  const [sortType, setSortType] = useState<string>("asc");
  const [memo, setMemo] = useState<string>("");
  // 상품 목록 계산
  // useMemo를 사용하여 작성하세요.
  // const filteredProducts = products
  //   .filter((it) => it.name.includes(keyword))
  //   .sort((a, b) => {
  //     if (sortType == "asc") return a.price - b.price;
  //     else return b.price - a.price;
  //   });

  const filteredProducts = useMemo(() => {
    console.log("filter products");
    return products
      .filter((it) => it.name.includes(keyword))
      .sort((a, b) => {
        if (sortType == "asc") return a.price - b.price;
        else return b.price - a.price;
      });
  }, [keyword, sortType]);

  return (
    <>
      <h2>상품 검색</h2>
      <input
        type="text"
        placeholder="상품명 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="asc">가격 낮은순</option>
        <option value="desc">가격 높은순</option>
      </select>
      <hr />
      <input type="text" placeholder="메모 입력" value={memo} onChange={(e) => setMemo(e.target.value)} />
      <p>메모: {memo}</p>
      <hr />
      <ul>
        {filteredProducts.map((it) => (
          <li key={it.id}>
            {it.name} - {it.price}
          </li>
        ))}
      </ul>
    </>
  );
}
export default UseMemoPractice;
