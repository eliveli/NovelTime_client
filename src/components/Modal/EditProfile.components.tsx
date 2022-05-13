import { useEffect, useRef, useState } from "react";
import { useComponentHeight, useComponentWidth } from "utils";
import theme from "assets/styles/theme";
import { closeModal } from "store/clientSlices/modalSlice";
import { useImageHostingMutation } from "store/serverAPIs/imageHosting";
import { useAppDispatch } from "../../store/hooks";

import {
  CropImageCanvas,
  BtnUponCanvasContnr,
  BtnUponCanvas,
  CanvasContnr,
  TextForCropImg,
} from "./Modal.styles";

import {
  calcFourCornersInBG,
  calcFourCornersInCanvas,
  calcSquareSize,
  startPointInBG,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from "./utils/EditProfile.utils";

interface EditProfileImgProps {
  selectedProfileImage: string;
  setSelectedProfileImage: React.Dispatch<React.SetStateAction<string>>;
  BGRef: React.RefObject<HTMLDivElement>;
}
export default function EditProfileImg({
  selectedProfileImage,
  setSelectedProfileImage,
  BGRef,
}: EditProfileImgProps) {
  const dispatch = useAppDispatch();
  // image hosting on imgur after finishing editing the profile image
  const [ImageHosting, { isLoading, data, error }] = useImageHostingMutation();
  const handleImageHosting = async () => {
    if (selectedProfileImage) {
      const formData = new FormData();
      const imageBase64 = selectedProfileImage.split(",")[1];

      // const array = [];
      // for (let i = 0; i < imageBase64.length; i += 1) {
      //   array.push(imageBase64.charCodeAt(i));
      // }
      // const imageFile = new Blob([new Uint8Array(array)], { type: "image/jpeg" });

      // const imageForHosting = selectedProfileImage.replace("image/jpeg", "image/octet-stream");

      formData.append("image", imageBase64);

      console.log("formData:", formData);
      console.log("imageDataUrl:", selectedProfileImage);
      // console.log("imageForHosting:", imageForHosting);
      console.log("imageBase64:", imageBase64);
      // console.log("imageFile:", imageFile);

      await ImageHosting(formData);
      // .then((data) => data.json())
      // .then((data) => {
      //   console.log("image link from imgur : ", data.data.link);
      // });
    }
    // 에러 처리도 하자
    console.log("after requesting image hosting, isLoading:", isLoading);
    console.log("after requesting image hosting, data:", data);
    console.log("after requesting image hosting, error:", error);
  };

  // get BG width and height to size canvas
  const BGWidth = useComponentWidth(BGRef);
  const BGHeight = useComponentHeight(BGRef);

  // canvas
  const cropImgCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWidthRef = useRef(0);
  const canvasHeightRef = useRef(0);
  //
  const lineWidth = 2;
  // starting point x, y in BG and in Canvas
  // useState is required for putting values in useEffect deps array //
  const [sXYinBG, setSXYinBG] = useState({ x: 0, y: 0 }); // except for line width
  const [sXYinCanvas, setSXYinCanvas] = useState({ x: 0, y: 0 }); // except for line width
  //
  // square size.
  // it needs to work like synchronous
  // so that other setStates read the synchronous square size value     //
  const squareSizeRef = useRef(-1);

  // create function to save value in useRef.current and pass this to event handler
  // because useRef can't be passed to function parameter directly
  const changeSquareSize = (size: number) => {
    squareSizeRef.current = size;
  };

  const circleRadius = 10;

  // value for resizing or moving square
  //   as user first clicks and executes mouse down event
  type CornerName =
    | "topLeftCorner"
    | "topRightCorner"
    | "bottomLeftCorner"
    | "bottomRightCorner"
    | undefined;
  type TypeForChangeSelectedCornerForResizing = {
    cornerName: CornerName;
    cornerXY: { x: number; y: number };
  };
  const selectedCornerForResizingRef = useRef({
    cornerName: undefined as CornerName,
    cornerXY: { x: 0, y: 0 },
  });
  const changeSelectedCornerForResizing = ({
    cornerName,
    cornerXY,
  }: TypeForChangeSelectedCornerForResizing) => {
    selectedCornerForResizingRef.current = {
      cornerName,
      cornerXY,
    };
  };

  type IsMoving = { x: number; y: number } | undefined;
  const [isMoving, handleMoving] = useState(undefined as IsMoving);

  // four vertexes of square   // it is expected to be on line not inside line
  const [fourCornersInBG, handleFourCornersInBG] = useState({
    topLeftCorner: { x: 0, y: 0 },
    topRightCorner: { x: 0, y: 0 },
    bottomLeftCorner: { x: 0, y: 0 },
    bottomRightCorner: { x: 0, y: 0 },
  });

  // it will be true as clicking the button for saving image edited
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

      // get data url of image edited and set it as profile image
      setSelectedProfileImage(hiddenCanvas.toDataURL("image/jpeg", 1.0));
      handleImageHosting();
    }

    image.onload = () => {
      if (isImageSelected) return;

      const canvasRatio = image.width / image.height;

      canvasWidthRef.current = 500;

      let canvasWidthForSmallBrowser: number | undefined;
      // canvas width + left and right margin of canvas + extra space > BG width
      if (canvasWidthRef.current + 20 + 10 > BGWidth) {
        canvasWidthForSmallBrowser = BGWidth - 20 - 10;
        canvasWidthRef.current = canvasWidthForSmallBrowser;
      }
      canvasHeightRef.current = canvasWidthRef.current / canvasRatio;

      // set canvas width and height
      // : do not use property "style.width" and "style.height"
      //   that mismatch with display pixel size
      canvas.width = canvasWidthRef.current;
      canvas.height = canvasHeightRef.current;
      canvas.style.backgroundImage = `url(${selectedProfileImage})`; // set image as background

      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = theme.color.mainLight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // initiate square on canvas //
      //  --following code line " canvasWidthRef.current > 0 " is required
      //  --because the code " canvasWidthRef.current = 500 " above doesn't execute at first
      if (canvasWidthRef.current > 0 && squareSizeRef.current === -1) {
        // squareSize have to be changed synchronously
        // so that other setStates like sXinBG and sYinBG read the changed squareSize value
        squareSizeRef.current = calcSquareSize(canvas.width, canvas.height, lineWidth);
        setSXYinBG({
          x: startPointInBG(BGWidth, "w", squareSizeRef.current, lineWidth),
          y: startPointInBG(BGHeight, "h", squareSizeRef.current, lineWidth),
        });
        if (canvasWidthForSmallBrowser !== undefined) {
          setSXYinBG({
            x: startPointInBG(BGWidth, "w", squareSizeRef.current, lineWidth),
            y: startPointInBG(BGHeight, "h", squareSizeRef.current, lineWidth),
          });
        }

        setSXYinCanvas({
          x: lineWidth,
          y: lineWidth,
        });
      }

      // draw square
      ctx.strokeRect(sXYinCanvas.x, sXYinCanvas.y, squareSizeRef.current, squareSizeRef.current);

      // set four circles' location in BG
      calcFourCornersInBG(sXYinBG, squareSizeRef.current, handleFourCornersInBG);

      // set four circles on square corners in canvas
      const fourCornersInCanvas = calcFourCornersInCanvas(sXYinCanvas, squareSizeRef.current);

      ctx.fillStyle = theme.color.main;

      // draw circles on square corners
      fourCornersInCanvas.map((corner) => {
        ctx.beginPath();
        ctx.arc(corner.x, corner.y, circleRadius, 0, 2 * Math.PI);
        ctx.fill(); // ctx.stroke();
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

  return (
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
        onMouseDown={(event) =>
          handleMouseDown(
            event,
            circleRadius,
            fourCornersInBG,
            changeSelectedCornerForResizing,
            handleMoving,
          )
        }
        onMouseMove={(event) =>
          handleMouseMove(
            event,
            setSXYinBG,
            setSXYinCanvas,
            sXYinBG,
            sXYinCanvas,
            squareSizeRef.current,
            changeSquareSize,
            selectedCornerForResizingRef.current,
            changeSelectedCornerForResizing,
            isMoving,
            handleMoving,
          )
        }
        onMouseUp={() =>
          handleMouseUp(
            selectedCornerForResizingRef.current,
            changeSelectedCornerForResizing,
            handleMoving,
          )
        }
        ref={cropImgCanvasRef}
        aria-label="cut your profile image"
        role="img"
      />
    </CanvasContnr>
  );
}
