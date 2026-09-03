export default function StopPropagation() {
  const onDivClick = ()=> {
    console.log('click event on <div>');
  };

  return (
    <div onClick={onDivClick}>
      <p>StopPropagation</p>
      <button
        onClick={(event) => {
          console.log("click event on <button>");
          event.stopPropagation();
        }} >
        Click me and stop event propatation
      </button>
    </div>
  );
}