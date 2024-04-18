import React, { useState } from "react";
import FilteringBar from "../common/FilteringBar";

const ScrapScreen = () => {
  const [isShownModal, setIsShownModal] = useState(true);

  const onFilteringClick = (headline: string, date: string, nations: string[]) => {
    const nationsToStriong = nations.map((item) => `"${item}"`).join(" OR ");

    console.log(headline, date, nationsToStriong, "asd");
  };
  return (
    <>
      <FilteringBar
        onOpenModal={() => setIsShownModal(true)}
        filterings={{
          headline: "",
          date: "",
          nations: [],
        }}
      />
      <article className="flex flex-col h-[calc(100vh-145px)] overflow-y-auto"></article>
    </>
  );
};

export default ScrapScreen;
