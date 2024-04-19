interface CountryMapping {
  [key: string]: string;
}

export const normalizeCountryName = (name: string): string => {
  const lowerName = name.toLowerCase();

  const countryMapping: CountryMapping = {
    "u.s.a.": "usa",
    "united states": "usa",
    england: "united kingdom",
  };

  return countryMapping[lowerName] || lowerName;
};
