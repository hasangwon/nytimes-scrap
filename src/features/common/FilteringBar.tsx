import { FilterElement } from "@/types/type";
import SearchIcon from "./icon/SearchIcon";
import CalendarIcon from "./icon/CalendarIcon";
import { formatDate } from "@/src/utils/formatDate";
import { formatNations } from "@/src/utils/formatNations";

const FilteringBar = ({ filterings, onOpenModal }: { filterings: FilterElement; onOpenModal: () => void }) => {
  return (
    <header className="fixed top-0 header flex gap-2 items-center w-full h-[60px] border-b border-neutral text-neutral-dark py-3 px-5  bg-white max-w-[560px]">
      <button className={`flex items-center whitespace-nowrap h-[34px] py-[6px] px-[12px] border rounded-[30px] text-sm ${filterings?.headline ? "border-primary text-primary" : "border-neutral"}`} onClick={onOpenModal}>
        <SearchIcon color={filterings?.headline ? "#3478F6" : "#C4C4C4"} />
        {filterings?.headline ? (filterings?.headline.length > 6 ? `${filterings.headline.slice(0, 6)}..` : filterings.headline) : "전체 헤드라인"}
      </button>
      <button className={`flex items-center whitespace-nowrap h-[34px] py-[6px] px-[12px] border rounded-[30px] text-sm ${filterings?.date ? "border-primary text-primary" : "border-neutral"}`} onClick={onOpenModal}>
        <CalendarIcon color={filterings?.date ? "#3478F6" : "#C4C4C4"} />
        {formatDate(filterings.date)}
      </button>
      <button className={`whitespace-nowrap h-[34px] py-[6px] px-[12px] border rounded-[30px] text-sm ${filterings?.nations && filterings?.nations.length > 0 ? "border-primary text-primary" : "border-neutral"}`} onClick={onOpenModal}>
        {formatNations(filterings?.nations)}
      </button>
    </header>
  );
};

export default FilteringBar;
