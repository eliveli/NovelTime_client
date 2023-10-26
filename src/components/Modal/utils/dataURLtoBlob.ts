export default function dataURLtoBlob(dataUrl: string): Blob | null {
  const arr = dataUrl.split(","); // dataUrl is from canvas.toDataURL. it includes the base64-encoded image data but it is not base64

  const data = arr[0].match(/:(.*?);/);
  if (data === null) return null;

  const mime: string | null = data[1];

  const bstr = window.atob(arr[1]);
  let n = bstr.length;

  const u8arr = new Uint8Array(n);
  while (n) {
    n -= 1;
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
