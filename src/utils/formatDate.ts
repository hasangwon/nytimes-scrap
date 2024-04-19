export const formatDate = (dateStr: string) => {
  if (dateStr && dateStr.length === 8) {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}.${month}.${day}`;
  }
  return "전체 날짜";
};
