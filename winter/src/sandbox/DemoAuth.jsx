import { useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebase/firebace'
import { signOut } from "firebase/auth"

export const DemoAuth = () => {
  // TODO 1. 입력값 state 만들기
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // TODO 2. ahems state 만들기 (login / signup)
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  // TODO 3. 메시지 state 만들기
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  // TODO 4. 클릭 핸들러 함수 만들기 (async)

  const handleSubmit = async () => {
    setMessage('');
    setBusy(true);

    try {
      if (mode === 'signup') {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        setMessage(`✅ 회원가입 성공: ${result.user.email}`);
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setMessage(`✅ 로그인 성공: ${result.user.email}`)
      }
    } catch (err) {
      const msg =
        err?.code === 'auth/email-already-in-use'
          ? '이미 가입된 이메일이에요.'
          : err?.code === 'auth/invalid-credential'
            ? '이메일 또는 비밀번호가 올바르지 않아요.'
            : err?.code === 'auth/weak-password'
              ? '비밀번호가 너무 약해요.  (6자 이상)'
              : '오류가 발생했어요. 입력값을 확인해 주세요.';

      setMessage(`❌ ${msg}`);
      console.error(err);
    } finally {
      setBusy(false)
    }
  }

  // 로그아웃
  const handleLogout = async () => {
    setMessage("")
    setBusy(true)

    try {
      await signOut(auth);
      setEmail("")
      setPassword("")
      setMode("login")
    } catch (err) {
      setMessage(`❌ 로그아웃중 오류가 발생했어요.`)
      console.error(err);
    } finally {
      setBusy(false)
    }
  }
  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-x1 font-bold">Auth mini Demo</h1>

      <div className="flex gap-2">
        <button
          className={`px-3 py-2 rounded border ${mode === 'login' ? 'bg-black text-white' : ''
            }`}
          onClick={() => setMode('login')}
          disabled={busy} > 로그인
        </button>

        <button
          className={`px-3 py-2 rounded border ${mode === 'signup' ? 'bg-black text-white' : ''
            }`}
          onClick={() => setMode('signup')}
          disabled={busy} > 회원가입
        </button>
      </div>

      {/* 입력 */}
      <div className="space-y-2">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={busy}
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="비밀번호 (6자 이상)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={busy}
        />
      </div>

      {/* 로그인버튼 */}
      <button
        className="w-full bg-black text-white rounded px-3 py-2 disabled:opacity-60"
        onClick={handleSubmit}
        disabled={busy}
      >
        {busy
          ? '처리 중...'
          : mode === 'signup'
            ? '회원가입 실행'
            : '로그인 실행'}
      </button>

      {/* 로그아웃 버튼 */}
      <button 
        className="w-full border rounded px-3 py-2 disabled:opacity-60"
        onClick={handleLogout}
        disabled={busy}
      >
        로그아웃
      </button>

      {/* 결과 메시지 */}
      {message && (
        <div className="border rounded p-3 text-sm bg-gray-50">{message}</div>
      )}
    </div>
  )
}