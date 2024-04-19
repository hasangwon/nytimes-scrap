import { getLoadArticles } from "@/src/app/globalService";
import { setHomeArticles, setHomeCurrentPage, setHomeFilter } from "@/src/app/globalSlice";
import { RootState } from "@/src/app/store";
import FilteringBar from "@/src/features/common/FilteringBar";
import Modal from "@/src/features/common/Modal";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "dayjs/locale/ko";
import { Article } from "@/types/type";
import Articles from "../common/Articles";

const HomeScreen = () => {
  const homeFilter = useSelector((state: RootState) => state.global.homeFilter);
  const articles = useSelector((state: RootState) => state.global.homeArticles);
  const homeCurrentPage = useSelector((state: RootState) => state.global.homeCurrentPage);
  const isGlobalLoading = useSelector((state: RootState) => state.global.IsGlobalLoading);
  const dispatch = useDispatch();
  const articleRef = useRef<HTMLDivElement>(null);
  const [isShownModal, setIsShownModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onFilteringClick = (headline: string, date: string, nations: string[]) => {
    const parsedNations = homeFilter?.nations?.map((item) => `"${item}"`).join(" OR ");

    dispatch(setHomeFilter({ headline: headline, date: date, nations: nations }));
    dispatch(setHomeCurrentPage(0));

    getLoadArticles(0, headline, date, parsedNations).then((articles) => {
      dispatch(setHomeFilter({ headline: headline, date: date, nations: nations }));
      dispatch(setHomeArticles(articles));
    });
  };

  const getMoreAricles = useCallback(() => {
    const nextPage = homeCurrentPage + 1;
    const parsedNations = homeFilter?.nations?.map((item) => `"${item}"`).join(" OR ");
    setIsLoading(true);

    getLoadArticles(nextPage, homeFilter.headline, homeFilter.date, parsedNations).then((data) => {
      if (data === null) {
        if (articleRef && articleRef?.current) {
          articleRef.current.scrollTop = 0;
        }
        setIsLoading(false);
        if (isLoading) alert("요청이 너무 많습니다. 잠시 후 시도해주세요.");
        return;
      }
      setIsLoading(false);
      const newArticles = data.filter((newArticle: Article) => !articles.some((existingArticle) => existingArticle._id === newArticle._id));
      if (data.length === 0) {
        alert("마지막 기사입니다.");
        return;
      }
      // 해당 페이지 전체 중복 시, 다음 페이지로 이동
      if (data.length > 0 && newArticles.length === 0) {
        dispatch(setHomeCurrentPage(nextPage + 1));
        return;
      }
      dispatch(setHomeArticles([...articles, ...newArticles]));
      dispatch(setHomeCurrentPage(nextPage));
    });
  }, [articles, dispatch, homeCurrentPage, homeFilter.date, homeFilter.headline, homeFilter.nations, isLoading]);

  useEffect(() => {
    const current = articleRef.current;
    const checkBottom = () => {
      if (current) {
        const isAtBottom = current.scrollHeight - current.scrollTop <= current.clientHeight;
        if (isAtBottom) {
          getMoreAricles();
        }
      }
    };
    if (current) {
      current.addEventListener("scroll", checkBottom);
      return () => current.removeEventListener("scroll", checkBottom);
    }
  }, [getMoreAricles]);

  return (
    <>
      {isShownModal && <Modal onCancelClick={() => setIsShownModal(false)} onNextClick={onFilteringClick} />}
      <FilteringBar filterings={homeFilter} onOpenModal={() => setIsShownModal(true)} />
      <article ref={articleRef} className="flex flex-col h-[calc(100vh-145px)] overflow-y-auto min-w-[280px]">
        {isGlobalLoading ? (
          <div className="h-full w-full flex justify-center items-center">
            <div className="loader" />
          </div>
        ) : (
          <Articles articles={articles} />
        )}
        {isLoading && (
          <div className="w-full pb-2">
            <div className="loader" />
          </div>
        )}
      </article>
    </>
  );
};
export default HomeScreen;
