import styled from "styled-components";

export const Frame = styled.div`
  background-color: #212121;
  width: 100%;
`;

export const Top = styled.div`
  padding: 10px 14px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const DropDown = styled.div`
  padding: 4px 24px;
  font-size: 18px;
  font-weight: normal;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: #2f2f2f;
  }
`;

export const FreeOffer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  
  padding: 8px 12px;
  background-color: #373669;
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 100;
  color: #e8e8e8;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
`;

export const TopRight = styled.div`
  padding: 8px 14px;
  display: flex;
  gap: 20px;
  justify-content: space-evenly;
`;