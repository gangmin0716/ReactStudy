import * as S from "./style/sidebar"
import { IoSearch } from "react-icons/io5";
import { IoIosImages } from "react-icons/io";
import { RiApps2Line } from "react-icons/ri";


const MenuIcon = [
  { id: 1, name: "새 채팅", icon: <S.WriteIcon /> },
  { id: 2, name: "채팅 검색", icon: <IoSearch size={18} color="#FFFFFF" /> },
  { id: 3, name: "이미지", icon: <IoIosImages size={18} color="#FFFFFF" /> },
  { id: 4, name: "앱", icon: <RiApps2Line size={18} color="#FFFFFF" /> }
];

export default function Sidebar() {

  return (
    <S.Frame>
      <S.Top>
        <S.ChatGPTIcon></S.ChatGPTIcon>
        <S.SidebarIcon></S.SidebarIcon>
      </S.Top>
      <S.Menu>
        {
          MenuIcon.map((icon, index) => {
            return (
              <S.MenuElement>
                {MenuIcon[index].icon}
                <S.Wrap>
                  {MenuIcon[index].name}
                  {MenuIcon[index].id === 3 ? <S.New>신규</S.New> : null}
                </S.Wrap>
              </S.MenuElement>
            )
          })
        }
      </S.Menu>
    </S.Frame>
  )
}

