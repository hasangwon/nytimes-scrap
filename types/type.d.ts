export type Article = {
  _id: string;
  headline: { main: string; print_headline: string };
  pub_date: string;
  web_url: string;
  byline: { original: string };
};

export type FilterElement = {
  headline: string;
  date: string;
  nations: string[];
};

export type QueryParams = {
  page: number;
  sort: string;
  "api-key": string;
  fq?: string;
  begin_date?: string;
  end_date?: string;
};
