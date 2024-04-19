import { getLoadArticles } from "@/src/app/globalService";
import { setHomeArticles } from "@/src/app/globalSlice";
import Menu from "@/src/features/common/Menu";
import HomeScreen from "@/src/features/home/HomeScreen";
import ScrapScreen from "@/src/features/scrap/ScrapScreen";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [menuIndex, setMenuIndex] = React.useState<number>(1);

  const onChangeMenuIndex = (index: number) => {
    setMenuIndex(index);
  };

  useEffect(() => {
    const fetchFirstArticles = () => {
      getLoadArticles(0, "", "", "").then((articles) => {
        dispatch(setHomeArticles(articles));
      });
    };

    fetchFirstArticles();
  }, []);

  return (
    <main className="flex justify-center w-full h-full overflow-hidden bg-white">
      <div className={`flex w-full min-h-screen flex-col items-center max-w-[560px] overflow-hidden bg-neutral-light border border-y-0`}>
        {menuIndex === 1 ? <HomeScreen /> : <ScrapScreen />}
        <Menu menuIndex={menuIndex} onChangeMenuIndex={onChangeMenuIndex} />
      </div>
    </main>
  );
};

export default Home;
