/* eslint-disable no-param-reassign */
export default function writeText(
  e: React.ChangeEvent<HTMLTextAreaElement>,
  textRef: React.RefObject<HTMLTextAreaElement>,
  setText: React.Dispatch<React.SetStateAction<string>>,
  isTablet: boolean,
) {
  if (!textRef.current) return;

  setText(e.target.value); // store content of comment
  textRef.current.style.height = "28px"; // Default: height of 1 line
  const textHeight = textRef.current.scrollHeight; // current scroll height
  // max-height : 15 lines of 364px - for Tablet, Desktop
  if (isTablet) {
    textRef.current.style.height = `${textHeight <= 364 ? textRef.current.scrollHeight : 364}px`;
    return;
  }
  // max-height : 5 lines of 124px - for Mobile
  textRef.current.style.height = `${textHeight <= 124 ? textRef.current.scrollHeight : 124}px`;
}
