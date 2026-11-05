import { useReducer, useState } from "react";
type BankAction = {
  mode: "deposit" | "withdraw";
  amount: number;
};
const bankReducer = (bankState: number, bankAction: BankAction): number => {
  console.log("리듀서 호출", bankState, bankAction);
  switch (bankAction.mode) {
    case "deposit":
      return bankState + bankAction.amount;
    case "withdraw":
      return bankState - bankAction.amount;
    default:
      return bankState;
  }
};
const UseReducerExam = () => {
  const [inputMoney, setInputMoney] = useState<number>(0);
  const [balance, bankDispatch] = useReducer(bankReducer, 0);
  return (
    <>
      <h2>useReducer 사용하기</h2>
      <p>잔고: {balance}원</p>
      <input
        type="number"
        value={inputMoney}
        step={1000}
        placeholder="금액 입력"
        onChange={e => {
          const value = e.target.value;
          setInputMoney(value === "" ? 0 : Number(value));
        }}
      />
      <button
        type="button"
        onClick={() => {
          bankDispatch({ mode: "deposit", amount: inputMoney });
        }}
      >
        {" "}
        입금{" "}
      </button>
      <button
        type="button"
        onClick={() => {
          bankDispatch({ mode: "withdraw", amount: inputMoney });
        }}
      >
        {" "}
        출금
      </button>
    </>
  );
};
export default UseReducerExam;
