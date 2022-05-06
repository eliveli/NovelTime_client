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
  // get BG width and height to size canvas
  const BGRef = useRef<HTMLDivElement>(null);
  const BGWidth = useComponentWidth(BGRef);
  const BGHeight = useComponentHeight(BGRef);

  // canvas
  const cropImgCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWidthRef = useRef(0);
  const canvasHeightRef = useRef(0);
  //
  const lineWidth = 2;

  // useState is required for putting values in useEffect deps array   //
  // when I created the vars by useRef and put them in deps array,     //
  // useEffect didn't work again as the values changed                 //
  // so I changed as below by using useState                           //
  //
  // starting point x, y in BG and in Canvas
  const [sXYinBG, setSXYinBG] = useState({ x: 0, y: 0 }); // except for line width

  //
  const [sXYinCanvas, setSXYinCanvas] = useState({ x: 0, y: 0 }); // except for line width
  //
  // square size.
  // it needs to be created by useRef                                   //
  // so that other setStates read the synchronous square size value     //
  const squareSizeRef = useRef(-1);

  // refs for initial x, y in BG and in Canvas
  const initialSXinBGRef = useRef(0);
  const initialSYinBGRef = useRef(0);
  const initialSXinCanvasRef = useRef(0);
  const initialSYinCanvasRef = useRef(0);

  // ref for four vertexes of square   // it is expected to be on line not inside line
  const fourCornersInBGRef = useRef({
    topLeftCorner: { x: 0, y: 0 },
    topRightCorner: { x: 0, y: 0 },
    bottomLeftCorner: { x: 0, y: 0 },
    bottomRightCorner: { x: 0, y: 0 },
  });

  // ref for handling mouse event
  type CornerName =
    | "topLeftCorner"
    | "topRightCorner"
    | "bottomLeftCorner"
    | "bottomRightCorner"
    | undefined;
  const selectedCornerForResizingRef = useRef({
    cornerName: undefined as CornerName,
    cornerXY: { x: 0, y: 0 },
  });
  // initialize square size and x, y that are square starting point(topLeft point)
  const selectSquareSize = (canvasWidthParam: number, canvasHeightParam: number) =>
    canvasWidthParam > canvasHeightParam ? canvasHeightParam : canvasWidthParam;
  const startPointInCanvas = (
    canvasWidthParam: number,
    canvasHeightParam: number,
    selectWidthOrHeight: "w" | "h",
  ) => {
    const SquareSizeWithLine = selectSquareSize(canvasWidthParam, canvasHeightParam);
    const widthOrHeight = selectWidthOrHeight === "w" ? canvasWidthParam : canvasHeightParam;
    return SquareSizeWithLine === widthOrHeight
      ? lineWidth
      : (widthOrHeight - SquareSizeWithLine) / 2 + lineWidth;
    // squareSize will be changed synchronously
    // and other setState will read the changed value directly
  };
  const startPointInBG = (BGWidthOrHeight: number) =>
    (BGWidthOrHeight - squareSizeRef.current - 2 * lineWidth) / 2;

  const calcSquareSize = (canvasWidthParam: number, canvasHeightParam: number) =>
    selectSquareSize(canvasWidthParam, canvasHeightParam) - 2 * lineWidth;

  // calculate four corners of square in BG //
  //   the value is not exact cause as I see
  //   it is not exactly divided into square line and inside-square...
  //   I need more information about this, but I'm not sure whether it can be or not...
  const calcTopLeftCornerInBG = () => ({ x: sXYinBG.x - 1, y: sXYinBG.y - 1 });
  const calcTopRightCornerInBG = () => ({
    x: sXYinBG.x + squareSizeRef.current,
    y: sXYinBG.y - 1,
  });
  const calcBottomLeftCornerInBG = () => ({
    x: sXYinBG.x - 1,
    y: sXYinBG.y + squareSizeRef.current,
  });
  const calcBottomRightCornerInBG = () => ({
    x: sXYinBG.x + squareSizeRef.current,
    y: sXYinBG.y + squareSizeRef.current,
  });

  const calcFourCornersInBG = () => {
    const fourCornersInBG = fourCornersInBGRef.current;
    fourCornersInBG.topLeftCorner = calcTopLeftCornerInBG();
    fourCornersInBG.topRightCorner = calcTopRightCornerInBG();
    fourCornersInBG.bottomLeftCorner = calcBottomLeftCornerInBG();
    fourCornersInBG.bottomRightCorner = calcBottomRightCornerInBG();
  };

  // calculate four corners of square
  // store them in BG and return them in Canvas
  const calcFourCornersInCanvas = () => {
    const fourCornersInCanvas = [
      { x: sXYinCanvas.x - 1, y: sXYinCanvas.y - 1 },
      {
        x: sXYinCanvas.x + squareSizeRef.current,
        y: sXYinCanvas.y - 1,
      },
      { x: sXYinCanvas.x - 1, y: sXYinCanvas.y + squareSizeRef.current },
      {
        x: sXYinCanvas.x + squareSizeRef.current,
        y: sXYinCanvas.y + squareSizeRef.current,
      },
    ];

    return fourCornersInCanvas;
  };

  const circleRadius = 10;

  // check whether the point user clicked is inside circle on corner of square
  function checkPoint(clickedX: number, clickedY: number) {
    const fourCornerXY = Object.values(fourCornersInBGRef.current);
    const fourCornerName = Object.keys(fourCornersInBGRef.current);

    for (let i = 0; i < fourCornerXY.length; i += 1) {
      const centerOfCircle = fourCornerXY[i];
      const distPoints =
        (clickedX - centerOfCircle.x) * (clickedX - centerOfCircle.x) +
        (clickedY - centerOfCircle.y) * (clickedY - centerOfCircle.y);
      const radiusSquared = circleRadius * circleRadius;

      if (distPoints < radiusSquared) {
        selectedCornerForResizingRef.current = {
          cornerName: fourCornerName[i] as CornerName,
          cornerXY: centerOfCircle,
        };
        break;
      }
      console.log("fourCornerXY:", fourCornerXY);
    }
  }

  // set canvas and draw square and circles
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
      canvasWidthRef.current = BGWidth;
      canvasHeightRef.current = canvasWidthRef.current / canvasRatio;
      if (canvasHeightRef.current > BGHeight) {
        canvasHeightRef.current = BGHeight;
        canvasWidthRef.current = canvasHeightRef.current * canvasRatio;
      }
      const xOffset = canvasWidthRef.current < BGWidth ? (BGWidth - canvasWidthRef.current) / 2 : 0;
      const yOffset =
        canvasHeightRef.current < BGHeight ? (BGHeight - canvasHeightRef.current) / 2 : 0;

      canvas.style.top = `${yOffset}px`;
      canvas.style.left = `${xOffset}px`;

      // set canvas width and height
      // : do not use property "style.width" and "style.height"
      //   that mismatch with display pixel size
      canvas.width = canvasWidthRef.current;
      canvas.height = canvasHeightRef.current;
      canvas.style.backgroundImage = `url(${selectedProfileImage})`; // set image as background

      // crop image
      //   ctx.drawImage(image, xOffset, yOffset, newWidth, newHeight);

      // initiate square centered in canvas
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = theme.color.mainLight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (squareSizeRef.current === -1) {
        // squareSize will be changed synchronously
        // so that other setStates like sXinBG and sYinBG read the changed squareSize value
        // for this reason I created squareSize by useRef
        // if squareSize is created by useState
        // other setStates read squareSize as its previous value that didn't be changed yet
        squareSizeRef.current = calcSquareSize(canvas.width, canvas.height);

        setSXYinBG({ x: startPointInBG(BGWidth), y: startPointInBG(BGHeight) });

        setSXYinCanvas({
          x: startPointInCanvas(canvasWidthRef.current, canvasHeightRef.current, "w"),
          y: startPointInCanvas(canvasWidthRef.current, canvasHeightRef.current, "h"),
        });

        // store initial x, y as them in BG and them in Canvas
        initialSXinBGRef.current = startPointInBG(BGWidth);
        initialSYinBGRef.current = startPointInBG(BGHeight);
        initialSXinCanvasRef.current = startPointInCanvas(
          canvasWidthRef.current,
          canvasHeightRef.current,
          "w",
        );
        initialSYinCanvasRef.current = startPointInCanvas(
          canvasWidthRef.current,
          canvasHeightRef.current,
          "h",
        );
      }

      // draw square
      ctx.strokeRect(sXYinCanvas.x, sXYinCanvas.y, squareSizeRef.current, squareSizeRef.current);

      // set four circles' location in BG
      calcFourCornersInBG();

      // set four circles on square corners in canvas
      const fourCornersInCanvas = calcFourCornersInCanvas();

      // draw circles on square corners
      fourCornersInCanvas.map((corner) => {
        ctx.beginPath();
        ctx.arc(corner.x, corner.y, circleRadius, 0, 2 * Math.PI);
        ctx.stroke(); // later remove
        // ctx.fill(); // later uncomment
      });
    };
  }, [
    cropImgCanvasRef,
    selectedProfileImage,
    BGWidth,
    BGHeight,
    sXYinBG,

    sXYinCanvas.x,
    sXYinCanvas.y,
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
    const xOutsideLeftLine = sXYinBG.x - lineWidth - 1;
    const xInsideLeftLine = sXYinBG.x;
    const xOutsideRightLine = sXYinBG.x + squareSizeRef.current + lineWidth;
    const xInsideRightLine = sXYinBG.x + squareSizeRef.current - 1;

    // y is a point of inside or outside line space of square
    // and lines are two of top and bottom
    const yOutsideTopLine = sXYinBG.y - lineWidth - 1;
    const yInsideTopLine = sXYinBG.y;
    const yOutsideBottomLine = sXYinBG.y + squareSizeRef.current + lineWidth;
    const yInsideBottomLine = sXYinBG.y + squareSizeRef.current - 1;

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

    // resize square
    // get the circle spaces on four corners of square
    checkPoint(clickedX, clickedY);
  };
  const handleMouseMove = (event: React.MouseEvent) => {
    // resize square
    const { cornerName, cornerXY } = selectedCornerForResizingRef.current;

    // case 1. topLeftCorner is clicked
    if (cornerName && cornerName === "topLeftCorner") {
      const movedX = event.clientX;
      const movedY = event.clientY;

      const distanceX = movedX - cornerXY.x;
      const distanceY = movedY - cornerXY.y;

      // greater number between distanceX and distanceY
      const selectedDistance = distanceX > distanceY ? distanceX : distanceY;
      // case 1-1. mouse is moved to right and down and square shrinks
      if (distanceX > 0 && distanceY > 0) {
        setSXYinBG({ x: sXYinBG.x + selectedDistance, y: sXYinBG.y + selectedDistance });
        // setSXinCanvas(sXYinCanvas.x + selectedDistance);
        // setSYinCanvas(sXYinCanvas.y + selectedDistance);
        setSXYinCanvas({
          x: sXYinCanvas.x + selectedDistance,
          y: sXYinCanvas.y + selectedDistance,
        });
        //
        squareSizeRef.current -= selectedDistance;
      }
    }
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    // stop resizing
    selectedCornerForResizingRef.current.cornerName = undefined;
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
          onMouseMove={(event) => handleMouseMove(event)}
          onMouseUp={(event) => handleMouseUp(event)}
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
