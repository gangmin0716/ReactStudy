import useCheerStore from "./useCheerStore";

const CheerButtons = () => {
  const { addCheer, reset } = useCheerStore();

  return (
    <>
      <button onClick={addCheer}>응원하기</button>
      <button onClick={reset}>초기화</button>
    </>
  );
};

export default CheerButtons;
