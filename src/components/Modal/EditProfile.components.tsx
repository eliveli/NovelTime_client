import theme from "assets/styles/theme";
import { useEffect, useRef, useState } from "react";
import { closeModal } from "store/clientSlices/modalSlice";
import { CheckDeviceType, useComponentHeight, useComponentWidth } from "utils";

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
  BtnUponCanvasContnr,
  BtnUponCanvas,
  CanvasContnr,
  TextForCropImg,
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

  // ref for four vertexes of square   // it is expected to be on line not inside line
  const fourCornersInBGRef = useRef({
    topLeftCorner: { x: 0, y: 0 },
    topRightCorner: { x: 0, y: 0 },
    bottomLeftCorner: { x: 0, y: 0 },
    bottomRightCorner: { x: 0, y: 0 },
  });

  // refs for resizing or moving square
  //   as user first clicks and executes mouse down event
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
  type IsMoving = { x: number; y: number } | undefined;
  const isMovingRef = useRef(undefined as IsMoving);

  // initialize square size and x, y that are square starting point(topLeft point)
  const selectSquareSize = (canvasWidthParam: number, canvasHeightParam: number) =>
    canvasWidthParam > canvasHeightParam ? canvasHeightParam : canvasWidthParam;
  const startPointInBG = (BGWidthOrHeight: number, widthOrHeight: "w" | "h") => {
    if (widthOrHeight === "w") {
      return (
        (BGWidthOrHeight - squareSizeRef.current - 2 * lineWidth - 2 * 10) / 2 + 10 + lineWidth + 1
      ); // add left margin as 10px // starting point is except line width
    }

    return (
      (BGWidthOrHeight - squareSizeRef.current - 2 * lineWidth - 45.5 - 10) / 2 +
      45.5 +
      lineWidth +
      1
    ); // add top line height as 45px
  };

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
    // arrays for confirming to resizing square
    const fourCornerXY = Object.values(fourCornersInBGRef.current);
    const fourCornerName = Object.keys(fourCornersInBGRef.current);
    // check for resizing square
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
    }

    // array for confirming to moving square
    const { topLeftCorner, topRightCorner, bottomLeftCorner } = fourCornersInBGRef.current;

    // check for moving square //
    // it must be located after code lines for checking for resizing square
    // to except for space in square that is included in circle on corner
    //                                  and to resize square in that area
    if (!selectedCornerForResizingRef.current.cornerName) {
      const isBetweenBothX = topLeftCorner.x < clickedX && clickedX < topRightCorner.x;
      const isBetweenBothY = topLeftCorner.y < clickedY && clickedY < bottomLeftCorner.y;

      if (isBetweenBothX && isBetweenBothY) {
        isMovingRef.current = { x: clickedX, y: clickedY };
      }
    }
  }

  // it will be true as clicking the button for selecting image edited
  const [isImageSelected, setImageSelected] = useState(false);

  // set canvas and draw square and circles
  useEffect(() => {
    if (!cropImgCanvasRef.current) return;
    const canvas = cropImgCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = selectedProfileImage;

    // crop image
    if (isImageSelected) {
      // create a hidden canvas to draw the image user edited
      const hiddenCanvas = document.createElement("canvas");
      hiddenCanvas.style.display = "none";
      document.body.appendChild(hiddenCanvas);
      hiddenCanvas.width = squareSizeRef.current;
      hiddenCanvas.height = squareSizeRef.current;
      if (hiddenCanvas) {
        // draw full image in main canvas(just named as "canvas")
        //      because image exists as background not as drawn image
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // draw the image user edited in hidden canvas
        hiddenCanvas
          ?.getContext("2d")
          ?.drawImage(
            canvas,
            sXYinCanvas.x,
            sXYinCanvas.y,
            squareSizeRef.current,
            squareSizeRef.current,
            0,
            0,
            squareSizeRef.current,
            squareSizeRef.current,
          );
      }

      // get data url of image edited
      const imgUrl = hiddenCanvas.toDataURL("image/jpeg", 1.0);
      //   const tempLink = document.createElement("a");
      //   tempLink.download = "downloadName";
      //   //   setSelectedProfileImage(hiddenCanvas.toDataURL("image/jpeg", 1.0));
      //   tempLink.href = hiddenCanvas.toDataURL("image/jpeg", 1.0);
      //   tempLink.click();
    }

    image.onload = () => {
      if (isImageSelected) return;

      // set canvas width, height, x, y to show full size image and center it in screen
      const canvasRatio = image.width / image.height;

      canvasWidthRef.current = 500;

      let canvasWidthForMobile: number | undefined; // it is used in mobile screen sizes
      // canvas width + left and right margin of canvas + extra space > BG width
      if (canvasWidthRef.current + 20 + 10 > BGWidth) {
        canvasWidthForMobile = BGWidth - 20 - 10;
        canvasWidthRef.current = canvasWidthForMobile;
      }
      canvasHeightRef.current = canvasWidthRef.current / canvasRatio;

      // set canvas width and height
      // : do not use property "style.width" and "style.height"
      //   that mismatch with display pixel size
      canvas.width = canvasWidthRef.current;
      canvas.height = canvasHeightRef.current;
      canvas.style.backgroundImage = `url(${selectedProfileImage})`; // set image as background
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

        setSXYinBG({ x: startPointInBG(BGWidth, "w"), y: startPointInBG(BGHeight, "h") });
        if (canvasWidthForMobile !== undefined) {
          setSXYinBG({ x: startPointInBG(BGWidth, "w"), y: startPointInBG(BGHeight, "h") });
        }

        setSXYinCanvas({
          x: lineWidth,
          y: lineWidth,
        });
      }

      // draw square
      ctx.strokeRect(sXYinCanvas.x, sXYinCanvas.y, squareSizeRef.current, squareSizeRef.current);

      // set four circles' location in BG
      calcFourCornersInBG();

      // set four circles on square corners in canvas
      const fourCornersInCanvas = calcFourCornersInCanvas();

      ctx.fillStyle = theme.color.main;

      // draw circles on square corners
      fourCornersInCanvas.map((corner) => {
        ctx.beginPath();
        ctx.arc(corner.x, corner.y, circleRadius, 0, 2 * Math.PI);
        // ctx.stroke();
        ctx.fill();
      });
    };
  }, [
    cropImgCanvasRef,
    selectedProfileImage,
    BGWidth,
    BGHeight,
    sXYinBG,
    sXYinCanvas,
    squareSizeRef.current,
    isImageSelected,
  ]);

  const handleMouseDown = (event: React.MouseEvent) => {
    const clickedX = event.clientX;
    const clickedY = event.clientY;

    // to resize square  get the circle spaces on four corners of square
    // to move square  set the boolean value
    checkPoint(clickedX, clickedY);
  };
  const handleMouseMove = (event: React.MouseEvent) => {
    const movedX = event.clientX;
    const movedY = event.clientY;

    // move square
    if (isMovingRef.current) {
      const { x, y } = isMovingRef.current;
      const distanceXMoving = movedX - x;
      const distanceYMoving = movedY - y;
      setSXYinBG({ x: sXYinBG.x + distanceXMoving, y: sXYinBG.y + distanceYMoving });
      setSXYinCanvas({
        x: sXYinCanvas.x + distanceXMoving,
        y: sXYinCanvas.y + distanceYMoving,
      });
      isMovingRef.current.x += distanceXMoving;
      isMovingRef.current.y += distanceYMoving;
      return;
    }

    // resize square
    const { cornerName, cornerXY } = selectedCornerForResizingRef.current;

    const distanceX = movedX - cornerXY.x;
    const distanceY = movedY - cornerXY.y;

    //  absolute value
    const absOfDistanceX = Math.abs(distanceX);
    const absOfDistanceY = Math.abs(distanceY);

    // greater number between absolute value of distanceX and absolute value of distanceY
    const selectedDistance = absOfDistanceX > absOfDistanceY ? absOfDistanceX : absOfDistanceY;

    //
    // except for other cases that seems to trying to make rectangle not square
    //
    // case 1. topLeftCorner is clicked
    if (cornerName && cornerName === "topLeftCorner") {
      // case 1-1. mouse moves to right and down and square shrinks
      if (distanceX > 0 && distanceY >= 0) {
        setSXYinBG({ x: sXYinBG.x + selectedDistance, y: sXYinBG.y + selectedDistance });
        setSXYinCanvas({
          x: sXYinCanvas.x + selectedDistance,
          y: sXYinCanvas.y + selectedDistance,
        });
        //
        squareSizeRef.current -= selectedDistance;

        // add distance to top left corner x, y
        // to get corner x, y that has changed right before when keeping mouse move event on
        selectedCornerForResizingRef.current.cornerXY = {
          x: cornerXY.x + selectedDistance,
          y: cornerXY.y + selectedDistance,
        };
      }
      // case 1-2. mouse moves to left and up and square expands
      if (distanceX <= 0 && distanceY < 0) {
        setSXYinBG({ x: sXYinBG.x - selectedDistance, y: sXYinBG.y - selectedDistance });
        setSXYinCanvas({
          x: sXYinCanvas.x - selectedDistance,
          y: sXYinCanvas.y - selectedDistance,
        });
        //
        squareSizeRef.current += selectedDistance;

        // remove distance from top left corner x, y
        // to get corner x, y that has changed right before when keeping mouse move event on
        selectedCornerForResizingRef.current.cornerXY = {
          x: cornerXY.x - selectedDistance,
          y: cornerXY.y - selectedDistance,
        };
      }
    }

    // case 2. topRightCorner is clicked
    if (cornerName && cornerName === "topRightCorner") {
      // case 2-1. mouse moves to right and up and square expands
      if (distanceX > 0 && distanceY < 0) {
        // set x, y of square starting point not top right corner
        setSXYinBG({ x: sXYinBG.x, y: sXYinBG.y - selectedDistance });
        setSXYinCanvas({
          x: sXYinCanvas.x,
          y: sXYinCanvas.y - selectedDistance,
        });
        //
        squareSizeRef.current += selectedDistance;

        // add or remove distance to or from top right corner x, y
        // to get corner x, y that has changed right before when keeping mouse move event on
        selectedCornerForResizingRef.current.cornerXY = {
          x: cornerXY.x + selectedDistance,
          y: cornerXY.y - selectedDistance,
        };
      }
      // case 2-2. mouse moves to left and down and square shrinks
      if (distanceX < 0 && distanceY > 0) {
        // set x, y of square starting point not top right corner
        // (and this is the same as others below)
        setSXYinBG({ x: sXYinBG.x, y: sXYinBG.y + selectedDistance });
        setSXYinCanvas({
          x: sXYinCanvas.x,
          y: sXYinCanvas.y + selectedDistance,
        });
        //
        squareSizeRef.current -= selectedDistance;

        // add or remove distance to or from top right corner x, y
        // to get corner x, y that has changed right before when keeping mouse move event on
        selectedCornerForResizingRef.current.cornerXY = {
          x: cornerXY.x - selectedDistance,
          y: cornerXY.y + selectedDistance,
        };
      }
    }

    // case 3. bottomLeftCorner is clicked
    if (cornerName && cornerName === "bottomLeftCorner") {
      // case 3-1. mouse moves to right and up and square shrinks
      if (distanceX > 0 && distanceY < 0) {
        // set x, y of square starting point not bottom left corner
        setSXYinBG({ x: sXYinBG.x + selectedDistance, y: sXYinBG.y });
        setSXYinCanvas({
          x: sXYinCanvas.x + selectedDistance,
          y: sXYinCanvas.y,
        });
        //
        squareSizeRef.current -= selectedDistance;

        // add or remove distance to or from bottom left corner x, y
        // to get corner x, y that has changed right before when keeping mouse move event on
        selectedCornerForResizingRef.current.cornerXY = {
          x: cornerXY.x + selectedDistance,
          y: cornerXY.y - selectedDistance,
        };
      }
      // case 3-2. mouse moves to left and down and square expands
      if (distanceX < 0 && distanceY > 0) {
        // set x, y of square starting point not bottom left corner
        setSXYinBG({ x: sXYinBG.x - selectedDistance, y: sXYinBG.y });
        setSXYinCanvas({
          x: sXYinCanvas.x - selectedDistance,
          y: sXYinCanvas.y,
        });
        //
        squareSizeRef.current += selectedDistance;

        // add or remove distance to or from bottom left corner x, y
        // to get corner x, y that has changed right before when keeping mouse move event on
        selectedCornerForResizingRef.current.cornerXY = {
          x: cornerXY.x - selectedDistance,
          y: cornerXY.y + selectedDistance,
        };
      }
    }

    // case 4. bottomRightCorner is clicked
    if (cornerName && cornerName === "bottomRightCorner") {
      // case 4-1. mouse moves to right and down and square expands
      if (distanceX > 0 && distanceY > 0) {
        // set x, y of square starting point not bottom right corner
        // it is the same as before but must be set to execute useEffect
        setSXYinBG({ x: sXYinBG.x, y: sXYinBG.y });
        setSXYinCanvas({
          x: sXYinCanvas.x,
          y: sXYinCanvas.y,
        });
        //
        squareSizeRef.current += selectedDistance;

        // add or remove distance to or from bottom right corner x, y
        // to get corner x, y that has changed right before when keeping mouse move event on
        selectedCornerForResizingRef.current.cornerXY = {
          x: cornerXY.x + selectedDistance,
          y: cornerXY.y + selectedDistance,
        };
      }
      // case 4-2. mouse moves to left and up and square shrinks
      if (distanceX < 0 && distanceY < 0) {
        // set x, y of square starting point not bottom right corner
        // it is the same as before but must be set to execute useEffect
        setSXYinBG({ x: sXYinBG.x, y: sXYinBG.y });
        setSXYinCanvas({
          x: sXYinCanvas.x,
          y: sXYinCanvas.y,
        });
        //
        squareSizeRef.current -= selectedDistance;

        // add or remove distance to or from bottom right corner x, y
        // to get corner x, y that has changed right before when keeping mouse move event on
        selectedCornerForResizingRef.current.cornerXY = {
          x: cornerXY.x - selectedDistance,
          y: cornerXY.y - selectedDistance,
        };
      }
    }
  };

  const handleMouseUp = () => {
    // stop resizing or moving
    selectedCornerForResizingRef.current.cornerName = undefined;
    isMovingRef.current = undefined;
  };

  return (
    <TranslucentBG
      onClick={() => {
        dispatch(closeModal());
      }}
      ref={BGRef}
    >
      {/* edit image on desktop not on mobile or tablet where canvas can't work */}
      {selectedProfileImage && CheckDeviceType() === "desktop" && (
        <CanvasContnr
          // prevent modal from being closed as clicking
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
          }}
        >
          <BtnUponCanvasContnr>
            <BtnUponCanvas onClick={() => dispatch(closeModal())}>취소</BtnUponCanvas>
            <TextForCropImg>이미지를 잘라 주세요</TextForCropImg>
            <BtnUponCanvas onClick={() => setImageSelected(true)}>선택</BtnUponCanvas>
          </BtnUponCanvasContnr>
          <CropImageCanvas
            onMouseDown={(event) => handleMouseDown(event)}
            onMouseMove={(event) => handleMouseMove(event)}
            onMouseUp={() => handleMouseUp()}
            ref={cropImgCanvasRef}
            aria-label="cut your profile image"
            role="img"
          />
        </CanvasContnr>
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
