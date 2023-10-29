import React, { useLayoutEffect, useRef } from "react";
import { isCurrentPath, useModal } from "utils";

import { useNavigate } from "react-router-dom";
import { NovelDetail } from "store/serverAPIs/types";
import {
  NovelImg,
  NovelTitle,
  NovelLink,
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

function NovelDescModal({
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
    return (
      <ModalContainerT
        ref={modalTRef}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {desc}
      </ModalContainerT>
    );
  }
  return (
    <ModalContainerF
      ref={modalFRef}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {desc}
    </ModalContainerF>
  );
}

export default function NovelColumnDetail({
  isRecommend,
  novel,
}: {
  novel: NovelDetail;
  isRecommend?: true;
}) {
  const { novelId, novelImg, novelTitle, novelAuthor, novelGenre, novelDesc } = novel;

  const { isModal, handleModal, isModalShown } = useModal();

  // (문제)모달 스크롤을 내린 후 모달을 닫으면 모달 탑 영역이 보이고 사라짐
  // (대처)닫기 버튼을 누른 직후 모달T의 스크롤y 값을 가져와 모달F에 적용
  const modalTRef = useRef<HTMLDivElement>(null);
  const modalFRef = useRef<HTMLDivElement>(null);
  const modalScrollY = useRef(0);

  const getModalScroll = () => {
    modalScrollY.current = modalTRef.current?.scrollTop as number;
  };

  // when this is used in iframe
  const isIframe = isCurrentPath("iframe");
  //  pass novel info to the parent
  const sendNovel = () => {
    window.parent.postMessage({ novelId, novelTitle }, "*");
  };

  const navigate = useNavigate();

  return (
    <NovelLink
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();

        if (isIframe) {
          sendNovel();
          return;
        }

        navigate(`/novel-detail/${novelId}`);
      }}
    >
      <NovelImg novelImg={novelImg} isRecommend={isRecommend} />
      <NovelInfoBox>
        <NovelTitle>{`[${novelGenre}] ${novelTitle}`}</NovelTitle>
        <NovelSubInfoBox>
          <NovelAuthor>{novelAuthor}</NovelAuthor>
          <NovelDescBox>
            <NovelDesc>{novelDesc}</NovelDesc>
            {isModal && (
              <DownIconBox
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  event.stopPropagation();
                  event.preventDefault();
                  getModalScroll();
                  handleModal();
                }}
              >
                <DownIcon />
              </DownIconBox>
            )}
            {!isModal && (
              <UpIconBox
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  event.stopPropagation();
                  event.preventDefault();
                  handleModal();
                }}
              >
                <UpIcon />
              </UpIconBox>
            )}
          </NovelDescBox>
        </NovelSubInfoBox>
        {isModal && (
          <NovelDescModal
            modalScrollY={modalScrollY}
            modalTRef={modalTRef}
            modalFRef={modalFRef}
            isShowOn={isModalShown}
            desc={novelDesc}
          />
        )}
      </NovelInfoBox>
    </NovelLink>
  );
}
