/* eslint-disable max-len */
// /* eslint-disable */
// 지금은 뷰 구성에 집중할 것임. 린트 무시하는 주석은 나중에 해제하기
import React, { useLayoutEffect } from "react";
import { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import useComponentWidth from "utils/useComponentWidth";
import useModal from "../utils/useModal";
// import Icon from "../assets/Icon";

import {
  NovelImg,
  NovelTitle,
  NovelContainer,
  NovelInfoBox,
  NovelAuthor,
  NovelSubInfoBox,
  NovelDesc,
  DownIcon,
  UpIcon,
  NovelDescBox,
  ModalContainerT,
  ModalContainerF,
  DownIconBox,
  UpIconBox,
} from "./NovelColumnDetail.styles";

type MyComponentProps = React.PropsWithChildren<{
  novel: {
    novelImg: string;
    userImg: string;
  };
}>;

// <Trouble shooting>
// 1-1. problem: component rerendered but animation didn't work.
//    I thought that (parent's some state didn't change) or (state changed but didn't pass to child component) or (state passed to child but the component didn't rerender,) etc...
//    I tested all, and found that everything is okay except animation when component rerendered.
// 1-2. to solve: putting "key" is the key to solve the problem!
//    I got this from
//    (stack overflow Q&A : https://stackoverflow.com/questions/63186710/how-to-trigger-a-css-animation-on-every-time-a-react-component-re-renders)
//      answer1 : "when the div re-renders, react only changes its inner text. Adding a key will make react think it's a different div when the key changes, so it'll unmount it and mount again."
//      answer2 : "The trick here is to use a random key field on your card element. React's diffing algorithm considers elements with the same key as the same, so randomizing the key will make react consider each rerendered element as new, so will removed the old element from the DOM and add a brand new one"
// But I had second problem.(What?????????)
// 2-1. problem: when boolean prop is false, animation for prop true works...
//      I have two animations. One is for true, the other is for false.
//      In one styled-component, boolean prop works for dividing animations.
//      But always animation for true works, animation for false never.
//      They were not problem that styled-component prop type or ThemProvider or React.memo or component key prop, etc...
//      Huh...I couldn't catch the main reason. But I solved it.
// 2-2. to solve: two components, two animations. not one component, two animations
//      before I solved it, I had one component, and boolean prop divided animations.
//      Now I have two components, which have another animation.
//      And boolean prop decides which component will be returned.
// 3-3. At last, things are unnecessary : key prop and boolean prop for styled-components.
//      Bye guys...
//      Now So simple. hahaha....
// 와우 또다른 문제...
// 3-1. problem: 모달영역 스크롤 후 닫기 버튼 클릭하면 모달 탑 영역이 보인 후 사라짐.
//      컴포넌트가 새로 렌더링되며 탑 영역이 보이는 것.
//      텍스트 영역을 child component로 분리해 React.memo로 감싸주어도 parent가 리렌더링되면 탑 영역이 보임.
// 3-2. to solve: 모달 닫기 버튼 눌렀을 때 모달T의 스크롤 y값을 가져와 모달F에 적용
//      making refs for : show true modal, show false modal, scroll y value in show true modal
//      when clicking the modal closing button, get scrollTop for modalT before changed show state
//      useLayoutEffect good! useEffect is not good for this time.
//       : useLayoutEffect works after layout while useEffect works after layout and paint
//      scrollTop for modalF is set, then modalF is painted
// 와...풀었다...

function DescModal({
  modalScrollY,
  modalFRef,
  modalTRef,
  isShowOn,
  desc,
}: {
  modalScrollY: React.MutableRefObject<number>;
  modalFRef: React.RefObject<HTMLDivElement>;
  modalTRef: React.RefObject<HTMLDivElement>;
  isShowOn: boolean;
  desc: string;
}) {
  // 모달F가 화면에 그려지기 전 스크롤Y 설정
  useLayoutEffect(() => {
    modalFRef.current?.scroll(0, modalScrollY.current);
  }, [isShowOn]);

  if (isShowOn) {
    return <ModalContainerT ref={modalTRef}>{desc}</ModalContainerT>;
  }
  return <ModalContainerF ref={modalFRef}>{desc}</ModalContainerF>;
}
// <ModalContainer key={Math.random()} isShowOn={isShowOn}>
export default function NovelColumnDetail({ novel }: MyComponentProps) {
  // props or default props
  const {
    novelImg = "https://dn-img-page.kakao.com/download/resource?kid=xsaRM/hzhOfrO85M/k1jHoCWYGpQkLzI11JXbA0&filename=th1",
    userImg = "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
  } = novel;
  const theme = {
    novelImg,
    userImg,
  };
  const infoRef = useRef<HTMLDivElement>(null);
  const infoWidth = useComponentWidth(infoRef); // 인포컨테이너 width 받아와 제목 엘립시스에 적용

  const { isModal, handleModal, isShowModal } = useModal();

  const desc = `#아카데미물 #여장남자 #상처남 #직진녀 #착각계 #개그물\n\n19금 공포 소설에 빙의했다.
              \n불우한 가정환경에 흑화해 살인을 저지를 여장남주에게 끔살당하는 룸메이트로...\n남주의
              애정결핍을 해결해 주면 살인을 막을 수 있지 않을까?!\n그래서 그에게 고백했다.\n\n“널,
              널 좋아해!”\n“…난 여잔데?”\n\n어? 아, 아뿔싸!\n그, 그래도 널 좋아해!\n\n이미 엎질러진
              물.\n여장남주의 곁에 열심히 붙어 다니며 원작의 살인을 막았다.\n이제 이놈이 슬슬
              남자임을 밝혀야 하는데...\n여장한 걸 절대 안 들키려 한다?!\n\n“야, 너
              남자잖아!”\n“……아니야, 아니야. 그러니 날 버리지 마. 브리.”\n\n심지어 울기까지.\n너 왜
              울어!`;

  // (문제)모달 스크롤을 내린 후 모달을 닫으면 모달 탑 영역이 보이고 사라짐
  // (대처)닫기 버튼을 누른 직후 모달T의 스크롤y 값을 가져와 모달F에 적용
  const modalTRef = useRef<HTMLDivElement>(null);
  const modalFRef = useRef<HTMLDivElement>(null);
  const modalScrollY = useRef(0);

  const getModalScroll = () => {
    modalScrollY.current = modalTRef.current?.scrollTop as number;
  };

  return (
    <ThemeProvider theme={theme}>
      <NovelContainer>
        <NovelImg />
        <NovelInfoBox ref={infoRef}>
          <NovelTitle infoWidth={infoWidth}>[로판] 여장남주한테 고백했다</NovelTitle>
          <NovelSubInfoBox>
            <NovelAuthor>강녹두</NovelAuthor>
            <NovelDescBox>
              <NovelDesc>{desc}</NovelDesc>
              {isModal && (
                <DownIconBox
                  onClick={() => {
                    getModalScroll();
                    handleModal();
                  }}
                >
                  <DownIcon />
                </DownIconBox>
              )}
              {!isModal && (
                <UpIconBox>
                  <UpIcon onClick={handleModal} />
                </UpIconBox>
              )}
            </NovelDescBox>
          </NovelSubInfoBox>
          {isModal && (
            <DescModal
              modalScrollY={modalScrollY}
              modalTRef={modalTRef}
              modalFRef={modalFRef}
              isShowOn={isShowModal}
              desc={desc}
            />
          )}
        </NovelInfoBox>
      </NovelContainer>
    </ThemeProvider>
  );
}
