import { useModalState } from "@/src/app/hooks";

const labels: string[] = ["헤드라인", "날짜", "국가"];
const nationsList: { nation: string; en: string }[] = [
  { nation: "대한민국", en: "south korea" },
  { nation: "중국", en: "china" },
  { nation: "일본", en: "japan" },
  { nation: "미국", en: "usa" },
  { nation: "북한", en: "north korea" },
  { nation: "러시아", en: "russia" },
  { nation: "프랑스", en: "france" },
  { nation: "영국", en: "england" },
];

interface ModalProps {
  onCancelClick: () => void;
  onNextClick: (headline: string, date: string, nations: string[]) => void;
}

const Modal = ({ onCancelClick, onNextClick }: ModalProps) => {
  const { headline, date, selectedNations, handleHeadlineInput, handleNationClick, handleNextClick, setDate } = useModalState(onNextClick, onCancelClick);

  return (
    <div className={`fixed inset-0 h-full bg-black bg-opacity-50 flex justify-center items-center p-6 z-10`} onClick={onCancelClick}>
      <div className="max-w-[520px] bg-white rounded-2xl p-5 w-full flex flex-col gap-10" onClick={(e) => e.stopPropagation()}>
        {labels.map((label, index) => (
          <div key={index}>
            <div className="text-base font-semibold">{label}</div>
            {label === "헤드라인" && <input type="text" className="text-sm placeholder:text-sm w-full mt-3 h-11 p-2.5 border border-gray-300 rounded-lg" placeholder="검색하실 헤드라인을 입력해주세요." value={headline} onChange={(e) => handleHeadlineInput(e.target.value)} autoFocus />}
            {label === "날짜" && (
              <>
                <input type="date" placeholder="날짜를 선택해주세요." className="text-sm placeholder:text-sm w-full mt-3 h-11 p-2.5 border border-gray-300 rounded-lg" onChange={(e) => setDate(e.target.value)} value={date} />
                {/* <Image src="/calendar.svg" width={16} height={16} alt="calendar" /> */}
              </>
            )}
            {label === "국가" && (
              <div className="flex flex-wrap mt-2">
                {nationsList.map((el, idx) => (
                  <button key={idx} className={`text-sm font-normal border border-gray-200 rounded-full px-3 py-1.5 m-1 ${selectedNations.includes(el.en) ? "bg-primary-light text-white" : "bg-white text-gray-700"}`} onClick={() => handleNationClick(el.en)}>
                    {el.nation}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}{" "}
        <button className="w-full h-[60px] bg-primary rounded-2xl text-white font-semibold" onClick={handleNextClick}>
          {"필터 적용하기"}
        </button>
      </div>
    </div>
  );
};

export default Modal;
