import {
  NovelImgBG,
  NovelImgBig,
  ClosingIcon,
  ClosingBox,
  NovelImgContainer,
  SortMobileBG,
  SortBox,
  SortText,
  ClosingSpace,
} from "./Modal.styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeModal, sortWriting, filterContent } from "../../store/clientSlices/modalSlice";
import { usePreventScroll } from "../../utils";

export default function Modal() {
  const dispatch = useAppDispatch();
  const modalCategory = useAppSelector((state) => state.modal.modalCategory);
  const novelImage = useAppSelector((state) => state.modal.novelImage);

  // 네이버 시리즈 이미지 url 변경, 큰 사이즈 가져오기
  let imgSrc;
  if (novelImage.slice(novelImage.length - 10, novelImage.length) === "?type=m260") {
    imgSrc = novelImage.slice(0, novelImage.indexOf("?type=m260"));
  } else {
    imgSrc = novelImage;
  }

  // get writing name for ContentFilter Modal
  const { pathname } = window.location;
  const writing = pathname.includes("talk") ? "FreeTalk" : "Recommend";

  usePreventScroll(modalCategory); // 모달 띄운 동안 body 영역 스크롤 막기

  return (
    <div>
      {(() => {
        switch (modalCategory) {
          case "novelImage":
            return (
              <NovelImgBG>
                <NovelImgContainer>
                  {/* <NovelImgBig src={imgSrc} /> */}
                  <NovelImgBig src={imgSrc} alt="BigSize Image" />
                  <ClosingBox onClick={() => dispatch(closeModal())}>
                    <ClosingIcon />
                  </ClosingBox>
                </NovelImgContainer>
              </NovelImgBG>
            );
          case "sortWriting":
            return (
              <SortMobileBG>
                <SortBox>
                  {["작성일New", "작성일Old", "댓글Up", "댓글Down", "좋아요Up", "좋아요Down"].map(
                    (_) => (
                      <SortText
                        onClick={() => {
                          dispatch(sortWriting(_));
                          dispatch(closeModal());
                        }}
                      >
                        {_}
                      </SortText>
                    ),
                  )}
                </SortBox>
                <ClosingSpace
                  onClick={() => {
                    dispatch(closeModal());
                  }}
                />
              </SortMobileBG>
            );
          case "filterContent":
            return (
              <SortMobileBG>
                <SortBox>
                  {["Novel", writing].map((_) => (
                    <SortText
                      key={_}
                      onClick={() => {
                        dispatch(filterContent(_));
                        dispatch(closeModal());
                      }}
                    >
                      {_}
                    </SortText>
                  ))}
                </SortBox>
                <ClosingSpace
                  onClick={() => {
                    dispatch(closeModal());
                  }}
                />
              </SortMobileBG>
            );
          case "login":
            // eslint-disable-next-line react/jsx-no-useless-fragment
            return <></>;
          case "none":
            // eslint-disable-next-line react/jsx-no-useless-fragment
            return <></>;

          default:
            // eslint-disable-next-line react/jsx-no-useless-fragment
            return <></>;
        }
      })()}
    </div>
  );
}
