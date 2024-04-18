import { getLoadArticles } from "@/src/app/globalService";
import { setHomeArticles, setHomeCurrentPage, setHomeFilter } from "@/src/app/globalSlice";
import { RootState } from "@/src/app/store";
import FilteringBar from "@/src/features/common/FilteringBar";
import Modal from "@/src/features/common/Modal";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "dayjs/locale/ko";

const HomeScreen = () => {
  const homeFilter = useSelector((state: RootState) => state.global.homeFilter);
  const articles = useSelector((state: RootState) => state.global.homeArticles);
  const homeCurrentPage = useSelector((state: RootState) => state.global.homeCurrentPage);
  const dispatch = useDispatch();
  const [isShownModal, setIsShownModal] = useState(false);

  // fq로 헤드라인 검색 시, 현재 공백 단위로 검색이 된다.
  // ex) 헤드라인: 한국에서 산다 -> '한국'검색 시 미노출, '한국에서' 검색 시 노출
  // 해당 API에서 해결방안을 못찾았음.
  const onFilteringClick = (headline: string, date: string, nations: string[]) => {
    const parsedNations = homeFilter?.nations?.map((item) => `"${item}"`).join(" OR ");

    dispatch(setHomeFilter({ headline: headline, date: date, nations: nations }));
    dispatch(setHomeCurrentPage(0));

    getLoadArticles(0, headline, date, parsedNations).then((articles) => {
      console.log(articles, "articles");
      dispatch(setHomeFilter({ headline: headline, date: date, nations: nations }));
      dispatch(setHomeArticles(articles));
    });
  };

  const getMoreAricles = () => {
    const nextPage = homeCurrentPage + 1;
    const parsedNations = homeFilter?.nations?.map((item) => `"${item}"`).join(" OR ");

    getLoadArticles(nextPage, homeFilter.headline, homeFilter.date, parsedNations).then((data) => {
      dispatch(setHomeArticles([...articles, ...data]));
      dispatch(setHomeCurrentPage(nextPage));
    });
  };

  return (
    <>
      {isShownModal && <Modal onCancelClick={() => setIsShownModal(false)} onNextClick={onFilteringClick} />}
      <FilteringBar filterings={homeFilter} onOpenModal={() => setIsShownModal(true)} />
      <article className="flex flex-col h-[calc(100vh-145px)] overflow-y-auto">
        <div className="p-4 flex flex-col gap-2">
          {articles &&
            articles.length > 0 &&
            articles?.map((article) => (
              <div key={article._id} className="p-4 rounded-lg bg-white flex flex-col">
                <div className="flex w-full">
                  <button
                    onClick={() => {
                      window.location.href = article.web_url;
                    }}
                    className="text-left flex-1 text-lg font-semibold"
                  >
                    {article.headline.print_headline ? article.headline.print_headline : article.headline.main}
                  </button>
                  <div className="w-[30px] flex justify-end">즐찿</div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="font-normal text-[13px]">{article.byline.original}</div>

                  <div className="font-normal text-[13px] text-[#6D6D6D]">{dayjs(article.pub_date).locale("ko").format("YYYY.M.D (ddd)")}</div>
                </div>
              </div>
            ))}
        </div>
        <button onClick={getMoreAricles}>more</button>
      </article>
    </>
  );
};
export default HomeScreen;
