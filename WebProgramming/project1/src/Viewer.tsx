type Particle = { id: number; emoji: string; tx: number; ty: number };

const Viewer = ({ count, particles }: { count: number; particles: Particle[] }) => {
  const status =
    count <= -100 ? "뼈만 남았어 ☠️" :
    count <= -50  ? "사람 살려 🆘" :
    count <= -30  ? "배가 등에 붙었어 😰" :
    count <= -10  ? "굶어 죽을 것 같아 💀" :
    count <= -5   ? "밥 줘 😩" :
    count <= 0    ? "배고파... 😭" :
    count < 5     ? "조금 먹었어 🤔" :
    count < 15    ? "좀 낫네 😊" :
    count < 30    ? "배불러! 🤤" :
    count < 50    ? "너무 많이 먹었나... 😅" :
    count < 100   ? "배 터질 것 같아 😵" :
                    "나 죽는다 🤢";

  const img =
    count <= -100 ? "/image 26.png" :
    count <= -50  ? "/IMG_4862 5.png" :
    count <= -30  ? "/IMG_4862 3.png" :
    count <= -10  ? "/IMG_4862 6.png" :
    count <= -5   ? "/IMG_4862 4.png" :
    count >= 100  ? "/image 27 12.png" :
    count >= 50   ? "/image 27 11.png" :
    count >= 30   ? "/image 26 10.png" :
    count >= 15   ? "/IMG_4862 9.png" :
    count >= 5    ? "/IMG_4862 8.png" :
    count >= 1    ? "/IMG_4862 7.png" :
                    "/IMG_4862.jpeg";

  return (
    <div className="flex flex-col items-center gap-4 w-64">
      {/* 이미지: 크레파스 테두리 오버레이 */}
      <div className="relative">
        <img src={img} alt="히나" className="w-64 h-64 object-cover rounded-2xl" />
        <div style={{
          position: 'absolute',
          inset: '-3px',
          border: '3px solid #67e8f9',
          borderRadius: '18px',
          filter: 'url(#crayon)',
          pointerEvents: 'none',
          boxShadow: '4px 4px 0 #a5f3fc',
        }} />
        {particles.map(p => (
          <span
            key={p.id}
            className="food-particle"
            style={{ '--tx': `${p.tx}px`, '--ty': `${p.ty}px` } as React.CSSProperties}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      <p className="crayon-status text-xl font-bold text-cyan-500">{status}</p>

      <div className="flex items-baseline gap-1">
        <span className="crayon-number text-7xl font-black text-cyan-500 tabular-nums">{count}</span>
        <span className="crayon-count-unit text-2xl text-cyan-300 font-bold">개</span>
      </div>
    </div>
  )
}

export default Viewer