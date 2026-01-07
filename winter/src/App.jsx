import { useState, useEffect } from 'react';
import { auth } from '../src/firebase/firebase'; // 로컬 설정파일에서 auth 가져오기
import { onAuthStateChanged } from 'firebase/auth';

import './App.css';

import Login from './pages/LoginPage';
import Board from './Board';
import ResetPassword from './ResetPassword';
import UpdatePassword from './UpdatePassword';

function App() {
  const [user, setUser] = useState(null); // 로그인 사용자
  const [loading, setLoading] = useState(true); // 로그인 상태 확인 중

  useEffect(() => {
    // 로그인 상태(세션) 감지
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // user or null
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      {!user ? (
        <>
          <Login />
          <hr />
          <ResetPassword />
        </>
      ) : (
        <>
          <UpdatePassword />
          <hr />
          <Board user={user} />
        </>
      )}
    </div>
  );
}

export default App;

// import { useState, useEffect } from 'react';
// import { auth } from './firebase'; // 로컬 설정파일에서 auth 가져오기
// import { onAuthStateChanged } from 'firebase/auth';

// import './App.css';

// import Login from './Login';
// import Board from './Board';

// function App() {
//   const [user, setUser] = useState(null); // 사용자 상태 (User | null 이었는데 JS에서는 null로 시작)
//   const [loading, setLoading] = useState(true); // 로딩 상태

//   useEffect(() => {
//     // onAuthStateChanged: auth 상태 구독. 상태가 바뀌면 호출된다 (로그인, 로그아웃)
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser); // 사용자가 있으면 user 객체, 없으면 null
//       setLoading(false); // 로딩 완료
//     });

//     // unmount될 때 감지(구독) 해제
//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // 로딩 중
//   }

//   return <div className="App">{!user ? <Login /> : <Board user={user} />}</div>;
// }

// export default App;
