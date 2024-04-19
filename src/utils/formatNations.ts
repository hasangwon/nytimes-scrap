const nationParser: { [key: string]: string } = {
  "south korea": "대한민국",
  china: "중국",
  japan: "일본",
  usa: "미국",
  "north korea": "북한",
  russia: "러시아",
  france: "프랑스",
  england: "영국",
};

export const formatNations = (nations: string[] | []) => {
  if (!nations || nations.length === 0) {
    return "전체 국가";
  }
  const firstNation = nationParser[nations[0].toLowerCase()] || nations[0];

  if (nations.length > 1) {
    return `${firstNation} 외 ${nations.length - 1}개`;
  } else {
    return firstNation;
  }
};
