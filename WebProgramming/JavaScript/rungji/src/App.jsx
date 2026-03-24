import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [hp, setHp] = useState(100);
  const [isHit, setIsHit] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);

  const result = input.trim().split("@")[0];

  const rungji = {
    name: "이룽지",
    type: "hamster",
    level: 2,
    hp: hp,
  };

  rungji.attack = function () {
    return "해바라기씨 대포 발사!";
  };

  delete rungji.attack;

  const isDead = hp <= 0;

  function handleAttacked() {
    if (isAttacking || isDead) return;
    setIsAttacking(true);
    setTimeout(() => {
      setIsAttacking(false);
      setHp((prev) => prev - 10);
      setIsHit(true);
      setTimeout(() => setIsHit(false), 800);
    }, 600);
  }

  return (
    <div className="w-screen h-screen flex relative">
      {/* 누룽지 */}
      <div className="w-1/2 h-screen flex justify-center items-center flex-col gap-4">
        <input
          className="border px-3 py-2 rounded w-62.5"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <pre className="border px-3 py-2 rounded">출력: {result}</pre>
        <img
          className={`w-40 transition-transform duration-500 ${isDead ? "-rotate-90" : ""}`}
          src={isHit ? "/IMG_3398.png" : "/IMG_3715.png"}
          alt="rungi"
        />
        <p>{rungji.name}</p>
        <p>HP: {rungji.hp}</p>
        <p>{rungji.attack ? rungji.attack() : "스킬 없음"}</p>
      </div>

      {/* 씨ㅣㅣㅣㅣㅣ */}
      {isAttacking && (
        <img className="projectile w-16 -rotate-90" src="/seeeee.png" alt="projectile" />
      )}

      {/* 상대 */}
      <div className="w-1/2 h-screen flex justify-center items-center flex-col gap-4">
        <img className="w-40" src={"/IMG_46672.JPG"} alt="opponent" />
        <p>상대 쥐민수</p>
        <button
          className="border px-4 py-2 rounded bg-red-400 text-white"
          onClick={handleAttacked}
        >
          공격하기
        </button>
      </div>
    </div>
  );
}

export default App;