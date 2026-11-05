import {useOptimistic, useState} from "react";

export default function LikeOptimistic() {
  const [likes, setLikes] = useState(0);

  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes, (currentLikes: number, amount: number) => currentLikes + amount);

  async function handleLike():Promise<void> {
    addOptimisticLike(1);
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setLikes((previousLikes) => previousLikes + 1);
  }

  return (
    <div>
      <h2>좋아요 먼저 표시하기</h2>
      <p>낙관적 상태 값: {optimisticLikes}</p>
      <p>실제 상태 값: {likes}</p>
      <form action={handleLike}>
        <button type="submit">좋아요 + 1</button>
      </form>
    </div>
  )
}