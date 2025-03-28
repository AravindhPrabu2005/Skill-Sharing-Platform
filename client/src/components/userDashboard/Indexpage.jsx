import React from "react";
import SideBar from "../SideBar";

const Indexpage = () => {
  return (
    <div className=" bg-gray-200 h-screen font-space w-full ">
      <div className="p-6">
        <p className=" text-3xl">
          WellCome To <span className="font-bold text-primary">SkillHive</span>
        </p>
      </div>
      <div className=" flex gap-5 m-5 ">
        <article className=" p-6 flex flex-col rounded-md bg-white items-center justify-center">
          <p className=" font-bold">Total Courses Enrolled</p>
          <p className=" text-3xl">0</p>
        </article>
        <article className=" p-6 flex flex-col rounded-md bg-white items-center justify-center">
          <p className=" font-bold">Total Courses Completed</p>
          <p className=" text-3xl">0</p>
        </article>
        <article className=" p-6 flex flex-col rounded-md bg-white items-center justify-center">
          <p className=" font-bold">Total Webinars Attented</p>
          <p className=" text-3xl">0</p>
        </article>
      </div>

      <div className="p-6 ">
        <p className=" font-bold text-xl">Recent Courses</p>

        <div className="flex items-center h-40 justify-center">
          <p>No Courses Available</p>
        </div>
      </div>
    </div>
  );
};

export default Indexpage;
