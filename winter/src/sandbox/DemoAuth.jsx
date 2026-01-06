import { useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import {auth} from '../firebase/firebace'

export const DemoAuth = () => {
  // TODO 1. 입력값 state 만들기
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // TODO 2. ahems state 만들기 (login / signup)
  const[mode, setMode] = useState('login') // 'login' | 'signup'
  // TODO 3. 메시지 state 만들기
  const[Message, setMessage] = useState('');
  const[busy, setBusy] = useState(false);
  // TODO 4. 클릭 핸들러 함수 만들기 (async)

  const handleSubmit = async() => {
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
  return (
    <>
      <h1>Auth mini Demo</h1>

      {/* TODO 5. 이메일 input */}
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* TODO 6. 비밀번호 input */}
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* TODO 7. 버튼 (로그인 / 회원가입) */}
      <button onClick={handleSubmit}>실행</button>
      {/* TODO 8. 메시지 출력 */}
    </>
  )
}