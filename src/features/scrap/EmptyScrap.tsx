/* eslint-disable @next/next/no-img-element */
import { setMenuIndex } from "@/src/app/globalSlice";
import React from "react";
import { useDispatch } from "react-redux";

const EmptyScrap = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center items-center h-full">
        <img src="/scrap.svg" alt="scrap" />
        <h1 className="text-lg text-neutral-dark mt-2">저장된 스크랩이 없습니다.</h1>
        <button onClick={() => dispatch(setMenuIndex(1))} className="mt-5 rounded-2xl bg-primary text-white w-[80%] py-5">
          스크랩 하러 가기{" "}
        </button>
      </div>
    </div>
  );
};

export default EmptyScrap;
