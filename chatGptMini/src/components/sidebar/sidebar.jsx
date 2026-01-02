import * as S from "./style/sidebar"
import ChatGPTIcon from '@/assets/ChatGPT.svg?react';
import SidebarIcon from '@/assets/Sidebar.svg?react'

export default function Sidebar() {
  return (
    <S.Frame>
      <S.Top>
        <S.ChatGPTIcon></S.ChatGPTIcon>
        <S.SidebarIcon></S.SidebarIcon>
      </S.Top>
    </S.Frame>
  )
}

