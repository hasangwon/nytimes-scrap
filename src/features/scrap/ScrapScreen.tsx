import React, { useState } from "react";
import FilteringBar from "../common/FilteringBar";
import Modal from "../common/Modal";
import Articles from "../common/Articles";
import { useScrapFilter } from "@/src/app/hooks";
import EmptyScrap from "./EmptyScrap";

const ScrapScreen = () => {
  const [isShownModal, setIsShownModal] = useState(false);
  const { scrapFilter, innerScrapArticles, onFilteringClick } = useScrapFilter();

  return (
    <>
      {isShownModal && <Modal onCancelClick={() => setIsShownModal(false)} onNextClick={onFilteringClick} />}
      <FilteringBar filterings={scrapFilter} onOpenModal={() => setIsShownModal(true)} />
      <article className="flex flex-col h-[calc(100vh-145px)] overflow-y-auto min-w-[280px] w-full">{innerScrapArticles.length === 0 ? <EmptyScrap /> : <Articles articles={innerScrapArticles} />}</article>
    </>
  );
};

export default ScrapScreen;
