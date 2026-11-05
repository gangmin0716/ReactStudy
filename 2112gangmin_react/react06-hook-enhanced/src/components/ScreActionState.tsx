import {startTransition, useActionState} from "react";

async function addScore(
  previousScore: number,
  amount: number
): Promise<number> {
  await new Promise<void>((resolve) =>
  setTimeout(resolve, 1000));

  return previousScore + amount;
}

export default function ScreActionState() {
  const [score, dispathcAction, isPending] = useActionState(addScore, 0);

  function handleAddScore(amount: number) : void {
    startTransition(() => {
      dispathcAction(amount);
    });
  }

  return (
    <div>
      <h2>처리 완료 후 점수 증가하기</h2>
      <p>현재 점수: {score}</p>
      <button
        type="button"
        onClick={() => handleAddScore(1)}
        disabled={isPending}
      >
        +1
      </button>
      <button
        type="button"
        onClick={() => handleAddScore(5)}
        disabled={isPending}
      >
        +5
      </button>
      {isPending && <p>점수를 반영하는중...</p>}
    </div>
  )
}