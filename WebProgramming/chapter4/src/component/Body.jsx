import { useState } from "react";

const Body = () => {
  const [date, setDate] = useState("");
  const handleOnChange = (e) => {
    console.log("변경된 값: ", e.target.value)
    setDate(e.target.value)
  };
  return (
    <div>
      <input type="date" onChange={handleOnChange} value={date} />
    </div>
  );
};

export default Body;
