export type TypeFourCornersInBG = {
  topLeftCorner: {
    x: number;
    y: number;
  };
  topRightCorner: {
    x: number;
    y: number;
  };
  bottomLeftCorner: {
    x: number;
    y: number;
  };
  bottomRightCorner: {
    x: number;
    y: number;
  };
};

export type TypeHandleFourCornersInBG = React.Dispatch<
  React.SetStateAction<{
    topLeftCorner: {
      x: number;
      y: number;
    };
    topRightCorner: {
      x: number;
      y: number;
    };
    bottomLeftCorner: {
      x: number;
      y: number;
    };
    bottomRightCorner: {
      x: number;
      y: number;
    };
  }>
>;
export type CornerName =
  | "topLeftCorner"
  | "topRightCorner"
  | "bottomLeftCorner"
  | "bottomRightCorner"
  | undefined;
export type TypeHandleSelectedCornerForResizing = React.Dispatch<
  React.SetStateAction<{
    cornerName: CornerName;
    cornerXY: {
      x: number;
      y: number;
    };
  }>
>;
export type TypeSelectedCornerForResizing = {
  cornerName: CornerName;
  cornerXY: {
    x: number;
    y: number;
  };
};
export type TypeIsMoving =
  | {
      x: number;
      y: number;
    }
  | undefined;
export type TypeHandleMoving = React.Dispatch<
  React.SetStateAction<
    | {
        x: number;
        y: number;
      }
    | undefined
  >
>;
export type TypeSetSXY = React.Dispatch<
  React.SetStateAction<{
    x: number;
    y: number;
  }>
>;
export type TypeSXY = { x: number; y: number };
