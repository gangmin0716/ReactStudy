// 실제 로그인을 위한 스켈레톤
import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState(''); // TODO: 기본값 확인
  const [password, setPassword] = useState(''); // TODO: 기본값 확인
  const [mode, setMode] = useState('login'); // TODO: "login" 또는 "signup"
  const [error, setError] = useState(''); // TODO: 에러 메시지

  // TODO 2) mode 토글 함수 만들기
  // 요구사항: login <-> signup 바꾸기 + (선택) 에러 초기화
  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login')
    setError("")
  };

  // TODO 3) 폼 제출 함수 만들기
  // 요구사항:
  // 1) e.preventDefault()
  // 2) setError("")로 초기화
  // 3) mode가 signup이면 회원가입 API 호출
  //    아니면 로그인 API 호출
  // 4) 실패하면 에러 메시지 출력
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      if (mode === 'signup') {
        // TODO 3-1) 회원가입 호출 (함수명은 위 import 참고)
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // TODO 3-2) 로그인 호출
        await signInWithEmailAndPassword(auth, email, password);
      }

      // 성공 시: 여기서 navigate() 같은 이동 코드 쓰지 말 것!
      // AuthProvider의 onAuthStateChanged가 user를 갱신하면 App.jsx가 자동 분기함.
    } catch (err) {
      // TODO 3-3) 에러 처리
      err.code === "auth/invalid-credential"
        // - invalid-credential => "이메일 또는 비밀번호가 올바르지 않습니다."
        ? setError("이메일 또는 비밀번호가 올바르지 않습니다.")
        // - 그 외 => "로그인 중 오류가 발생했습니다."
        : setError("로그인 중 오류가 발생했습니다.")
    }
  };

  const titleText = mode === 'login' ? '로그인' : '회원가입';
  const submitText = mode === 'login' ? '로그인' : '회원가입';
  const switchQuestion =
    mode === 'login' ? '아직 계정이 없나요?' : '이미 계정이 있나요?';
  const switchButtonText = mode === 'login' ? '회원가입' : '로그인';

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center">Mini SNS</h1>
        <p className="text-sm text-center mt-2 mb-6">
          {/* TODO 4) mode에 따라 "로그인"/"회원가입" 표시 */}
          {titleText} 후 피드로 이동합니다
        </p>

        {/* TODO 5) form onSubmit 연결 */}
        <form
          className="space-y-3"
          onSubmit={handleSubmit}
        >
          {/* TODO 6) email input value/onChange 연결 */}
          <input
            type="email"
            placeholder="이메일"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          // required
          />

          {/* TODO 7) password input value/onChange 연결 */}
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          // required
          />

          {/* TODO 8) error가 있을 때만 출력 */}
          {error && <p className="text-sm">{error}</p>}

          {/* TODO 9) 버튼 텍스트 mode에 따라 변경 */}
          <button type="submit" className="w-full py-2 rounded">
            {/* TODO: mode에 따라 "로그인"/"회원가입" */}
            {submitText}
          </button>
        </form>

        {/* TODO 10) 모드 전환 UI */}
        <div className="mt-4 text-center text-sm">
          {switchQuestion}
          <button type="button" className="ml-2 underline" onClick={toggleMode}>
            {/* TODO: mode에 따라 "회원가입"/"로그인" */}
            {switchButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

// 스켈레톤
// import { useAuth } from '../auth/useAuth';

// export default function LoginPage() {
//   const { setUser, setLoading } = useAuth();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-sm bg-white rounded-xl shadow p-6 text-center">
//         <h2 className="text-2xl font-bold mb-2">Mini SNS</h2>
//         <p className="text-gray-500 mb-6">로그인이 필요합니다</p>

//         <div className="flex flex-col gap-3">
//           {/* 로딩 종료용 (실습) */}
//           <button
//             onClick={() => setLoading(false)}
//             className="w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
//           >
//             로딩 끝내기 (실습용)
//           </button>

//           {/* FeedPage 분기 테스트 핵심 */}
//           <button
//             onClick={() => setUser({ name: 'test-user' })}
//             className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
//           >
//             임시 로그인
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
