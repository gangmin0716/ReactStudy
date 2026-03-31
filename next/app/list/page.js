const list = () => {
  let product = ["Tomatoes", "Pasta", "Coconut"];
  return (
    <div>
      <h4 className="title">상품목록</h4>

      {product.map((item, index) => {
        return (
          <div key={index} className="food">
            <img src= />
            <h4>{item} $40</h4>
          </div>
        );
      })}
    </div>
  );
};

export default list;
