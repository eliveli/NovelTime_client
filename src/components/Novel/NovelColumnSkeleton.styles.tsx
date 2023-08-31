import { styled } from "assets/styles/theme";

export const NovelContainer = styled.div<{ text?: string }>`
  display: flex;
  width: 100%;

  border: 1px solid rgba(100, 100, 100, 0.1);

  margin-top: 12px;
  padding: 10px;
  border-radius: 10px;

  position: relative;
`;

export const NovelImg = styled.div`
  height: auto;
  min-width: 70px;
  border-radius: 5px;
  background-color: whitesmoke;
`;

export const NovelInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  margin-left: 10px;
  justify-content: space-between;

  position: relative;
`;

export const NovelTitle = styled.div`
  height: 20px;
  border-radius: 5px;
  background-color: whitesmoke;
`;
export const NovelAuthor = styled.div`
  height: 20px;
  border-radius: 5px;
  background-color: whitesmoke;
`;

export const NovelDesc = styled.div`
  height: 40px;
  width: 100%;

  border-radius: 5px;
  background-color: whitesmoke;
`;

export const Note = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);

  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: -10px;
  margin-left: -10px;

  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;
