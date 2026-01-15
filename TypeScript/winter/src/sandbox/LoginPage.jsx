import { useAuth } from '../auth/useAuth';
export default function LoginPage() {
  const { setUser, setLoading } = useAuth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-xl shadow p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Mini SNS</h2>
        <p className="text-gray-500 mb-6">로그인이 필요합니다</p>

        <div className="flex flex-col gap-3">
          {/* 로딩 종료용 (실습) */}
          <button
            onClick={() => setLoading(false)}
            className="w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            로딩 끝내기 (실습용)
          </button>

          {/* FeedPage 분기 테스트 핵심 */}
          <button
            onClick={() => setUser({ name: 'test-user' })}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            임시 로그인
          </button>
        </div>
      </div>
    </div>
  );
}