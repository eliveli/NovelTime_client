import theme, { styled } from "assets/styles/theme";

export const NovelTitleContainer = styled.p`
  margin: 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding: 10px 0;
`;
export const NovelTitle = styled.button`
  border-radius: 20px;
  padding: 7px 10px;
  font-size: 16px;
  font-weight: 600;
  background-color: white;
  color: ${theme.color.main};
  border: 1px solid ${theme.color.mainLight};
`;
export const BoardContainer = styled.div`
  margin: 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding: 10px 0;
`;
export const Board = styled.button<{
  category: "FreeTalk" | "Recommend";
  selected: "FreeTalk" | "Recommend";
}>`
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  color: rgba(0, 0, 0, 0.6);
  padding: 7px 10px;
  font-size: 16px;
  font-weight: 600;
  &:last-child {
    margin-left: 10px;
  }

  ${({ category, selected }) =>
    category === selected &&
    `background-color: white; color: ${theme.color.main}; border-block-color:  ${theme.color.mainLight};`}
`;
export const WritingTitleContanr = styled.div`
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding: 8px 0;
  display: flex;
`;
export const WritingTitle = styled.textarea`
  width: 100%;
  border: 0;
  resize: none;
  ${theme.hideScrollBar}
  outline: none;

  font-size: 16px;
  height: 28px;
  line-height: 1.5;
`;
export const WritingContentContnr = styled.div`
  padding: 8px 0;

  @media screen and (min-width: 1024px) {
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
    margin-bottom: 10px;
  }
`;

const screenHeight = window.screen.height;
export const WritingContent = styled.textarea`
  margin: 0;

  width: 100%;
  border: 0;
  resize: none;
  ${theme.hideScrollBar}
  outline: none;

  font-size: 16px;
  line-height: 1.5;

  height: ${screenHeight < 700 ? 325 : 420}px;

  @media screen and (min-width: 1024px) {
    height: 400px;
  }
`;
export const ContentPlusContnrMobile = styled.div`
  box-shadow: 0 0 2px rgb(100 100 100 / 40%);
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.9);

  padding: 10px 16px;

  @media screen and (min-width: 768px) {
    padding: 10px 20px;
  }

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
export const ContentPlusAlignMobile = styled.div`
  max-width: 860px;
  margin: auto;
`;

export const ContentPlusCotnrPC = styled.div`
  padding: 10px 0;
  margin: 0;

  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);

  border-bottom: 1px solid rgba(100, 100, 100, 0.1);

  @media screen and (max-width: 1023px) {
    display: none;
  }
`;
export const SubmitBtnContnr = styled.div`
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 1023px) {
    display: none;
  }
`;
export const SubmitBtnPC = styled.button`
  padding: 7px 10px;
  font-size: 16px;
  font-weight: 600;
  margin-right: 1px;

  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  color: rgba(0, 0, 0, 0.6);
`;
