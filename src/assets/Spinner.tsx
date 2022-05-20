import { keyframes } from "styled-components";
import { StaticSpinner } from "./images";
import { styled } from "./styles/theme";

const spinnerShowOn = keyframes`
      from{
        clip-path:inset(0 0 100% 0);
        opacity: 0.1;
      }
      to{
        clip-path: inset(0 0 0 0);
        opacity: 1;
      }
    `;
const SpinnerContnr = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;

  animation-name: ${spinnerShowOn};
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 1.5s;
`;

export default function Spinner() {
  return (
    <SpinnerContnr>
      <StaticSpinner />
    </SpinnerContnr>
  );
}
