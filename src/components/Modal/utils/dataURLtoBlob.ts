export default function dataURLtoBlob(dataUrl: string): Blob | undefined {
  const arr = dataUrl.split(","); // dataUrl is from canvas.toDataURL. it includes the base64-encoded image data but it is not base64

  const data = arr[0].match(/:(.*?);/);
  if (data === null) return;

  const mime: string | null = data[1];

  //   Buffer.from(data, 'base64')
  const bstr = atob(arr[1]);
  let n = bstr.length;

  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
