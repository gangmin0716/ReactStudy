const rotations = [-2, 0, 2];

const ButtonBox = ({ onAdd, onReset }: { onAdd: (n: number) => void; onReset: () => void }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-3">
        {[1, 10, 100].map((n, i) => (
          <button
            key={n}
            onClick={() => onAdd(n)}
            className="w-24 py-3 rounded-2xl bg-cyan-400 text-white font-black text-xl active:opacity-70 transition-opacity duration-100"
            style={{
              fontFamily: "'Gaegu', cursive",
              filter: 'url(#crayon)',
              transform: `rotate(${rotations[i]}deg)`,
              border: '2.5px solid #0891b2',
              boxShadow: '3px 3px 0 #0e7490',
            }}
          >
            +{n}
          </button>
        ))}
      </div>
      <div className="flex gap-3">
        {[1, 10, 100].map((n, i) => (
          <button
            key={n}
            onClick={() => onAdd(-n)}
            className="w-24 py-3 rounded-2xl bg-cyan-100 text-cyan-500 font-black text-xl active:opacity-70 transition-opacity duration-100"
            style={{
              fontFamily: "'Gaegu', cursive",
              filter: 'url(#crayon)',
              transform: `rotate(${-rotations[i]}deg)`,
              border: '2.5px solid #67e8f9',
              boxShadow: '3px 3px 0 #a5f3fc',
            }}
          >
            -{n}
          </button>
        ))}
      </div>
      <button
        onClick={onReset}
        className="mt-1 px-10 py-2 rounded-2xl text-cyan-400 font-bold text-base active:opacity-70 transition-opacity duration-100"
        style={{
          fontFamily: "'Gaegu', cursive",
          filter: 'url(#crayon)',
          border: '2px dashed #a5f3fc',
        }}
      >
        초기화
      </button>
    </div>
  )
}

export default ButtonBox