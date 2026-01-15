import { styled } from "styled-components";
import ChatGPTSvg from '@/assets/ChatGPT.svg?react';
import SidebarSvg from '@/assets/Sidebar.svg?react';
import WriteSvg from '@/assets/Write.svg?react';

export const Frame = styled.div`
  width: 20%;
  background-color: #181818;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Top = styled.div`
  padding: 8px 8px;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChatGPTIcon = styled(ChatGPTSvg)`
  width:26px;
  height: 26px;
  cursor: pointer;

  padding: 6px;
  border-radius: 8px;

  path {
    fill: #ffffff;
  }
  &:hover {
    background-color: #3A3A3A;
  }
`;

export const SidebarIcon = styled(SidebarSvg)`
  width: 20px;
  height: 20px;
  padding: 8px;
  border-radius: 8px;

  cursor: w-resize;

  path {
    fill: #afafaf;
  }

  &:hover {
    background-color: #343434;
  }
`;


export const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuElement = styled.div`
  display: flex;
  color: #d2d2d2;
  gap: 6px;
  padding-left: 12px;
  align-items: center;
  font-size: 14px;
  height: 36px;
  margin: 0 5px;;
  border-radius: 8px;

  &:hover {
    background-color: #303030;
  }
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;

export const WriteIcon = styled(WriteSvg)`
  width: 20px;
  height: 20px;
`;

export const New = styled.div`
  font-size: 8px;
  padding: 3px 5px;;
  border: 1px solid #464646;
  border-radius: 24px;
  color: #a6a6a6;
`;