import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { BadgeIndianRupee, CirclePlay, PcCase, UserIcon } from "lucide-react";
import { motion } from "framer-motion";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const userId = localStorage.getItem("userId");
  const [allRegUsers, setAllRegUsers] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    fetchCourse();
    const interval = setInterval(() => {
      getAllregUsers();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (quiz && quiz.length > 0) {
      const quizInterval = setInterval(() => {
        setCurrentQuestionIndex((prev) => (prev + 1) % quiz.length);
        setProgress(0);
      }, 30000);

      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 1.6 : 100)); // 100% in 30s
      }, 1000);

      return () => {
        clearInterval(quizInterval);
        clearInterval(progressInterval);
      };
    }
  }, [quiz]);

  const fetchCourse = async () => {
    const res = await axiosInstance.get(`/courses/${id}`);
    setCourse(res.data);
    if (res.data.quiz) {
      // setQuiz(JSON.parse(res.data.quiz));
      // console.log(JSON.parse(res.data.quiz));
      // // set not attempted for all questions
      let quiz = JSON.parse(res.data.quiz);
      quiz.forEach((question) => {
        question.attempted = false;
      });
      setQuiz(quiz);
      
  
    }
  };

  const registerCourse = async () => {
    const uId = localStorage.getItem("userId");
    if (!uId) {
      alert("Please login to register");
      return;
    }
    const res = await axiosInstance.post("/api/registercourse/register", {
      userId: uId,
      courseId: id,
      gmeetLink: course.gmeetLink,
    });

    if (res.data.message) {
      setIsRegistered(true);
    }
  };

  const getAllregUsers = async () => {
    const res = await axiosInstance.get(`/api/registercourse/course/${id}`);
    res.data.forEach((user) => {
      if (user.user === userId) {
        setIsRegistered(true);
      }
    });
    // rank users based on points
    res.data.sort((a, b) => b.points - a.points);
    setAllRegUsers(res.data);

  };

  const inCreamentPoints = async () => {
    const res = await axiosInstance.post("/api/registercourse/increment", {
      userId: userId,
      courseId: id,
    });
    console.log(res.data);
  }

  return (
    <div className="min-h-screen overflow-y-scroll font-space w-full bg-gray-200">
      {course && (
        <div className="mx-12 my-20">
          <div className="flex gap-4">
            <img
              src={course.image}
              alt="course"
              className="border-[2px] rounded-2xl border-black h-60 w-42"
            />
            <div>
              <h1 className="font-bold text-xl">{course.title}</h1>
              <p className="my-3 flex gap-2">
                <PcCase /> {course.category}
              </p>
              <p className="my-3">{course.description}</p>
              {isRegistered ? (
                <button className="bg-primary text-white px-4 py-2 rounded-lg">
                  <a href={course.gmeetLink} target="_blank" rel="noopener noreferrer">
                    Join Course
                  </a>
                </button>
              ) : (
                <button onClick={registerCourse} className="bg-primary text-white px-4 py-2 rounded-lg">
                  Register
                </button>
              )}
            </div>
          </div>

          <div className="flex mt-4 gap-5">
            <div className="bg-white rounded-xl w-[40%] min-h-72 p-5">
              <h1 className="font-bold text-xl mb-4">Live Quiz</h1>
              {quiz && quiz.length > 0 ? (
                <div className="relative">
                  <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-lg font-bold mb-3">{quiz[currentQuestionIndex].question}</h2>
                    <ul>
                      {quiz[currentQuestionIndex].options.map((option, index) => (
                        <li onClick={()=>{
                          if(!quiz[currentQuestionIndex].attempted){
                          if(option === quiz[currentQuestionIndex].correct_option){
                            alert("Correct Answer --- You got 10 points")
                            inCreamentPoints()
                          }else{
                            alert("Wrong Answer")
                          }
                          quiz[currentQuestionIndex].attempted = true;
                        }
                        else{
                          alert("Question already attempted")
                        }
                        }} key={index}  className="p-2 border rounded-md my-2 bg-gray-100 cursor-pointer">
                          {option}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
               
                  <div className="w-full bg-gray-300 h-2 mt-4 rounded-lg">
                    <motion.div
                      className="h-2 bg-primary rounded-lg"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-center">No Quiz Available</div>
              )}
            </div>

            {/* Leaderboard Section */}
            <div className="bg-white w-[25%] flex flex-col gap-2 rounded-xl min-h-72 p-5">
              <h1 className="font-bold text-xl">Leaderboard</h1>
              {allRegUsers &&
                allRegUsers.map((user, index) => (
                  <div key={index} className="flex cursor-pointer justify-between items-center p-2">
                    <div className="flex gap-2">
                      <UserIcon />
                      <p className="font-bold">{user.name}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <CirclePlay />
                      <p>{user.points}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
