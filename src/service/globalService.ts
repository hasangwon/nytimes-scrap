import { QueryParams } from "@/types/type";
import axios from "axios";
const url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

export const getLoadArticles = async (page: number, keyword: string, date: string, glocations: string) => {
  let params = {
    page: page,
    // 깃허브를 통한 과제 제출을 위해 api 키 직접 입력
    // "api-key": process.env.NEXT_PUBLIC_NYTIMES_API_KEY,
    "api-key": "NbXBOmMz5ybMHTM7Wv4d42DAuo8zQoHL",
    sort: "newest",
  } as QueryParams;
  if (keyword && glocations) {
    params.fq = `headline:(${keyword}) AND glocations:(${glocations})`;
  } else if (keyword) {
    params.fq = `headline:(${keyword})`;
  } else if (glocations) {
    params.fq = `glocations:(${glocations})`;
  }
  if (date) {
    params.begin_date = date;
    params.end_date = date;
  }

  try {
    const response = await axios.get(url, { params });
    const array = response.data.response.docs || [];
    return array;
  } catch (error) {
    console.log("message", error);
    return null;
  }
};
