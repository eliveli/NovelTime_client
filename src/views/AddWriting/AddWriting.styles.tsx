import theme, { styled } from "assets/styles/theme";

export const NovelTitleContainer = styled.div`
  padding: 10px 0;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
`;
export const NovelTitle = styled.button`
  border-radius: 20px;
  padding: 7px 10px;
  font-size: 16px;
  font-weight: 500;
  background-color: white;
  color: ${theme.color.main};
  border: 1px solid ${theme.color.mainLight};
`;
export const TextToBack = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: rgba(100, 100, 100, 0.5);

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}
`;

export const NoteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const Note = styled.div`
  font-weight: 500;
  color: rgba(0, 0, 0, 0.4);
  font-size: 13px;
  border-radius: 3px;
  background-color: white;
  margin-bottom: 10px;
  position: absolute;
  text-align: right;

  right: 9px;
  bottom: 24px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 4px;
`;

export const SrchGuideText = styled.span<{ isHowTo?: true }>`
  font-weight: 500;
  color: rgba(0, 0, 0, 0.4);
  font-size: 13px;
  border-bottom: 1px dotted rgba(0, 0, 0, 0.1);

  display: inline-block;
  margin-bottom: 10px;

  ${theme.media.hover(`
    cursor: pointer;
    opacity: 0.7;
    font-weight: 500;
    color: rgba(100, 100, 100, 0.8);
  `)}

  ${({ isHowTo }) =>
    isHowTo && `margin-bottom: 0; position: absolute; right: 0; top: -21px; border-bottom: 0px;`}
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
  font-weight: 500;
  &:last-child {
    margin-left: 10px;
  }

  ${({ category, selected }) =>
    category === selected
      ? `background-color: white; color: ${theme.color.main}; border-block-color:  ${theme.color.mainLight};`
      : theme.media.hover(
          `cursor: pointer;
          opacity: 0.7;`,
        )}
`;

export const WritingTitleContnr = styled.div`
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding: 8px 2px;
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

  padding: 0;
`;

export const WritingContentContnr = styled.div<{
  titleHeight: string;
  novelTitleContnrHeight: string;
}>`
  padding: 8px 2px;

  @media screen and (max-width: 767px) {
    height: calc(
      100vh - 51px -
        (
          ${({ novelTitleContnrHeight, titleHeight }) =>
            `${novelTitleContnrHeight} + 54px + (${titleHeight} + 17px)`}
        ) - 16px
    );
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    height: calc(
      100vh - 51px -
        (
          ${({ novelTitleContnrHeight, titleHeight }) =>
            `${novelTitleContnrHeight} + 54px + (${titleHeight} + 17px)`}
        ) - 20px
    );
  }

  @media screen and (min-width: 1024px) {
    height: calc(
      100vh - 61px -
        (
          ${({ novelTitleContnrHeight, titleHeight }) =>
            `${novelTitleContnrHeight} + 54px + (${titleHeight} + 17px)`}
        ) - 10px - 40px - 20px
    );
    // 100vh - (height in header) - (heights in upper components) - (margin-bottom in this component) - (height in SubmitBtnContnr) - (extra height below)
    // .note. titleHeight + 17px === height in WritingTitleContnr

    max-height: 600px;

    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
    margin-bottom: 10px;
  }
`;

export const WritingContent = styled.textarea`
  margin: 0;

  width: 100%;
  height: 100%;

  border: 0;
  resize: none;
  ${theme.hideScrollBar}
  outline: none;

  font-size: 16px;
  line-height: 1.5;

  padding: 0;
`;

export const SubmitBtnContnr = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const SubmitBtnPC = styled.button`
  padding: 7px 10px;
  font-size: 16px;
  font-weight: 500;
  margin-right: 1px;

  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  color: rgba(0, 0, 0, 0.6);
`;
export const PlatformContnrFirst = styled.div`
  padding: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 699px) {
    border-bottom: 2px dotted rgba(100, 100, 100, 0.1);
    border-radius: 0;
  }

  @media screen and (min-width: 700px) {
    border: 1px solid rgba(100, 100, 100, 0.1);
    border-radius: 10px;
  }
`;
export const PlatformContnrSecond = styled.div`
  padding: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 700px) {
    border: 1px solid rgba(100, 100, 100, 0.1);
    border-radius: 10px;

    &:last-child {
      min-width: 368px;
      margin-left: 10px;
    }
  }
`;
export const PlatformBtn = styled.button<{ selectedPlatform: string; platform: string }>`
  border-radius: 15px;
  background-color: white;
  padding: 4px 6px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;

  @media screen and (max-width: 360px) {
    margin-left: 3px;
  }
  @media screen and (min-width: 361px) {
    margin-left: 6px;
  }

  color: ${({ selectedPlatform, platform }) =>
    selectedPlatform === platform ? theme.color.main : "rgba(0, 0, 0, 0.6)"};

  border: ${({ selectedPlatform, platform }) =>
    selectedPlatform === platform
      ? `1px solid ${theme.color.mainLight}`
      : "1px solid rgba(0, 0, 0, 0.2)"};

  ${({ selectedPlatform, platform }) =>
    selectedPlatform !== platform &&
    theme.media.hover(
      `cursor: pointer;
       opacity: 0.7;`,
    )}
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

  border-radius: 10px;

  @media screen and (max-width: 699px) {
    border: 1px solid rgba(100, 100, 100, 0.1);
  }

  @media screen and (min-width: 700px) {
    border: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
export const PlatformNewTab = styled.a``;
export const GuideText = styled.span`
  font-weight: 500;
  color: rgba(0, 0, 0, 0.5);

  @media screen and (max-width: 360px) {
    font-size: 14px;
  }
  @media screen and (min-width: 361px) {
    font-size: 15px;
  }
`;
export const SelectPlatform = styled.button`
  padding: 5px 7px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  color: rgba(0, 0, 0, 0.6);
  white-space: nowrap;

  margin-left: 8px;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}
`;
export const NovelUrlContnr = styled.div`
  display: flex;
  align-items: center;

  border: 1px solid rgba(100, 100, 100, 0.1);
  border-radius: 10px;
  padding: 5px 8px;

  position: relative;
`;
export const NovelUrl = styled.textarea`
  border: 0;
  height: 33px;
  width: 100%;
  resize: none;
  ${theme.hideScrollBar}
  outline: none;

  ::placeholder {
    font-size: 14px;

    font-weight: 500;
    color: rgba(0, 0, 0, 0.5);
  }

  font-size: 15px;
  line-height: 1.9;
`;

// below three are not used now
export const ContentPlusContnrMobile = styled.div`
  box-shadow: 0 0 2px rgb(100 100 100 / 40%);
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.9);

  @media screen and (max-width: 767px) {
    padding: 10px 16px;
  }
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
