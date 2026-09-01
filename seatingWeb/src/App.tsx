import { useState, useRef } from 'react'

const PEOPLE = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16]
const COLUMN_HEIGHTS = [3, 3, 4, 4]
const MAX_ROWS = Math.max(...COLUMN_HEIGHTS)

const NAMES: Record<number, string> = {
  1: '김소윤', 3: '권민기', 4: '김경윤',
  5: '박현준', 6: '안재민', 7: '이도건', 8: '이용인',
  9: '이재원', 10: '이형석', 11: '임현진', 12: '장강민',
  13: '장준수', 14: '장준혁', 16: '채근영',
}

const ROLES: Record<number, string> = { 7: '반장', 5: '서기', 12: '부반장' }

type Seat = { person: number | null; fixed: boolean }
type SeatPos = { col: number; row: number }

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for  (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function makeInitialSeats(): Seat[][] {
  const shuffled = shuffleArray([...PEOPLE])
  let pi = 0
  return COLUMN_HEIGHTS.map(height =>
    Array.from({ length: height }, () => ({ person: shuffled[pi++] ?? null, fixed: false }))
  )
}

export default function App() {
  const [seats, setSeats] = useState<Seat[][]>(makeInitialSeats)
  const [modal, setModal] = useState<SeatPos | null>(null)
  const [inputVal, setInputVal] = useState('')
  const [error, setError] = useState('')
  const [roundCount, setRoundCount] = useState(10)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentRound, setCurrentRound] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function generateOneShuffle(prev: Seat[][]): Seat[][] {
    const fixedPeople = new Set(
      prev.flat().filter(s => s.fixed).map(s => s.person!)
    )
    const free = shuffleArray(PEOPLE.filter(p => !fixedPeople.has(p)))
    let fi = 0
    return prev.map(col =>
      col.map(seat => (seat.fixed ? seat : { person: free[fi++] ?? null, fixed: false }))
    )
  }

  function printSeats() {
    const month = new Date().getMonth() + 1
    // 180도 회전(열 순서 + 각 열 내부 순서 반전)해서 인쇄
    const rotated = seats.slice().reverse().map(col => col.slice().reverse())

    const seatHtml = (seat: Seat | undefined) => {
      if (!seat || seat.person === null) return `<div class="seat-wrap"><div class="seat empty"></div><div class="role">&nbsp;</div></div>`
      const role = ROLES[seat.person]
      return `
        <div class="seat-wrap">
          <div class="seat">
            <span class="num">${seat.person}</span>
            <span class="name">${NAMES[seat.person] ?? ''}</span>
          </div>
          <div class="role">${role ? `＜${role}＞` : '&nbsp;'}</div>
        </div>`
    }

    const columnHtml = (col: Seat[]) =>
      `<div class="col">${Array.from({ length: MAX_ROWS }, (_, ri) => seatHtml(col[ri])).join('')}</div>`

    const gridHtml = `
      <div class="cols-group">${columnHtml(rotated[0])}${columnHtml(rotated[1])}</div>
      <div class="aisle"></div>
      <div class="cols-group">${columnHtml(rotated[2])}${columnHtml(rotated[3])}</div>`

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>2-1 좌석배치표</title>
    <link href="https://cdn.jsdelivr.net/gh/innks/NanumSquareRound@master/nanumsquareround.min.css" rel="stylesheet">
    <style>
      @page { size: A4 landscape; margin: 10mm; }
      body { font-family: 'NanumSquareRound', sans-serif; font-weight: 700; margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
      .wrapper { border: 1px solid #aaa; padding: 24px 32px; display: inline-block; }
      h1 { text-align: center; font-size: 28px; font-weight: bold; margin: 0 0 20px; }
      .grid { display: flex; align-items: flex-start; justify-content: center; }
      .cols-group { display: flex; gap: 12px; }
      .col { display: flex; flex-direction: column; gap: 12px; }
      .aisle { width: 60px; }
      .seat-wrap { display: flex; flex-direction: column; align-items: center; }
      .seat { width: 210px; height: 68px; border: 1.5px solid #333; display: flex; align-items: center; justify-content: center; gap: 12px; font-size: 20px; font-weight: bold; }
      .seat.empty { border: none; background: none; }
      .role { font-size: 16px; margin-top: 3px; min-height: 20px; }
      .podium { width: 210px; margin: 20px auto 0; text-align: center; background: #e5e5e5; padding: 10px; font-size: 18px; font-weight: bold; border: 1px solid #aaa; }
    </style></head><body>
    <div class="wrapper">
      <h1>2-1 좌석배치표(${month}월)</h1>
      <div class="grid">${gridHtml}</div>
      <div class="podium">교탁</div>
    </div>
    <script>window.onload=()=>{window.print();}</script>
    </body></html>`

    const w = window.open('', '_blank')
    if (w) { w.document.write(html); w.document.close() }
  }

  function doShuffle() {
    if (timerRef.current) clearTimeout(timerRef.current)

    const results: Seat[][][] = []
    let base = seats
    for (let i = 0; i < roundCount; i++) {
      const next = generateOneShuffle(base)
      results.push(next)
      base = next
    }

    setIsAnimating(true)
    setCurrentRound(1)

    let i = 0
    function step() {
      setSeats(results[i])
      setCurrentRound(i + 1)
      i++
      if (i < results.length) {
        timerRef.current = setTimeout(step, 200)
      } else {
        setIsAnimating(false)
      }
    }
    timerRef.current = setTimeout(step, 0)
  }

  function openModal(col: number, row: number) {
    setModal({ col, row })
    setInputVal('')
    setError('')
  }

  function confirmFix() {
    const num = parseInt(inputVal)
    if (!PEOPLE.includes(num)) {
      setError('유효한 번호를 입력하세요 (1, 3~14, 16)')
      return
    }
    const alreadyFixed = seats.some(col => col.some(s => s.fixed && s.person === num))
    if (alreadyFixed) {
      setError(`${num}번은 이미 고정된 자리가 있습니다`)
      return
    }
    setSeats(prev => {
      const next = prev.map(col => col.map(s => ({ ...s })))
      const { col, row } = modal!
      const displaced = next[col][row].person

      for (const c of next) {
        const idx = c.findIndex(s => s.person === num)
        if (idx !== -1) c[idx].person = null
      }

      if (displaced !== null && displaced !== num) {
        outer: for (let ci = 0; ci < next.length; ci++) {
          for (let ri = 0; ri < next[ci].length; ri++) {
            if ((ci !== col || ri !== row) && !next[ci][ri].fixed && next[ci][ri].person === null) {
              next[ci][ri].person = displaced
              break outer
            }
          }
        }
      }

      next[col][row] = { person: num, fixed: true }
      return next
    })
    setModal(null)
  }

  function unfix(col: number, row: number) {
    setSeats(prev =>
      prev.map((c, ci) => (ci === col ? c.map((s, ri) => (ri === row ? { ...s, fixed: false } : s)) : c))
    )
  }

  function renderColumn(ci: number) {
    const col = seats[ci]
    return (
      <div key={ci} className="flex flex-col gap-3">
        {Array.from({ length: MAX_ROWS }, (_, ri) => {
          const seat = col[ri]
          if (!seat) return <div key={ri} className="w-24 h-24" />
          const isFront = ri === 0
          return (
            <div
              key={ri}
              onClick={() => (isFront && !seat.fixed ? openModal(ci, ri) : undefined)}
              className={[
                'w-24 h-24 flex flex-col items-center justify-center rounded-2xl border-2 font-bold transition-all select-none',
                seat.fixed
                  ? 'bg-amber-100 border-amber-400 text-amber-900'
                  : isFront
                  ? 'bg-sky-50 border-sky-400 text-sky-800 cursor-pointer hover:bg-sky-100 active:scale-95'
                  : 'bg-white border-slate-200 text-slate-700',
              ].join(' ')}
            >
              {seat.person !== null ? (
                <>
                  <span className="text-xl">{seat.person}번</span>
                  {seat.fixed && (
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        unfix(ci, ri)
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
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 gap-6">
      <h1 className="text-3xl font-bold text-slate-800">자리 배치</h1>

      <div className="bg-slate-700 text-white px-24 py-2 rounded-lg text-sm font-medium tracking-widest text-center">
        칠판 (앞)
      </div>

      <div className="flex gap-3">
        {renderColumn(0)}
        {renderColumn(1)}
        <div className="w-8" />
        {renderColumn(2)}
        {renderColumn(3)}
      </div>

      <div className="text-xs text-slate-400 tracking-widest">↑ 뒤 ↑</div>

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-slate-600">배치 횟수</label>
        <input
          type="number"
          min={1}
          max={50}
          value={roundCount}
          onChange={e => setRoundCount(Math.max(1, Math.min(50, Number(e.target.value))))}
          className="w-20 border-2 border-slate-300 focus:border-indigo-400 rounded-xl px-3 py-2 text-center text-lg font-bold outline-none"
        />
        <span className="text-sm text-slate-500">번</span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={doShuffle}
          disabled={isAnimating}
          className="px-10 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-bold rounded-2xl shadow transition-all"
        >
          랜덤 배치
        </button>
        <button
          onClick={printSeats}
          disabled={isAnimating}
          className="px-10 py-3 bg-slate-600 hover:bg-slate-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-bold rounded-2xl shadow transition-all"
        >
          내보내기
        </button>
      </div>

      {isAnimating && (
        <p className="text-sm font-medium text-indigo-600">
          {currentRound} / {roundCount} 번째 배치 중...
        </p>
      )}

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
              앞줄 {modal.col + 1}번째 열에 앉을 학생 번호를 입력하세요
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
