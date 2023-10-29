export default function checkIsNearBottom(errorRange: number) {
  // it can be not accurate when html element have x-scrollbar
  if (window.innerHeight + window.scrollY + errorRange >= document.documentElement.scrollHeight) {
    return true;
  }

  return false;
}
