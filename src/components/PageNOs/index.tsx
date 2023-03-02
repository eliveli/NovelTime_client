import React from "react";

function setFirstInCurrentNOs(selectedNo: number, lastNo: number) {
  if ([1, 2, 3].includes(selectedNo)) return 1;

  if (selectedNo >= lastNo - 2) return lastNo - 4;

  return selectedNo - 2;
}

function setCurrentPageNOs(firstInCurrentNOs: number, lastNo: number) {
  const currentPageNOs = [firstInCurrentNOs];

  for (let i = 1; i <= 4; i += 1) {
    if (currentPageNOs[currentPageNOs.length - 1] === lastNo) break;

    currentPageNOs.push(firstInCurrentNOs + i);
  }

  return currentPageNOs;
}
// quantities of page numbers in current list can't be more than 5
// i.e. [4,5,6,7,8] or [1,2,3,4,5]  <- maximum is 5
// i.e. [1,2,3,4] or [1,2,3] or [1,2] or [1]  <- less than 5

export default function PageNOs(selectedNo: number, lastNo: number) {
  const firstInCurrentNOs = setFirstInCurrentNOs(selectedNo, lastNo);

  const currentPageNOs = setCurrentPageNOs(firstInCurrentNOs, lastNo);

  const isPrevBtn = firstInCurrentNOs >= 2;
  const isNextBtn = lastNo > 5 && (firstInCurrentNOs === 1 || firstInCurrentNOs + 4 < lastNo);

  return <div>index</div>;
}
