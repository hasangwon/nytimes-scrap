import { FilterElement } from "@/types/type";
import SearchIcon from "./icon/SearchIcon";
import CalendarIcon from "./icon/CalendarIcon";

const FilteringBar = ({ filterings, onOpenModal }: { filterings: FilterElement; onOpenModal: () => void }) => {
  return (
    <header className="header flex gap-2 items-center w-full h-[60px] border-b border-neutral text-neutral-dark py-3 px-5  bg-white">
      <button className={`flex items-center whitespace-nowrap h-[34px] py-[6px] px-[12px] border rounded-[30px] text-sm ${filterings?.headline ? "border-primary text-primary" : "border-neutral"}`} onClick={onOpenModal}>
        <SearchIcon color={filterings?.headline ? "#3478F6" : "#C4C4C4"} />
        {filterings?.headline ? (filterings?.headline.length > 6 ? `${filterings.headline.slice(0, 6)}..` : filterings.headline) : "전체 헤드라인"}
      </button>
      <button className={`flex items-center whitespace-nowrap h-[34px] py-[6px] px-[12px] border rounded-[30px] text-sm ${filterings?.date ? "border-primary text-primary" : "border-neutral"}`} onClick={onOpenModal}>
        <CalendarIcon color={filterings?.date ? "#3478F6" : "#C4C4C4"} />
        {filterings?.date ? filterings.date : "전체 날짜"}
      </button>
      <button className={`whitespace-nowrap h-[34px] py-[6px] px-[12px] border rounded-[30px] text-sm ${filterings?.nations && filterings?.nations.length > 0 ? "border-primary text-primary" : "border-neutral"}`} onClick={onOpenModal}>
        {filterings?.nations && filterings?.nations.length > 0 ? (filterings?.nations.length > 1 ? `${filterings.nations[0]}외 ${filterings.nations.length}` : filterings.nations[0]) : "전체 국가"}
      </button>
    </header>
  );
};

export default FilteringBar;
