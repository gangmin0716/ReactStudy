import { useState, useRef } from 'react'
import Viewer from "./Viewer.tsx";
import ButtonBox from "./Button-box.tsx";
import './App.css';

const FOODS = ["🍔", "🍕", "🍜", "🌮", "🍣", "🍩", "🍗", "🥪", "🍱", "🍛"];

function App() {
  const [count, setCount] = useState(0);
  const [particles, setParticles] = useState([]);
  const nextId = useRef(0);

  const handleAdd = (n) => {
    setCount(c => c + n);
    if (n > 0) {
      const burst = Math.min(n + 4, 20);
      const newParticles = Array.from({ length: burst }, () => {
        const angle = Math.random() * 360;
        const dist = 80 + Math.random() * 80;
        const rad = (angle * Math.PI) / 180;
        return {
          id: nextId.current++,
          emoji: FOODS[Math.floor(Math.random() * FOODS.length)],
          tx: Math.cos(rad) * dist,
          ty: Math.sin(rad) * dist,
        };
      });
      setParticles(prev => [...prev, ...newParticles]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
      }, 800);
    }
  };

  return (
    <div className="w-screen flex flex-col items-center justify-center min-h-screen gap-6 paper-bg">
      <div className="flex flex-col items-center">
        <p className="crayon-subtitle text-cyan-400 text-base font-bold tracking-widest uppercase">
          QWER · 히나
        </p>
        <h1 className="crayon-title text-6xl font-black text-cyan-500">
          밥먹이기
        </h1>
      </div>

      {/* 카드: 투명 오버레이로 크레파스 테두리만 적용 */}
      <section className="bg-white rounded-3xl p-8 relative">
        {/* 크레파스 테두리 오버레이 */}
        <div style={{
          position: 'absolute',
          inset: '-4px',
          border: '3.5px solid #67e8f9',
          borderRadius: '28px',
          filter: 'url(#crayon)',
          pointerEvents: 'none',
          boxShadow: '5px 5px 0 #a5f3fc, -2px -2px 0 #cffafe',
        }} />
        <Viewer count={count} particles={particles} />
      </section>

      <ButtonBox onAdd={handleAdd} onReset={() => setCount(0)} />
    </div>
  );
}

export default App