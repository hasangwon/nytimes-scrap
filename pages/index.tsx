import { getLoadArticles } from "@/src/service/globalService";
import { setHomeArticles, setIsGlobalLoading, setMenuIndex } from "@/src/app/globalSlice";
import { RootState } from "@/src/app/store";
import Menu from "@/src/features/common/Menu";
import HomeScreen from "@/src/features/home/HomeScreen";
import ScrapScreen from "@/src/features/scrap/ScrapScreen";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const menuIndex = useSelector((state: RootState) => state.global.menuIndex);
  const dispatch = useDispatch();

  const onChangeMenuIndex = (index: number) => {
    dispatch(setMenuIndex(index));
  };

  useEffect(() => {
    const fetchFirstArticles = async () => {
      dispatch(setIsGlobalLoading(true));
      try {
        const articles = await getLoadArticles(0, "", "", "");
        dispatch(setHomeArticles(articles));
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        dispatch(setIsGlobalLoading(false));
      }
    };

    fetchFirstArticles();
  }, [dispatch]);

  return (
    <main className="relaitve flex justify-center fixed bottom-0 bg-neutral-light w-full h-full pt-[60px] pb-[85px]">
      <div className="w-full bg-neutral-light max-w-[560px]">
        <ToastContainer />
        {menuIndex === 1 ? <HomeScreen /> : <ScrapScreen />}
        <Menu menuIndex={menuIndex} onChangeMenuIndex={onChangeMenuIndex} />
      </div>
    </main>
  );
};

export default Home;
