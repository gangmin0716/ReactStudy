import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useAuth } from '../auth/useAuth';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export default function FeedPage() {
  const { user } = useAuth();

  const posts = [
    {
      id: 1,
      name: '토끼',
      text: '오늘의 교훈: 상태는 거짓말을 하지 않는다 🐰',
    },
    { id: 2, name: '여우', text: 'onAuthStateChanged는 SNS의 심장이다 🦊' },
    { id: 3, name: '나', text: '이제 Firestore만 붙이면 진짜 SNS다 💻' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // navigate() 금지!
      // 인증 상태가 바뀌면 App이 분기 렌더링으로 LoginPage로 돌아감
    } catch (err) {
      console.log(err);
      alert('로그아웃 실패!');
    }
  };

  return (
    <div className="min-h-screen p-4 bg bg-[#f9fafb]">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold">Mini SNS</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm">{user?.email}</span>
          <Button onClick={handleLogout} className="border px-3 py-1 rounded" Text="로그아웃" />
        </div>
      </header>

      <main className="space-y-3">
        {posts.map((post) => (
          <Card key={post.id} className="p-5 bg bg-white shadow-md">
            <p className="font-semibold">{post.name}</p>
            <p className="text-sm">{post.text}</p>
          </Card>
        ))}
      </main>
    </div>
  );
}