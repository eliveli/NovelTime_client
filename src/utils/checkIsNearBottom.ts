export default function checkIsNearBottom(errorRange: number) {
  if (window.innerHeight + window.scrollY + errorRange >= document.documentElement.scrollHeight) {
    return true;
  }

  return false;
}
