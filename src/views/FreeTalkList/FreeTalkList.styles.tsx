import styled from "styled-components";

export const TalkBG = styled.section`
  /* 모바일 */
  width: 100%;
  margin: 0 auto;
  padding: 0 16px 16px;
  background-color: white;
  border-top: 2px solid gray;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
  }
  /* PC - 모바일,태블릿과 뷰를 다르게 구성 */
  @media screen and (min-width: 1024px) {
    width: 860px;
  }
`;

export const Talk = styled.article`
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  &:last-child {
    border-bottom: 0;
  }
`;
export const FirstLineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  margin-left: 12px;
  padding-bottom: 3px;

  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
`;
export const BesideImgContainer = styled.div``;

export const UserImg = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
export const UserNameBox = styled.div`
  display: flex;
  /* padding-left: 12px; */
`;

export const UserName = styled.p`
  margin: 0;
`;
export const CreateDate = styled.p`
  margin: 0;
  padding-left: 12px;
`;
export const TalkPreview = styled.div`
  justify-content: space-between;
  padding-left: 12px;
  padding-top: 6px;
`;
export const TalkImg = styled.img`
  border-radius: 10%;
  width: 100%;
`;
export const IconsBox = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;
export const IconBox = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;
export const IconNO = styled.span``;

export const TalkTitle = styled.div`
  font-weight: 600;
  font-size: 17px;
`;
export const NovelTitle = styled.div`
  color: gray;
  font-weight: 600;
`;
