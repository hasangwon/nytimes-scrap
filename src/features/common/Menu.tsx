import React from "react";
import HomeIcon from "./icon/HomeIcon";
import ScrapIcon from "./icon/ScrapIcon";

const Menu = ({ menuIndex, onChangeMenuIndex }: { menuIndex: number; onChangeMenuIndex: (number: number) => void }) => {
  console.log(menuIndex, "menuIndex");
  return (
    <footer className="w-full h-[85px] bg-black flex items-center rounded-[30px]">
      <button onClick={() => onChangeMenuIndex(1)} className="flex-1 flex justify-center items-center h-full">
        <div className="flex flex-col gap-1">
          <HomeIcon color={menuIndex === 1 ? "white" : "#6D6D6D"} />
          <h2 className={`flex-1 text-[10px] ${menuIndex === 1 ? "text-white" : "text-neutral-dark"}`}>홈</h2>
        </div>
      </button>
      <button onClick={() => onChangeMenuIndex(2)} className="flex-1 flex justify-center items-center h-full">
        <div className="flex flex-col gap-1">
          <ScrapIcon color={menuIndex === 2 ? "white" : "#6D6D6D"} />
          <h2 className={`text-[10px] ${menuIndex === 2 ? "text-white" : "text-neutral-dark"}`}>스크랩</h2>
        </div>
      </button>
    </footer>
  );
};

export default Menu;
