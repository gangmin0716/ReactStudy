import * as S from "./style/home"
import { IoChevronDown } from "react-icons/io5";
import { LuMessageCircleDashed } from "react-icons/lu";
import { TbGift, TbUserPlus } from "react-icons/tb";

export default function Home() {
  return (
    <S.Frame>
      <S.Top>
        <S.DropDown>
          <div>ChatGPT</div>
          <IoChevronDown color="#afafaf" />
        </S.DropDown>
        <S.FreeOffer>
          <TbGift size={17} />{/*이거 선물 아이콘임*/}
          <div>무료 오퍼</div>
        </S.FreeOffer>
        <S.TopRight>
          <TbUserPlus size={20} /> {/*이거 사람임*/}
          <LuMessageCircleDashed size={18} /> {/*이거 말풍선임*/}
        </S.TopRight>
      </S.Top>
    </S.Frame>
  )
}