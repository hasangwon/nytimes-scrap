import { QueryParams } from "@/types/type";
import axios from "axios";
import dayjs from "dayjs";
const url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

export const getLoadArticles = async (page: number, keyword: string, date: string, glocations: string) => {
  console.log(keyword, "asdasdsadas");
  let params = {
    page: page,
    "api-key": process.env.NEXT_PUBLIC_NYTIMES_API_KEY,
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

  console.log(params, "params");

  try {
    const response = await axios.get(url, { params });
    const array = response.data.response.docs || [];
    console.log(array, "getList");
    return array;
  } catch (error) {
    console.log("message", error);
    return [];
  }
};
