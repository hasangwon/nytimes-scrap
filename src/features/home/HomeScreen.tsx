import FilteringBar from "@/src/features/common/FilteringBar";
import Modal from "@/src/features/common/Modal";
import Articles from "../common/Articles";
import { useHomeState } from "@/src/app/hooks";
import { useState } from "react";

const HomeScreen = () => {
  const [isShownModal, setIsShownModal] = useState(false);
  const { homeFilter, articles, isGlobalLoading, isLoading, articleRef, onFilteringClick } = useHomeState();

  return (
    <>
      {isShownModal && <Modal onCancelClick={() => setIsShownModal(false)} onNextClick={onFilteringClick} />}
      <FilteringBar filterings={homeFilter} onOpenModal={() => setIsShownModal(true)} />
      <article ref={articleRef} className="w-full h-full overflow-y-scroll flex flex-col min-w-[280px]">
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
