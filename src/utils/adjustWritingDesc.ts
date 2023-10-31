export default function adjustWritingDesc(writingDesc?: string, searchWord?: string) {
  if (!writingDesc || searchWord === undefined) return "";

  // replace multiple spaces, tabs, new lines with a single space
  const cleanDesc = writingDesc.replace(/\s+/g, " ");

  const lengthToCut = 220;
  // -> maximum length in display preview considering korean and english
  //  . on desktop : about 120 length in korean, 200 length in english
  //  . on mobile : about 76 length in korean, 122 length in english

  if (searchWord === "") {
    return cleanDesc.slice(0, lengthToCut);
  }

  const standardIndex = 40;
  const lastIndexInDesc = cleanDesc.length - 1;

  let firstIndexToCut = -1;
  let lastIndexToCut = -1;

  const indexOfWord = cleanDesc.indexOf(searchWord);

  if (indexOfWord < standardIndex) {
    firstIndexToCut = 0;
    lastIndexToCut = lengthToCut - 1;
  }

  if (indexOfWord >= standardIndex) {
    firstIndexToCut = indexOfWord - standardIndex;
    lastIndexToCut = firstIndexToCut + lengthToCut - 1;

    if (lastIndexToCut > lastIndexInDesc) {
      // 뒤 글자 모자란 만큼 앞 글자 가져오기
      firstIndexToCut -= lastIndexToCut - lastIndexInDesc;

      lastIndexToCut = firstIndexToCut + lengthToCut - 1;
    }
  }

  return cleanDesc.slice(firstIndexToCut, lastIndexToCut + 1);
}
