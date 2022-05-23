import { useEffect, useRef, useState } from "react";
import { useComponentHeight, useComponentWidth } from "utils";
import theme from "assets/styles/theme";
import { useImageHostingMutation } from "store/serverAPIs/imageHosting";

import Spinner from "assets/Spinner";
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
  startPointInCanvas,
} from "./utils/EditProfile.utils";
import formatBytes from "./utils/formatBytes";
import dataURLtoBlob from "./utils/dataURLtoBlob";

interface EditProfileImgProps {
  selectedProfileImage: string;
  setNewProfileImage: React.Dispatch<React.SetStateAction<Blob | undefined>>;
  handleEditingImage: React.Dispatch<React.SetStateAction<boolean>>;
  BGRef: React.RefObject<HTMLDivElement>;
}
export default function EditProfileImg({
  selectedProfileImage,
  setNewProfileImage,
  handleEditingImage,
  BGRef,
}: EditProfileImgProps) {
  const editedImgRef = useRef<Blob>();
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

    // image for canvas' background
    const image = new Image();
    image.src = selectedProfileImage; // it is needed for setting the canvas' width and height

    // crop image
    if (isImageSelected) {
      // create a hidden canvas to draw the image user edited
      const hiddenCanvas = document.createElement("canvas");
      hiddenCanvas.style.display = "none";
      document.body.appendChild(hiddenCanvas);
      hiddenCanvas.width = squareSizeRef.current;
      hiddenCanvas.height = squareSizeRef.current;
      if (!hiddenCanvas) return;
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
      // get data url of image edited and set it as profile image
      // - dataUrl is just representation of base64 not base64
      // - png image is required to get transparent background that is the area outside canvas
      const dataUrlImg = hiddenCanvas.toDataURL("image/png", 1.0);

      const blob = dataURLtoBlob(dataUrlImg);

      const dataCapacity = formatBytes(blob.size);

      // if blob size is smaller than 20MB then host image
      //   but almost images will be smaller than 20MB
      //   because no matter how the image capacity is big
      //   the image will shrink to fit in the canvas as its background image
      if (blob.size <= 2e7) {
        // editedImgRef.current = blob;
        setNewProfileImage(blob);
        handleEditingImage(false); // show profile modal
      } else {
        alert(`20MB 이하로 저장 가능해요! 현재 용량: ${dataCapacity}`);
      }
    }

    // draw canvas for editing image
    image.onload = () => {
      if (isImageSelected) return;

      const canvasRatio = image.width / image.height;

      // canvas width
      canvasWidthRef.current = 500;

      let canvasWidthForSmallBrowser: number | undefined;
      // calculate canvas width : for short width browser
      // (canvas width) + (left and right margin of canvas) + (extra space) > (BG width)
      if (canvasWidthRef.current + 20 + 10 > BGWidth) {
        canvasWidthForSmallBrowser = BGWidth - 20 - 10;
        canvasWidthRef.current = canvasWidthForSmallBrowser;
      }
      // calculate canvas height
      canvasHeightRef.current = canvasWidthRef.current / canvasRatio;

      // show the full size image not just part
      //                          without this code below I can't see the full size image //
      // and make canvas height shorter than BGHeight //
      //   (canvas height) + (canvas bottom margin)
      //         + (top line component height) + (extra space) >= (BGHeight)
      if (canvasHeightRef.current + 10 + 45.5 + 20 > BGHeight) {
        canvasHeightRef.current = BGHeight - 10 - 45.5 - 20;

        // canvas.style.overflowY = "scroll"; // scroll when image height is too long
      }

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

        // set the starting point of square to be centered on canvas
        setSXYinCanvas({
          x: startPointInCanvas(canvas.width, squareSizeRef.current),
          y: startPointInCanvas(canvas.height, squareSizeRef.current),
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
    isImageSelected,
  ]);

  return (
    <CanvasContnr>
      {/* spinner appears when user finished editing image */}
      {/* - right after user selected the image from their device */}
      {/*   if image is too big then image appears slowly */}
      {/*   in that case spinner isn't necessary cause the spinner also appears slowly */}
      {isImageSelected && <Spinner />}

      <BtnUponCanvasContnr>
        <BtnUponCanvas onClick={() => handleEditingImage(false)}>취소</BtnUponCanvas>
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
