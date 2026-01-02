import { styled } from "styled-components";
import ChatGPTSvg from '@/assets/ChatGPT.svg?react';
import SidebarSvg from '@/assets/Sidebar.svg?react';

export const Frame = styled.div`
  width: 20%;
  background-color: #181818;
`;

export const Top = styled.div`
  padding: 14px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChatGPTIcon = styled(ChatGPTSvg)`
  width:26px;
  height: 26px;
`;

export const SidebarIcon = styled(SidebarSvg)`
  width: 19px;
  height: 19px;
  cursor: pointer;

  path {
    stroke: #afafaf;
  }

  &:hover path {
    stroke: white;
  }
`;
