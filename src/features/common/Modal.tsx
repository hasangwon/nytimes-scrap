import { useState } from "react";

const labels: string[] = ["헤드라인", "날짜", "국가"];
const nations: { nation: string; en: string }[] = [
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
  const [headline, setHeadline] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [selectedNations, setSelectedNations] = useState<string[]>([]);

  const handleHeadlineInput = (input: string) => {
    setHeadline(input);
  };

  const handleNationClick = (item: string) => {
    if (selectedNations.includes(item)) {
      const newNations = selectedNations.filter((el) => el !== item);
      setSelectedNations(newNations);
    } else {
      setSelectedNations((val) => [...val, item]);
    }
  };

  const handleNextClick = () => {
    const parsedDate = date.replaceAll("-", "");
    const result = {
      headline: headline,
      date: parsedDate,
      nations: selectedNations,
    };

    onNextClick(headline, date, selectedNations);
    onCancelClick();
  };

  return (
    <>
      {1 && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-5`} onClick={onCancelClick}>
          <div className="max-w-[560px] bg-white rounded-2xl p-5 w-full flex flex-col gap-10" onClick={(e) => e.stopPropagation()}>
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
                    {nations.map((el, idx) => (
                      <button key={idx} className={`text-sm font-normal border border-gray-200 rounded-full px-3 py-1.5 m-1 ${selectedNations.includes(el.en) ? "bg-[#82B0F4] text-white" : "bg-white text-gray-700"}`} onClick={() => handleNationClick(el.en)}>
                        {el.nation}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}{" "}
            <button className="w-full h-[60px] bg-[#3478F6] rounded-2xl text-white font-semibold" onClick={handleNextClick}>
              {"필터 적용하기"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
