/* eslint-disable @next/next/no-img-element */
import { Article } from "@/types/type";
import dayjs from "dayjs";
import React from "react";

const Articles = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="p-4 flex flex-col gap-2">
      {articles &&
        articles.length > 0 &&
        articles?.map((article, index) => (
          <div key={`${article._id}_${index}`} className="p-4 rounded-lg bg-white flex flex-col">
            <div className="flex w-full">
              <button
                onClick={() => {
                  window.location.href = article.web_url;
                }}
                className="text-left flex-1 text-lg font-semibold"
              >
                {article.headline.main ? article.headline.main : article.headline?.print_headline ? article.headline?.print_headline : "제목 없음"}
              </button>
              <div className="relative w-[30px] flex justify-end items-start">
                <button>
                  <img src="/empty_star.svg" className="w-[16px] m-1" alt="empty star" />
                  {/* <img src="/fill_star.svg" className="w-[16px] m-1" alt="fill star" /> */}
                </button>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <div className="font-normal text-[13px]">{article.byline.original}</div>

              <div className="font-normal text-[13px] text-neutral-dark whitespace-nowrap">{dayjs(article.pub_date).locale("ko").format("YYYY.M.D (ddd)")}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Articles;
