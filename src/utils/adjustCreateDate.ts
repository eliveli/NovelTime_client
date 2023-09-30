export default function adjustCreateDate(createDate: string) {
  const date = new Date();
  const year: string = date.getFullYear().toString();

  let currentMonth: string | number = date.getMonth() + 1;
  currentMonth = currentMonth < 10 ? `0${currentMonth.toString()}` : currentMonth.toString();

  let currentDay: string | number = date.getDate();
  currentDay = currentDay < 10 ? `0${currentDay.toString()}` : currentDay.toString();

  let currentHour: string | number = date.getHours();
  currentHour = currentHour < 10 ? `0${currentHour.toString()}` : currentHour.toString();

  let currentMinutes: string | number = date.getMinutes();
  currentMinutes =
    currentMinutes < 10 ? `0${currentMinutes.toString()}` : currentMinutes.toString();

  const isToday = createDate.substring(0, 8) === year + currentMonth + currentDay;

  if (isToday) {
    const hourInCreateDate = createDate.substring(8, 10);
    const minutesInCreateDate = createDate.substring(10, 12);

    const hourGap = Number(currentHour) - Number(hourInCreateDate);
    const minutesGap = Number(currentMinutes) - Number(minutesInCreateDate);

    if (hourGap === 0 && minutesGap === 0) {
      return `방금 전`;
    }

    if (hourGap === 0) {
      return `${minutesGap.toString()}분 전`;
    }

    if (hourGap > 0) {
      return `${hourGap.toString()}시간 전`;
    }
  }

  const yearInCreateDate = createDate.substring(2, 4);
  const monthInCreateDate = createDate.substring(4, 6);
  const dayInCreateDate = createDate.substring(6, 8);
  return `${yearInCreateDate}.${monthInCreateDate}.${dayInCreateDate}`;
}
