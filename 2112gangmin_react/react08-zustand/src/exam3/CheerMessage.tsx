import useCheerStore from "./useCheerStore.ts";

const CheerMessage = () => {
  const { cheerCount } = useCheerStore();

  let message = "";

  if (cheerCount === 0) {
    message = "첫 응원을 보내주세요!";
  } else if (cheerCount >= 1 && cheerCount <= 4) {
    message = "우리 반을 응원하고 있어요!";
  } else message = "응원이 가득해요! 우리 반 파이팅!";

  return (
    <>
      <p>{message}</p>
    </>
  );
};

export default CheerMessage;
