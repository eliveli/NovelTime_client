export default function adjustWritingDesc(writingDesc?: string, searchWord?: string) {
  if (!writingDesc || searchWord === undefined) return "";

  // replace multiple spaces, tabs, new lines with a single space
  const cleanDesc = writingDesc.replace(/\s+/g, " ");

  const maxLengthToCut = 220;
  let firstIndexToCut = 0;
  let lastIndexToCut = 0;

  if (searchWord === "") {
    return cleanDesc.slice(0, maxLengthToCut);
  }

  const index = cleanDesc.indexOf(searchWord);

  if (index < 40) {
    firstIndexToCut = 0;
    lastIndexToCut = maxLengthToCut;
  }

  if (index >= 40) {
    if (lastIndexToCut + 1 <= cleanDesc.length) {
      firstIndexToCut = index - 40;
    } else {
      // 뒤 글자 모자란 만큼 앞 글자 가져오기
      firstIndexToCut -= lastIndexToCut + 1 - cleanDesc.length;
    }

    lastIndexToCut = index + maxLengthToCut - 40;
  }

  return cleanDesc.slice(firstIndexToCut, lastIndexToCut + 1);
}
