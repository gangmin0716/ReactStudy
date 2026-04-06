import Image from "next/image";

const list = () => {
  let product = ["Tomatoes", "Pasta", "Coconut"];
  return (
    <div>
      <h4 className="title">상품목록</h4>

      {product.map((item, index) => {
        return (
          <div key={index} className="food">
            <Image className="food-img" src={`/food${index}.png`} width={500} height={500} alt="음식"/>
            <h4>{item} $40</h4>
          </div>
        );
      })}
    </div>
  );
};

export default list;
