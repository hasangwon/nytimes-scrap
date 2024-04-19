import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/app/store";
import { toast } from "react-toastify";
import { Article } from "@/types/type";
import { addScrap, removeScrapById } from "../features/scrap/scrapSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { setHomeArticles, setHomeCurrentPage, setHomeFilter, setIsGlobalLoading, setScrapFilter } from "@/src/app/globalSlice";
import { getLoadArticles } from "@/src/service/globalService";
import dayjs from "dayjs";
import { normalizeCountryName } from "../utils/normarlizeCountryName";

export const useHomeState = () => {
  const homeFilter = useSelector((state: RootState) => state.global.homeFilter);
  const articles = useSelector((state: RootState) => state.global.homeArticles);
  const homeCurrentPage = useSelector((state: RootState) => state.global.homeCurrentPage);
  const isGlobalLoading = useSelector((state: RootState) => state.global.IsGlobalLoading);
  const dispatch = useDispatch();
  const articleRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onFilteringClick = (headline: string, date: string, nations: string[]) => {
    const parsedNations = nations?.map((item) => `"${item}"`).join(" OR ");
    dispatch(setHomeFilter({ headline, date, nations }));
    dispatch(setHomeCurrentPage(0));
    dispatch(setIsGlobalLoading(true));

    getLoadArticles(0, headline, date, parsedNations).then((articles) => {
      dispatch(setIsGlobalLoading(false));
      dispatch(setHomeArticles(articles));
    });
  };

  const getMoreArticles = useCallback(() => {
    const nextPage = homeCurrentPage + 1;
    const parsedNations = homeFilter?.nations?.map((item) => `"${item}"`).join(" OR ");
    setIsLoading(true);

    getLoadArticles(nextPage, homeFilter.headline, homeFilter.date, parsedNations).then((data) => {
      if (data === null) {
        if (articleRef && articleRef?.current) {
          articleRef.current.scrollTop = 0;
        }
        setIsLoading(false);
        if (isLoading) toast.error(`요청이 너무 많습니다. 잠시 후 시도해주세요.(API 제한)`, { autoClose: 1000 });
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
          getMoreArticles();
        }
      }
    };
    if (current) {
      current.addEventListener("scroll", checkBottom);
      return () => current.removeEventListener("scroll", checkBottom);
    }
  }, [getMoreArticles]);

  return {
    homeFilter,
    articles,
    isGlobalLoading,
    isLoading,
    articleRef,
    onFilteringClick,
  };
};

export const useScrapFilter = () => {
  const dispatch = useDispatch();
  const scrapFilter = useSelector((state: RootState) => state.global.scrapFilter);
  const scrapArticles = useSelector((state: RootState) => state.scrap.scraps);
  const [innerScrapArticles, setInnerScrapArticles] = useState<Article[]>([]);

  useEffect(() => {
    let filteredArticles = [...scrapArticles].sort((a, b) => dayjs(b.pub_date).valueOf() - dayjs(a.pub_date).valueOf());

    if (scrapFilter.nations.length !== 0) {
      filteredArticles = filteredArticles.filter((article) => {
        const locations = article.keywords.filter((keyword) => keyword.name === "glocations").map((keyword) => normalizeCountryName(keyword.value));
        return scrapFilter.nations.some((nation) => locations.includes(normalizeCountryName(nation)));
      });
    }
    if (scrapFilter.headline) {
      filteredArticles = filteredArticles.filter((article) => article.headline.main.toLowerCase().includes(scrapFilter.headline.toLowerCase()));
    }
    if (scrapFilter.date) {
      filteredArticles = filteredArticles.filter((article) => dayjs(article.pub_date).format("YYYYMMDD") === scrapFilter.date);
    }

    setInnerScrapArticles(filteredArticles);
  }, [scrapFilter, scrapArticles]);

  const onFilteringClick = (headline: string, date: string, nations: string[]) => {
    dispatch(setScrapFilter({ headline, date, nations }));
  };

  return { scrapFilter, innerScrapArticles, onFilteringClick };
};

export const useScrapManagement = () => {
  const scrapList = useSelector((state: RootState) => state.scrap.scraps);
  const dispatch = useDispatch();

  const onScrapClick = (article: Article) => {
    if (scrapList.some((scrap) => scrap._id === article._id)) {
      dispatch(removeScrapById(article._id));
      toast.success(`스크랩 삭제되었습니다.`, { autoClose: 2000 });
    } else {
      dispatch(addScrap(article));
      toast.success(`${article.byline.original || "-"}의 글이 스크랩되었습니다.`, { autoClose: 2000 });
    }
  };

  return { scrapList, onScrapClick };
};

export const useModalState = (onNextClick: (headline: string, date: string, nations: string[]) => void, onCancelClick: () => void) => {
  const [headline, setHeadline] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [selectedNations, setSelectedNations] = useState<string[]>([]);

  const handleHeadlineInput = (input: string) => {
    setHeadline(input);
  };

  const handleNationClick = (nation: string) => {
    setSelectedNations((prevNations) => (prevNations.includes(nation) ? prevNations.filter((n) => n !== nation) : [...prevNations, nation]));
  };

  const handleNextClick = () => {
    const parsedDate = date.replaceAll("-", "");
    onNextClick(headline, parsedDate, selectedNations);
    onCancelClick();
  };

  return {
    headline,
    date,
    selectedNations,
    handleHeadlineInput,
    handleNationClick,
    handleNextClick,
    setDate,
  };
};
