export default function matchPlatformName(platformSelected: string) {
  if (platformSelected === "카카페") return "kakape";
  if (platformSelected === "시리즈") return "series";
  if (platformSelected === "리디북스") return "ridi";
  if (platformSelected === "조아라") return "joara";

  throw Error("플랫폼 선택 오류");
}
