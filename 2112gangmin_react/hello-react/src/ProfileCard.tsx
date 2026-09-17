import "./ProfileCard.css";

type ProfileCardProps = {
  name: string;
  job: string;
  introduction: string;
  image: string;
};

const ProfileCard = ({ name, job, introduction, image }: ProfileCardProps) => {
  return (
    <div className="profile-card">
      <img className="profile-image" src={image} alt={`${name}의 프로필`} />
      <h2 className="profile-name">{name}</h2>
      <p className="profile-job">{job}</p>
      <p className="profile-introduction">{introduction}</p>
    </div>
  );
};

export default ProfileCard;
트;
