import {
  CornerName,
  TypeFourCornersInBG,
  TypeHandleFourCornersInBG,
  TypeHandleMoving,
  TypeForChangeSelectedCornerForResizing,
  TypeIsMoving,
  TypeSXY,
  TypeSetSXY,
} from "./EditProfile.utils.types";
// check whether the point user clicked is inside circle on square corners
export function checkPoint(
  clickedX: number,
  clickedY: number,
  circleRadius: number,
  fourCornersInBG: TypeFourCornersInBG,
  changeSelectedCornerForResizing: ({
    cornerName,
    cornerXY,
  }: TypeForChangeSelectedCornerForResizing) => void,
  handleMoving: TypeHandleMoving,
) {
  // arrays for confirming to resizing square
  const fourCornerXY = Object.values(fourCornersInBG);
  const fourCornerName = Object.keys(fourCornersInBG);

  // if it will be true the code moving square below will be skipped
  let isResizing = false;

  // check for resizing square
  for (let i = 0; i < fourCornerXY.length; i += 1) {
    const centerOfCircle = fourCornerXY[i];
    const distPoints =
      (clickedX - centerOfCircle.x) * (clickedX - centerOfCircle.x) +
      (clickedY - centerOfCircle.y) * (clickedY - centerOfCircle.y);
    const radiusSquared = circleRadius * circleRadius;

    if (distPoints < radiusSquared) {
      changeSelectedCornerForResizing({
        cornerName: fourCornerName[i] as CornerName,
        cornerXY: centerOfCircle,
      });
      isResizing = true;
      break;
    }
  }

  // array for confirming to move square
  const { topLeftCorner, topRightCorner, bottomLeftCorner } = fourCornersInBG;

  // check for moving square //
  // it must be located after code lines checking for resizing square
  // to except for space in square that is included in circle on corner
  //                                  and to resize square in that area
  if (!isResizing) {
    const isBetweenBothX = topLeftCorner.x < clickedX && clickedX < topRightCorner.x;
    const isBetweenBothY = topLeftCorner.y < clickedY && clickedY < bottomLeftCorner.y;

    if (isBetweenBothX && isBetweenBothY) {
      handleMoving({ x: clickedX, y: clickedY });
    }
  }
}

// initialize square size and x, y that are square starting point(topLeft point)
export const selectSquareSize = (canvasWidthParam: number, canvasHeightParam: number) =>
  canvasWidthParam > canvasHeightParam ? canvasHeightParam : canvasWidthParam;
export const startPointInBG = (
  BGWidthOrHeight: number,
  widthOrHeight: "w" | "h",
  squareSize: number,
  lineWidth: number,
) => {
  if (widthOrHeight === "w") {
    return (BGWidthOrHeight - squareSize - 2 * lineWidth - 2 * 10) / 2 + 10 + lineWidth + 1;
    // add left margin as 10px // starting point is except line width
  }

  return (BGWidthOrHeight - squareSize - 2 * lineWidth - 45.5 - 10) / 2 + 45.5 + lineWidth + 1;
  // add top line height as 45.5px
};

export const calcSquareSize = (
  canvasWidthParam: number,
  canvasHeightParam: number,
  lineWidth: number,
) => selectSquareSize(canvasWidthParam, canvasHeightParam) - 2 * lineWidth;
// calculate four corners of square in BG //
//   the value is not exact
//   it seems not to be exactly divided into square line and inside-square
//   so there might be a bit margin error when calculating the points but it's not a big issue
export const calcFourCornersInBG = (
  sXYinBG: TypeSXY,
  squareSize: number,
  handleFourCornersInBG: TypeHandleFourCornersInBG,
) => {
  const topLeftCorner = { x: sXYinBG.x - 1, y: sXYinBG.y - 1 };
  const topRightCorner = {
    x: sXYinBG.x + squareSize,
    y: sXYinBG.y - 1,
  };
  const bottomLeftCorner = {
    x: sXYinBG.x - 1,
    y: sXYinBG.y + squareSize,
  };
  const bottomRightCorner = {
    x: sXYinBG.x + squareSize,
    y: sXYinBG.y + squareSize,
  };
  handleFourCornersInBG({
    topLeftCorner,
    topRightCorner,
    bottomLeftCorner,
    bottomRightCorner,
  });
};

// calculate four corners of square
// store them in BG and return them in Canvas
export const calcFourCornersInCanvas = (sXYinCanvas: TypeSXY, squareSize: number) => {
  const fourCornersInCanvas = [
    { x: sXYinCanvas.x - 1, y: sXYinCanvas.y - 1 },
    {
      x: sXYinCanvas.x + squareSize,
      y: sXYinCanvas.y - 1,
    },
    { x: sXYinCanvas.x - 1, y: sXYinCanvas.y + squareSize },
    {
      x: sXYinCanvas.x + squareSize,
      y: sXYinCanvas.y + squareSize,
    },
  ];

  return fourCornersInCanvas;
};
export const handleMouseDown = (
  event: React.MouseEvent,
  circleRadius: number,
  fourCornersInBG: TypeFourCornersInBG,
  changeSelectedCornerForResizing: ({
    cornerName,
    cornerXY,
  }: TypeForChangeSelectedCornerForResizing) => void,
  handleMoving: TypeHandleMoving,
) => {
  const clickedX = event.clientX;
  const clickedY = event.clientY;

  // to resize square  get the circle spaces on four corners of square
  // to move square  set the boolean value
  checkPoint(
    clickedX,
    clickedY,
    circleRadius,
    fourCornersInBG,
    changeSelectedCornerForResizing,
    handleMoving,
  );
};

export const handleMouseMove = (
  event: React.MouseEvent,
  setSXYinBG: TypeSetSXY,
  setSXYinCanvas: TypeSetSXY,
  sXYinBG: TypeSXY,
  sXYinCanvas: TypeSXY,
  squareSize: number,
  changeSquareSize: (size: number) => void,
  selectedCornerForResizing: TypeForChangeSelectedCornerForResizing,
  changeSelectedCornerForResizing: ({
    cornerName,
    cornerXY,
  }: TypeForChangeSelectedCornerForResizing) => void,
  isMoving: TypeIsMoving,
  handleMoving: TypeHandleMoving,
) => {
  const movedX = event.clientX;
  const movedY = event.clientY;

  // move square
  if (isMoving) {
    const { x, y } = isMoving;
    const distanceXMoving = movedX - x;
    const distanceYMoving = movedY - y;
    setSXYinBG({ x: sXYinBG.x + distanceXMoving, y: sXYinBG.y + distanceYMoving });
    setSXYinCanvas({
      x: sXYinCanvas.x + distanceXMoving,
      y: sXYinCanvas.y + distanceYMoving,
    });
    handleMoving({ x: x + distanceXMoving, y: y + distanceYMoving });
    return;
  }

  // resize square
  const { cornerName, cornerXY } = selectedCornerForResizing;

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
      changeSquareSize(squareSize - selectedDistance);

      // add distance to top left corner x, y
      // to get corner x, y that has changed right before when keeping mouse move event on
      changeSelectedCornerForResizing({
        ...selectedCornerForResizing,
        cornerXY: {
          x: cornerXY.x + selectedDistance,
          y: cornerXY.y + selectedDistance,
        },
      });
    }
    // case 1-2. mouse moves to left and up and square expands
    if (distanceX <= 0 && distanceY < 0) {
      setSXYinBG({ x: sXYinBG.x - selectedDistance, y: sXYinBG.y - selectedDistance });
      setSXYinCanvas({
        x: sXYinCanvas.x - selectedDistance,
        y: sXYinCanvas.y - selectedDistance,
      });
      //
      changeSquareSize(squareSize + selectedDistance);

      // remove distance from top left corner x, y
      // to get corner x, y that has changed right before when keeping mouse move event on
      changeSelectedCornerForResizing({
        ...selectedCornerForResizing,
        cornerXY: {
          x: cornerXY.x - selectedDistance,
          y: cornerXY.y - selectedDistance,
        },
      });
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
      changeSquareSize(squareSize + selectedDistance);

      // add or remove distance to or from top right corner x, y
      // to get corner x, y that has changed right before when keeping mouse move event on
      changeSelectedCornerForResizing({
        ...selectedCornerForResizing,
        cornerXY: {
          x: cornerXY.x + selectedDistance,
          y: cornerXY.y - selectedDistance,
        },
      });
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
      changeSquareSize(squareSize - selectedDistance);

      // add or remove distance to or from top right corner x, y
      // to get corner x, y that has changed right before when keeping mouse move event on
      changeSelectedCornerForResizing({
        ...selectedCornerForResizing,
        cornerXY: {
          x: cornerXY.x - selectedDistance,
          y: cornerXY.y + selectedDistance,
        },
      });
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
      changeSquareSize(squareSize - selectedDistance);

      // add or remove distance to or from bottom left corner x, y
      // to get corner x, y that has changed right before when keeping mouse move event on
      changeSelectedCornerForResizing({
        ...selectedCornerForResizing,
        cornerXY: {
          x: cornerXY.x + selectedDistance,
          y: cornerXY.y - selectedDistance,
        },
      });
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
      changeSquareSize(squareSize + selectedDistance);

      // add or remove distance to or from bottom left corner x, y
      // to get corner x, y that has changed right before when keeping mouse move event on
      changeSelectedCornerForResizing({
        ...selectedCornerForResizing,
        cornerXY: {
          x: cornerXY.x - selectedDistance,
          y: cornerXY.y + selectedDistance,
        },
      });
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
      changeSquareSize(squareSize + selectedDistance);

      // add or remove distance to or from bottom right corner x, y
      // to get corner x, y that has changed right before when keeping mouse move event on
      changeSelectedCornerForResizing({
        ...selectedCornerForResizing,
        cornerXY: {
          x: cornerXY.x + selectedDistance,
          y: cornerXY.y + selectedDistance,
        },
      });
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
      changeSquareSize(squareSize - selectedDistance);

      // add or remove distance to or from bottom right corner x, y
      // to get corner x, y that has changed right before when keeping mouse move event on

      changeSelectedCornerForResizing({
        ...selectedCornerForResizing,
        cornerXY: {
          x: cornerXY.x - selectedDistance,
          y: cornerXY.y - selectedDistance,
        },
      });
    }
  }
};
export const handleMouseUp = (
  selectedCornerForResizing: TypeForChangeSelectedCornerForResizing,
  changeSelectedCornerForResizing: ({
    cornerName,
    cornerXY,
  }: TypeForChangeSelectedCornerForResizing) => void,
  handleMoving: TypeHandleMoving,
) => {
  // stop resizing or moving
  changeSelectedCornerForResizing({
    ...selectedCornerForResizing,
    cornerName: undefined,
  });
  handleMoving(undefined);
};
