// import { ThemeProvider } from "styled-components";
import { NovelsBG } from "./NovelList.styles";

export default function Novels({ children }: { children: React.ReactNode }) {
  return <NovelsBG>{children}</NovelsBG>;
}
