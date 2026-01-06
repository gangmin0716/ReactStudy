import { useAuth } from '../auth/useAuth';
export default function FeedPage() {
  const { user, setUser } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 상단 바 */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Mini SNS</h1>
        <button
          onClick={() => setUser(null)}
          className="text-sm text-red-500 hover:text-red-600"> 로그아웃 </button>
      </header>
      {/* 메인 콘텐츠 */}
      <main className="max-w-2xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <p className="text-gray-700">

            <span className="font-semibold">{user?.name}</span>님 환영합니다!

          </p>
        </div>
        {/* 더미 피드 카드 */}
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-xl shadow p-4">
              <p className="font-semibold mb-1">게시글 {n}</p>
              <p className="text-gray-600 text-sm">여기는 테스트용 게시글입니다. </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}