import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const fetchCourse = async () => {
    const res = await axiosInstance.get(`/courses/${id}`);
    setCourse(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className=" min-h-screen overflow-y-scroll font-space  w-full bg-gray-200">
      {course && (
        <div className=" mx-12 my-20">
          <div className="flex gap-4">
            <img
              src={course.image}
              alt="course"
              className=" border-[2px] rounded-2xl  border-black h-60 w-42"
            />
            <div>
              <h1 className=" font-bold text-xl">{course.title}</h1>
              <p className="my-3">{course.description}</p>
              <button className=" bg-primary px-2 py-1 rounded-lg text-white">
                Join Now
              </button>
            </div>
          </div>

          <div className="flex mt-4 gap-5">
            <div className="bg-white rounded-xl w-[40%] min-h-72">
   
              <h1 className="p-5 font-bold flex  text-xl">Live Quiz</h1>
               <div>
                <img className="w-60 h-60 object-cover mx-24" src="https://png.pngtree.com/png-clipart/20230507/original/pngtree-quiz-time-bubble-speech-banner-vector-design-png-image_9147207.png" alt="" />
               </div>
            </div>

            <div className="bg-white w-[20%] flex flex-col gap-2 items-center justify-center rounded-xl min-h-72">

            <img className="w-20 h-20 object-contain mx-24" src="data:image/png;base64,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" alt="" />
            <h1 className="p-5 font-bold flex  text-xl">Leaderboard</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
