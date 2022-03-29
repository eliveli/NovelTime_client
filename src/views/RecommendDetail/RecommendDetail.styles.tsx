import { styled } from "assets/styles/theme";
import { keyframes } from "styled-components";

export const DotLine = styled.div`
  margin: 5px 17px;
  padding-top: 20px;
  border-top: 8px dashed rgba(0, 0, 0, 0.1);
`;
// animation
const dotShowOn = keyframes`
  from{
    margin-top: -20px;
    opacity: 0.1;
}
to{
      margin-top: 5px;
    opacity: 1;
  }
`;
const writingHidden = keyframes`
    from{opacity:0;}
    to{opacity:0;}
`;
const writingShowOn = keyframes`
  from{
    clip-path:inset(0 0 100% 0);
    opacity: 0.1;
  }
  to{
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
`;
export const DotAnimation = styled.div`
  animation-name: ${dotShowOn};
  animation-direction: normal;
  animation-duration: 1.3s;
  animation-fill-mode: forwards;
  /* animation-delay: ${1}s; // later, delete it */
`;
export const WritingAnimation = styled.div`
  animation-name: ${writingHidden}, ${writingShowOn};
  animation-direction: normal;
  animation-duration: ${0.5}s, 1.3s; //// later, subtract 1 second from ${1 + 0.7}
  animation-fill-mode: forwards;
  animation-delay: 0s, ${0.5}s; //// later, subtract 1 second from ${1 + 0.7}
`;
