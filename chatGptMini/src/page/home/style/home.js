import styled from "styled-components";

/*head*/
export const Frame = styled.div`
  background-color: #212121;
  width: 100%;
`;

export const Top = styled.div`
  padding: 8px 14px;
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

/*body*/

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 30vh);
  width: 100%;
  padding-bottom: 30px;
`;

export const Body = styled.div`
  padding: 0 24px;
  width: 60%;
`;

export const CenterText = styled.div`
  display: flex;
  justify-content: center;
  max-width: 760px;
  height: 70px;
  font-size: 28px;
  font-weight: 400;
  color: white;
`;

export const InputLable = styled.div`
  padding:11px 16px;
  background-color: #303030;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 34px;
  flex-grow: 0;
`;

export const InputFlex = styled.div`
  display: flex;
  gap: ${(props)=> props.gap}
`;

export const Input = styled.input`
  background: none;
  border: none;
  outline: none;
  width: 100%;
  height: 24px;
  color: white;
  font-size: 16px;

  &::placeholder {
    color: #989898;
  }
`;

export const InputBtn = styled.div`
  display: flex;
  gap: 5px;
`;

export const Iconbg = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgcolor};
  border-radius: 50%;

  cursor: pointer;
`;
