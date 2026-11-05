import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.ts";
export const UserBadge = () => {
  const user = useContext(UserContext);
  if (user === null) {
    return <p>사용자 정보를 불러올 수 없습니다.</p>;
  }
  return (
    <p>
      안녕하세요, {user.name}님! ({user.role})
    </p>
  );
};
