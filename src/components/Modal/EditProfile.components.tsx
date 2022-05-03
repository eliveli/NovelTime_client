import theme from "assets/styles/theme";
import { useEffect, useRef, useState } from "react";
import { closeModal } from "store/clientSlices/modalSlice";
import { useComponentHeight, useComponentWidth } from "utils";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  ClosingIcon,
  ClosingBox,
  TranslucentBG,
  ModalBox,
  ContentContnr,
  ProfileImg,
  ProfileImgBox,
  ProfileName,
  ProfileNameBox,
  SelectBtn,
  SelectBtnBox,
  UploadImg,
  CropImageCanvas,
} from "./Modal.styles";

export default function EditProfile() {
  const dispatch = useAppDispatch();
  const modalCategory = useAppSelector((state) => state.modal.modalCategory);

  // get login user info
  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);
  const userNameRef = useRef<HTMLInputElement>(null);

  const confirmUserName = () => {
    if (!userNameRef.current?.value) {
      alert("유저 네임을 입력해 주세요");
    }
    // 서버에 보내서 동일 유저 네임 여부 확인
    // 유저 네임 길이 제한(얼만큼?) 알림 문구도 미리 넣자.
    // 성공하면 변경된 유저 네임 스토어에 저장
  };

  // set image
  const [selectedProfileImage, setSelectedProfileImage] = useState<string>("");
  const [selectedProfileBGImage, setSelectedProfileBGImage] = useState<null | File | Blob>(null);
  // convert file to DataURL
  const handleProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event && event.target && event.target.files) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.onloadend = () => {
        setSelectedProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // canvas
  const cropImgCanvasRef = useRef<HTMLCanvasElement>(null);

  // get BG width and height to size canvas
  const BGRef = useRef<HTMLDivElement>(null);
  const BGWidth = useComponentWidth(BGRef);
  const BGHeight = useComponentHeight(BGRef);

  const lineWidth = 2;

  // refs for square size and starting point to store previous value
  const sXRef = useRef(0);
  const sYRef = useRef(0);
  const squareSizeRef = useRef(-1);

  // refs for four vertexes of square
  const topLeftCorner = useRef({ x: 0, y: 0 });
  const topRightCorner = useRef({ x: 0, y: 0 });
  const bottomLeftCorner = useRef({ x: 0, y: 0 });
  const bottomRightCorner = useRef({ x: 0, y: 0 });

  // calculate square size and starting point
  const selectSquareSize = (canvasWidth: number, canvasHeight: number) =>
    canvasWidth > canvasHeight ? canvasHeight : canvasWidth;
  const startPointInCanvas = (
    canvasWidth: number,
    canvasHeight: number,
    selectWidthOrHeight: "w" | "h",
  ) => {
    const SquareSizeWithLine = selectSquareSize(canvasWidth, canvasHeight);
    const widthOrHeight = selectWidthOrHeight === "w" ? canvasWidth : canvasHeight;
    return SquareSizeWithLine === widthOrHeight
      ? lineWidth
      : (widthOrHeight - SquareSizeWithLine) / 2 + lineWidth;
  };
  const startPointInBG = (BGWidthOrHeight: number) =>
    (BGWidthOrHeight - squareSizeRef.current - 2 * lineWidth) / 2;

  const calcSquareSize = (canvasWidth: number, canvasHeight: number) =>
    selectSquareSize(canvasWidth, canvasHeight) - 2 * lineWidth;

  // calculate four corners of square not in canvas but in BG //
  //   the value is not exact cause as I see
  //   it is not exactly divided into square line and inside-square...
  //   I need more information about this, but I'm not sure whether it can be or not...
  const calcTopLeftCorner = () => ({ x: sXRef.current - 1, y: sYRef.current - 1 });
  const calcTopRightCorner = () => ({
    x: sXRef.current + squareSizeRef.current,
    y: sYRef.current - 1,
  });
  const calcBottomLeftCorner = () => ({
    x: sXRef.current - 1,
    y: sYRef.current + squareSizeRef.current,
  });
  const calcBottomRightCorner = () => ({
    x: sXRef.current + squareSizeRef.current,
    y: sYRef.current + squareSizeRef.current,
  });

  // set canvas and draw image
  useEffect(() => {
    if (!cropImgCanvasRef.current) return;
    const canvas = cropImgCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = selectedProfileImage;

    image.onload = () => {
      // set canvas width, height, x, y to show full size image and center it in screen
      const canvasRatio = image.width / image.height;
      let newCanvasWidth = BGWidth;
      let newCanvasHeight = newCanvasWidth / canvasRatio;
      if (newCanvasHeight > BGHeight) {
        newCanvasHeight = BGHeight;
        newCanvasWidth = newCanvasHeight * canvasRatio;
      }
      const xOffset = newCanvasWidth < BGWidth ? (BGWidth - newCanvasWidth) / 2 : 0;
      const yOffset = newCanvasHeight < BGHeight ? (BGHeight - newCanvasHeight) / 2 : 0;

      canvas.style.top = `${yOffset}px`;
      canvas.style.left = `${xOffset}px`;

      // set canvas width and height
      // : do not use property "style.width" and "style.height"
      //   that mismatch with display pixel size
      canvas.width = newCanvasWidth;
      canvas.height = newCanvasHeight;
      canvas.style.backgroundImage = `url(${selectedProfileImage})`; // set image as background

      // crop image
      //   ctx.drawImage(image, xOffset, yOffset, newWidth, newHeight);

      // initiate square centered in canvas
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = theme.color.mainLight;
      if (squareSizeRef.current === -1) {
        squareSizeRef.current = calcSquareSize(canvas.width, canvas.height);
        sXRef.current = startPointInBG(canvas.width);
        sYRef.current = startPointInBG(canvas.height);
      }

      // draw square
      ctx.strokeRect(
        sXRef.current + 1,
        sYRef.current + 1,
        squareSizeRef.current,
        squareSizeRef.current,
      );

      // set four circles on corners of the square in canvas
      topLeftCorner.current = calcTopLeftCorner();
      topRightCorner.current = calcTopRightCorner();
      bottomLeftCorner.current = calcBottomLeftCorner();
      bottomRightCorner.current = calcBottomRightCorner();

      const fourCorners = [
        topLeftCorner.current,
        topRightCorner.current,
        bottomLeftCorner.current,
        bottomRightCorner.current,
      ];

      // draw circles on corners of square
      fourCorners.map((corner) => {
        ctx.beginPath();
        ctx.arc(corner.x, corner.y, 10, 0, 2 * Math.PI);
        ctx.stroke(); // later remove
        // ctx.fill(); // later uncomment
      });

      //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [
    cropImgCanvasRef,
    selectedProfileImage,
    BGWidth,
    BGHeight,
    sXRef.current,
    sYRef.current,
    squareSizeRef.current,
  ]);

  //  following is my plan :
  // - create mouse event handler. there will be these events : mouse down, mouse move, mouse up
  // - in event handler, act differently as where user clicked. these are the actions : move square, resize square, do not any action
  // - in event handler, after changing square's values which are x, y, size, useEffect will act automatically since I set the uesEffect deps array as square's values.
  // - after mouse events finish and user click the "finish" button, crop image as the square's values which user change

  const handleMouseDown = (event: React.MouseEvent) => {
    const clickedX = event.clientX;
    const clickedY = event.clientY;

    // x is a point of inside or outside line space of square
    // and lines are two of left and right
    const xOutsideLeftLine = sXRef.current - lineWidth - 1;
    const xInsideLeftLine = sXRef.current;
    const xOutsideRightLine = sXRef.current + squareSizeRef.current + lineWidth;
    const xInsideRightLine = sXRef.current + squareSizeRef.current - 1;

    // y is a point of inside or outside line space of square
    // and lines are two of top and bottom
    const yOutsideTopLine = sYRef.current - lineWidth - 1;
    const yInsideTopLine = sYRef.current;
    const yOutsideBottomLine = sYRef.current + squareSizeRef.current + lineWidth;
    const yInsideBottomLine = sYRef.current + squareSizeRef.current - 1;

    //
    // the line space is a bit different from display pixel space
    // I will fix it later !!!
    //

    // variables for whether clicked space matches each line spaces or not
    // don't compare three values with "<". if so it is always set of true.
    const isLeftLineForX = xOutsideLeftLine < clickedX && clickedX < xInsideLeftLine;
    const isLeftLineForY = yOutsideTopLine < clickedY && clickedY < yOutsideBottomLine;
    const isLeftLine = isLeftLineForX && isLeftLineForY;

    const isRightLineForX = xInsideRightLine < clickedX && clickedX < xOutsideRightLine;
    const isRightLineForY = yOutsideTopLine < clickedY && clickedY < yOutsideBottomLine;
    const isRightLine = isRightLineForX && isRightLineForY;

    const isTopLineForX = xOutsideLeftLine < clickedX && clickedX < xOutsideRightLine;
    const isTopLineForY = yOutsideTopLine < clickedY && clickedY < yInsideTopLine;
    const isTopLine = isTopLineForX && isTopLineForY;

    const isBottomLineForX = xOutsideLeftLine < clickedX && clickedX < xOutsideRightLine;
    const isBottomLineForY = yInsideBottomLine < clickedY && clickedY < yOutsideBottomLine;
    const isBottomLine = isBottomLineForX && isBottomLineForY;
  };
  return (
    <TranslucentBG
      onClick={() => {
        if (!selectedProfileImage) dispatch(closeModal());
      }}
      ref={BGRef}
    >
      {selectedProfileImage && (
        <CropImageCanvas
          onMouseDown={(event) => handleMouseDown(event)}
          onMouseMove={() => {}}
          onMouseUp={() => {}}
          ref={cropImgCanvasRef}
          aria-label="cut your profile image"
          role="img"
        />
      )}
      {!selectedProfileImage && (
        <ModalBox
          padding="54px 40px"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
          }}
        >
          <ClosingBox isSmallWidth onClick={() => dispatch(closeModal())}>
            <ClosingIcon />
          </ClosingBox>
          <ContentContnr>
            <ProfileImgBox>
              <ProfileImg userImg={selectedProfileImage || loginUserInfo.userImg} />
              <SelectBtnBox isPhoto>
                <SelectBtn isPhoto>수정</SelectBtn>

                <UploadImg
                  type="file"
                  name="myImage"
                  onChange={(event) => {
                    handleProfileImage(event);
                  }}
                />
              </SelectBtnBox>
            </ProfileImgBox>
            <ProfileNameBox>
              <ProfileName type="text" ref={userNameRef} defaultValue={loginUserInfo.userName} />
              <SelectBtn onClick={confirmUserName}>선택</SelectBtn>
            </ProfileNameBox>
            <SelectBtnBox isBG>
              <SelectBtn isBG>
                배경 수정
                {/* 배경 이미지도 요청 시 받아와야 하는군... */}
              </SelectBtn>
              <UploadImg
                type="file"
                name="BGImage"
                onChange={(event) => {
                  if (event && event.target && event.target.files) {
                    setSelectedProfileBGImage(event.target.files[0]);
                  }
                }}
              />
            </SelectBtnBox>
          </ContentContnr>
        </ModalBox>
      )}
    </TranslucentBG>
  );
}
