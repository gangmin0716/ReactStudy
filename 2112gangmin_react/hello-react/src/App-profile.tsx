import ProfileCard from "./ProfileCard";
import profile1 from "./assets/profile1.png";

function App() {
  return (
    <main>
      <h1>프로필 카드</h1>
      <div className="profile-list">
        <ProfileCard
          name="김민준"
          job="프론트엔드 개발자"
          introduction="사용하기 편리한 웹 화면을 만드는 개발자입니다."
          image={profile1}
        />
        <ProfileCard
          name="이서연"
          job="백엔드 개발자"
          introduction="안정적인 서버를 만드는 개발자입니다."
          image="/profile2.png"
        />
      </div>
    </main>
  );
}
export default App;
