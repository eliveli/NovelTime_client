import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

export const NovelTitleContainer = styled.div`
  /* border-bottom: 1px solid rgba(100, 100, 100, 0.1); */
  padding: 10px 0;

  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
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
export const SrchGuideText = styled.span<{ isHowTo?: true }>`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.4);
  font-size: 13px;
  border-bottom: 1px dotted rgba(0, 0, 0, 0.1);

  display: inline-block;
  margin-bottom: 10px;

  ${({ isHowTo }) => isHowTo && `margin-bottom: 0;`}
`;
export const MoreIconBox = styled(Icon.IconBox)`
  /* border: 1px solid rgba(100, 100, 100, 0.4);
  border-radius: 50%; */
  color: rgba(100, 100, 100, 0.4);
  margin-left: 0px;
  border: 0;
`;
export const HowToGetLink = styled.div`
  display: flex;
  align-items: center;

  /* border-bottom: 1px dotted rgba(0, 0, 0, 0.1); */
`;
export const Iframe = styled.iframe`
  width: 100%;
  height: 500px;
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

  height: 420px;
  ${screenHeight < 700 && "height: 325px;"}
  ${screenHeight > 1000 && "height: 640px;"}

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
export const PlatformContnrFirst = styled.div`
  /* display: flex;
  padding: 2px 0px;
  border-bottom: 1px dotted rgba(100, 100, 100, 0.1);
  align-items: center;
  justify-content: flex-end; */

  padding: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin: 10px 0px; */

  border-bottom: 2px dotted rgba(100, 100, 100, 0.1);
  border-radius: 0;

  @media screen and (min-width: 700px) {
    border: 1px solid rgba(100, 100, 100, 0.1);
    border-radius: 10px;
  }
  /* @media screen and (max-width: 500px) {
    justify-content: space-between;
  }
 */
`;
export const PlatformContnrSecond = styled.div`
  /* display: flex;
  padding: 2px 0px;
  border-bottom: 1px dotted rgba(100, 100, 100, 0.1);
  align-items: center;
  justify-content: flex-end; */

  padding: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin: 10px 0px; */

  @media screen and (min-width: 700px) {
    border: 1px solid rgba(100, 100, 100, 0.1);
    border-radius: 10px;

    &:last-child {
      min-width: 368px;
      margin-left: 10px;
    }
  }
  /* @media screen and (max-width: 500px) {
    justify-content: space-between;
  }
 */
`;
export const PlatformBtn = styled.button<{ selectedPlatform: string; platform: string }>`
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  color: rgba(0, 0, 0, 0.6);
  padding: 4px 6px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  margin-left: 6px;

  @media screen and (max-width: 360px) {
    margin-left: 3px;
  }

  ${({ selectedPlatform, platform }) =>
    selectedPlatform === platform &&
    `border:1px solid ${theme.color.mainLight}; color:${theme.color.main};`}
`;

export const PlatformBtnContnr = styled.div<{ isNewTab?: true }>`
  ${({ isNewTab }) =>
    isNewTab &&
    `@media screen and (max-width: 396px) {
      width: 100%;
      text-align: right;}
  `}
`;
export const AllPlatformContnr = styled.div`
  margin: 10px 0;

  border: 1px solid rgba(100, 100, 100, 0.1);
  border-radius: 10px;

  @media screen and (min-width: 700px) {
    border: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
export const PlatformNewTab = styled.a``;
export const GuideText = styled.span`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
  font-size: 15px;
  @media screen and (max-width: 360px) {
    font-size: 14px;
  }
`;
export const SelectPlatform = styled.button`
  padding: 5px 7px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  color: rgba(0, 0, 0, 0.6);
  white-space: nowrap;

  margin-left: 8px;
`;
export const NovelUrlContnr = styled.div`
  /* border-bottom: 1px solid rgba(100, 100, 100, 0.1); */
  /* padding: 8px 0; */
  display: flex;
  align-items: center;

  border: 1px solid rgba(100, 100, 100, 0.1);
  border-radius: 10px;
  padding: 5px 8px;
`;
export const NovelUrl = styled.textarea`
  border: 0;
  /* border: 1px solid rgba(100, 100, 100, 0.1); */
  /* border-radius: 10px; */
  /* padding: 5px 8px; */
  height: 33px;

  width: 100%;
  /* border: 0; */
  resize: none;
  ${theme.hideScrollBar}
  outline: none;

  ::placeholder {
    font-size: 14px;

    font-weight: 500;
    color: rgba(0, 0, 0, 0.5);
  }

  font-size: 15px;
  /* height: 28px; */
  line-height: 1.9;
`;
