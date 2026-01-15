import * as S from "./style/home"
import { IoChevronDown, IoMicOutline, IoArrowUp } from "react-icons/io5";
import { LuMessageCircleDashed } from "react-icons/lu";
import { TbGift, TbUserPlus } from "react-icons/tb";
import { GoPlus } from "react-icons/go";
import { RiVoiceprintFill } from "react-icons/ri";
import { useState } from "react";

export default function Home() {
  const [sendbtn, setSendBtn] = useState(false);
  
  const handleOnchange = (e) => {
    if (e.target.value.trim().length > 0) {
      setSendBtn(true);
    } else {
      setSendBtn(false);
    }
  }

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

      <S.Main>
        <S.CenterText>
          <div>지금 무슨 생각을 하시나요?</div>
        </S.CenterText>

        <S.Body>
          <S.InputLable>
            <S.InputFlex gap={"12px"}>
              <GoPlus size={26} color="#ffffff" />
              <S.Input placeholder="무엇이든 물어보세요" onChange={handleOnchange}></S.Input>
            </S.InputFlex>


            <S.InputFlex>
              <S.InputBtn>
                <S.Iconbg hovercolor={"#454545"}>
                  <IoMicOutline size={22} color="white"/>
                </S.Iconbg>
                {sendbtn ? (
                  <S.Iconbg bgcolor={"white"} hovercolor={"#C1C1C1"}>
                    <IoArrowUp size={20} color="black"></IoArrowUp>
                  </S.Iconbg>
                ) : (
                  <S.Iconbg bgcolor={"white"} hovercolor={"#C1C1C1"}>
                    <RiVoiceprintFill size={20}/>
                  </S.Iconbg>
                )}
              </S.InputBtn>
            </S.InputFlex>
          </S.InputLable>
        </S.Body>
      </S.Main>
    </S.Frame>
  )
}