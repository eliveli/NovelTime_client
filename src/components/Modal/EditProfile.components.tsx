import { useEffect, useRef, useState } from "react";
import { useComponentHeight, useComponentWidth } from "utils";
import theme from "assets/styles/theme";
import { closeModal } from "store/clientSlices/modalSlice";
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
  useAsyncState,
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
  const [sXYinBG, setSXYinBG] = useState({ x: 0, y: 0 }); // except for line width;
  const [sXYinCanvas, setSXYinCanvas] = useState({ x: 0, y: 0 }); // except for line width
  //
  // square size.
  // it needs to work like synchronous
  // so that other setStates read the synchronous square size value     //
  const { squareSize, setSquareSize } = useAsyncState(-1);

  const circleRadius = 10;

  // state for resizing or moving square
  //   as user first clicks and executes mouse down event
  type CornerName =
    | "topLeftCorner"
    | "topRightCorner"
    | "bottomLeftCorner"
    | "bottomRightCorner"
    | undefined;
  const [selectedCornerForResizing, handleSelectedCornerForResizing] = useState({
    cornerName: undefined as CornerName,
    cornerXY: { x: 0, y: 0 },
  });

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
      hiddenCanvas.width = squareSize;
      hiddenCanvas.height = squareSize;
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
            squareSize,
            squareSize,
            0,
            0,
            squareSize,
            squareSize,
          );
      }

      // get data url of image edited and set it as profile image
      setSelectedProfileImage(hiddenCanvas.toDataURL("image/jpeg", 1.0));
    }

    image.onload = async () => {
      if (isImageSelected) return;

      // set canvas width, height, x, y to show full size image and center it in screen
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

      if (squareSize === -1) {
        // squareSize have to be changed synchronously
        // so that other setStates like sXinBG and sYinBG read the changed squareSize value
        await setSquareSize(calcSquareSize(canvas.width, canvas.height, lineWidth));
        setSXYinBG({
          x: startPointInBG(BGWidth, "w", squareSize, lineWidth),
          y: startPointInBG(BGHeight, "h", squareSize, lineWidth),
        });
        if (canvasWidthForSmallBrowser !== undefined) {
          setSXYinBG({
            x: startPointInBG(BGWidth, "w", squareSize, lineWidth),
            y: startPointInBG(BGHeight, "h", squareSize, lineWidth),
          });
        }

        setSXYinCanvas({
          x: lineWidth,
          y: lineWidth,
        });
      }

      // draw square
      ctx.strokeRect(sXYinCanvas.x, sXYinCanvas.y, squareSize, squareSize);

      // set four circles' location in BG
      calcFourCornersInBG(sXYinBG, squareSize, handleFourCornersInBG);

      // set four circles on square corners in canvas
      const fourCornersInCanvas = calcFourCornersInCanvas({
        sXYinCanvas,
        squareSize,
      });

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
    squareSize,
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
            selectedCornerForResizing,
            handleSelectedCornerForResizing,
            handleMoving,
          )
        }
        onMouseMove={async (event) =>
          handleMouseMove(
            event,
            setSXYinBG,
            setSXYinCanvas,
            sXYinBG,
            sXYinCanvas,
            squareSize,
            setSquareSize,
            selectedCornerForResizing,
            handleSelectedCornerForResizing,
            isMoving,
            handleMoving,
          )
        }
        onMouseUp={() =>
          handleMouseUp(selectedCornerForResizing, handleSelectedCornerForResizing, handleMoving)
        }
        ref={cropImgCanvasRef}
        aria-label="cut your profile image"
        role="img"
      />
    </CanvasContnr>
  );
}
