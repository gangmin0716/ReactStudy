const Body = () => {

  const handleOnClick = (ev) => {
    console.log(ev.target.name)
  }

  return (
    <div>
      <button name="A버튼" onClick={handleOnClick}>A버튼</button>
      <button name="B버튼" onClick={handleOnClick}>B버튼</button>
    </div>
  );
}

export default Body