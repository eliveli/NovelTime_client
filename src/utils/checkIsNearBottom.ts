export default function checkIsNearBottom(errorRange: number) {
  if (window.innerHeight + window.scrollY + errorRange >= document.documentElement.offsetHeight) {
    return true;
  }

  return false;
}
