import { useState } from 'react'

const PEOPLE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16]
const FIXED_EMPTY_IDX = 8 // 3행 1열 영구 빈자리

type Seat = { person: number | null; fixed: boolean }

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for  (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function makeInitialSeats(): Seat[] {
  const shuffled = shuffleArray([...PEOPLE])
  const seats: Seat[] = Array.from({ length: 16 }, () => ({ person: null, fixed: false }))
  seats[FIXED_EMPTY_IDX] = { person: null, fixed: true }
  let pi = 0
  for (let i = 0; i < 16; i++) {
    if (i !== FIXED_EMPTY_IDX) seats[i] = { person: shuffled[pi++], fixed: false }
  }
  return seats
}

export default function App() {
  const [seats, setSeats] = useState<Seat[]>(makeInitialSeats)
  const [modal, setModal] = useState<number | null>(null)
  const [inputVal, setInputVal] = useState('')
  const [error, setError] = useState('')

  function doShuffle() {
    setSeats(prev => {
      const fixedPeople = new Set(
        prev.filter((s, i) => s.fixed && i !== FIXED_EMPTY_IDX).map(s => s.person!)
      )
      const free = shuffleArray(PEOPLE.filter(p => !fixedPeople.has(p)))
      let fi = 0
      return prev.map(seat =>
        seat.fixed ? seat : { person: free[fi++] ?? null, fixed: false }
      )
    })
  }

  function openModal(idx: number) {
    setModal(idx)
    setInputVal('')
    setError('')
  }

  function confirmFix() {
    const num = parseInt(inputVal)
    if (!PEOPLE.includes(num)) {
      setError('유효한 번호를 입력하세요 (1~14, 16)')
      return
    }
    const alreadyFixed = seats.findIndex(s => s.fixed && s.person === num)
    if (alreadyFixed !== -1) {
      setError(`${num}번은 이미 고정된 자리가 있습니다`)
      return
    }
    setSeats(prev => {
      const next = prev.map(s => ({ ...s }))
      const displaced = next[modal!].person
      const curIdx = next.findIndex(s => s.person === num)
      if (curIdx !== -1) next[curIdx].person = null
      if (displaced !== null && displaced !== num) {
        const freeSlot = next.findIndex((s, i) => i !== modal! && !s.fixed && s.person === null)
        if (freeSlot !== -1) next[freeSlot].person = displaced
      }
      next[modal!] = { person: num, fixed: true }
      return next
    })
    setModal(null)
  }

  function unfix(idx: number) {
    setSeats(prev => prev.map((s, i) => (i === idx ? { ...s, fixed: false } : s)))
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 gap-6">
      <h1 className="text-3xl font-bold text-slate-800">자리 배치</h1>

      <div className="bg-slate-700 text-white px-24 py-2 rounded-lg text-sm font-medium tracking-widest text-center">
        칠판 (앞)
      </div>

      <div className="grid grid-cols-4 gap-3">
        {seats.map((seat, i) => {
          const isFront = i < 4
          const isPermanentEmpty = i === FIXED_EMPTY_IDX
          return (
            <div
              key={i}
              onClick={() => (isFront && !seat.fixed && !isPermanentEmpty ? openModal(i) : undefined)}
              className={[
                'w-24 h-24 flex flex-col items-center justify-center rounded-2xl border-2 font-bold transition-all select-none',
                isPermanentEmpty
                  ? 'bg-slate-200 border-slate-400 text-slate-400 cursor-not-allowed'
                  : seat.fixed
                  ? 'bg-amber-100 border-amber-400 text-amber-900'
                  : isFront
                  ? 'bg-sky-50 border-sky-400 text-sky-800 cursor-pointer hover:bg-sky-100 active:scale-95'
                  : 'bg-white border-slate-200 text-slate-700',
              ].join(' ')}
            >
              {isPermanentEmpty ? (
                <>
                  <span className="text-sm">빈자리</span>
                  <span className="text-xs text-slate-400">(고정)</span>
                </>
              ) : seat.person !== null ? (
                <>
                  <span className="text-xl">{seat.person}번</span>
                  {seat.fixed && (
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        unfix(i)
                      }}
                      className="mt-1 text-xs text-amber-600 hover:text-red-500 underline"
                    >
                      고정 해제
                    </button>
                  )}
                  {isFront && !seat.fixed && (
                    <span className="mt-1 text-xs text-sky-400">클릭=고정</span>
                  )}
                </>
              ) : (
                <span className="text-sm text-slate-400">빈자리</span>
              )}
            </div>
          )
        })}
      </div>

      <div className="text-xs text-slate-400 tracking-widest">↑ 뒤 ↑</div>

      <button
        onClick={doShuffle}
        className="px-10 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-lg font-bold rounded-2xl shadow transition-all"
      >
        랜덤 배치
      </button>

      <div className="flex gap-6 text-sm text-slate-500">
        <span className="flex items-center gap-2">
          <span className="w-5 h-5 inline-block rounded border-2 border-sky-400 bg-sky-50"></span>
          앞자리 (클릭하여 고정)
        </span>
        <span className="flex items-center gap-2">
          <span className="w-5 h-5 inline-block rounded border-2 border-amber-400 bg-amber-100"></span>
          고정된 자리
        </span>
      </div>

      {modal !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col gap-4 w-80">
            <h2 className="text-xl font-bold">앞자리 고정</h2>
            <p className="text-slate-500 text-sm">
              앞줄 {modal + 1}번 자리에 앉을 학생 번호를 입력하세요
            </p>
            <input
              autoFocus
              type="number"
              value={inputVal}
              onChange={e => {
                setInputVal(e.target.value)
                setError('')
              }}
              onKeyDown={e => e.key === 'Enter' && confirmFix()}
              placeholder="번호 입력 (예: 3)"
              className="border-2 border-slate-300 focus:border-indigo-400 rounded-xl px-4 py-2 text-lg outline-none"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-3 justify-end mt-2">
              <button
                onClick={() => setModal(null)}
                className="px-5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-600"
              >
                취소
              </button>
              <button
                onClick={confirmFix}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
              >
                고정
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}