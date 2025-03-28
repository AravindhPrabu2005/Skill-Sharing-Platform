import React, { useEffect, useState } from "react";
import {
  BookOpen,
  CalendarSearch,
  House,
  LogOut,
  Settings,
  Sparkle,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
const SideBar = () => {
  // <Route path="home" index element={<Indexpage />} />
  // <Route path="aitutor" element={<AiTutor />} />
  // <Route path="mycourses" element={<Mycourses />} />
  // <Route path="schedule" element={<Schedule />} />

  const nav = useNavigate();
  const userId = localStorage.getItem("userId");
  const [isFilled, setIsFilled] = useState(true);
  const [curSkill, setSkill] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    skills: [],
    description: "",
  });

  const handleUserData = async () => {
    try {
      console.log(userId);

      const res = await axiosInstance.get(`/api/users/${userId}`);
      console.log(res.data);

      if (res.data.message) {
        setIsFilled(false);
      } else {
        setUserData(res.data);
        console.log(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post(`/api/users/create`, {
        id: userId,
        name: userData.name,
        bio: userData.bio,
        skills: userData.skills,
      });
      console.log(res.data);
      setIsFilled(true);
      handleUserData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);

  return (
    <nav className=" h-screen  w-[20%]  font-space bg-white">
      {
        // get user name , bio , skills as arr  , descrition
        !isFilled && (
          <div className=" flex items-center justify-center   backdrop-blur-sm left-0 absolute h-screen w-[100vw]">
            <div className=" bg-white rounded-md">
              <div className="p-5">
                <h1 className="text-2xl font-bold">Please fill your profile</h1>
                <p className="text-lg">
                  You need to fill your profile to get started
                </p>

                <div className="flex flex-col gap-5 mt-5">
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => {
                      setUserData({ ...userData, name: e.target.value });
                    }}
                    className="border p-2"
                    placeholder="Name"
                  />
                  <input
                    onChange={(e) => {
                      setUserData({ ...userData, bio: e.target.value });
                    }}
                    type="text"
                    value={userData.bio}
                    className="border p-2"
                    placeholder="Bio"
                  />
                  <div className="m-2">
                    {userData.skills.map((skill) => (
                      <span className="bg-gray-200 p-1 m-2 rounded-md">
                        {skill}
                      </span>
                    ))}
                    <input
                      type="text"
                      value={curSkill}
                      onChange={(e) => {
                        setSkill(e.target.value);
                      }}
                      className="border p-2"
                      placeholder="Skills"
                    />
                    <button
                      onClick={() => {
                        setUserData({
                          ...userData,
                          skills: [...userData.skills, curSkill],
                        });
                        setSkill("");
                      }}
                    >
                      Add Skill
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      handleSubmit();
                    }}
                    className="bg-primary text-white p-2 rounded-md"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
      <div>
        <h1 className="p-9 font-space font-bold  text-xl">SkillHive</h1>

        <ul className=" px-5 flex flex-col gap-7 ">
          <Link className=" flex gap-2" to={"/dashboard/home"}>
            <House size={25} />
            <p className="text-lg font-bold">Home </p>
          </Link>
          <Link className=" flex gap-2" to={"/dashboard/mycourses"}>
            <BookOpen size={25} />
            <p className="text-lg font-bold">Learning</p>
          </Link>
          <Link className=" flex gap-2" to={"/dashboard/schedule"}>
            <CalendarSearch size={25} />
            <p className="text-lg font-bold">My Schedule</p>
          </Link>
          <Link className=" flex gap-2" to={"/dashboard/aitutor"}>
            <Sparkles size={25} />
            <p className="text-lg font-bold">AI Tutor</p>
          </Link>
          <Link className=" flex gap-2" to={"/dashboard/settings"}>
            <Settings size={25} />
            <p className="text-lg font-bold">Settings</p>
          </Link>
        </ul>
      </div>

      <div className="absolute cursor-pointer items-center justify-center flex p-4 bottom-10 left-0 ">
        {userData.profilePicture && (
          <img
            src={userData.profilePicture}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
        )}
        {userData.name && <Link to={`/profile/${userId}`}>
          <p className="text-md font-semibold">{userData.name}</p>
        </Link>}
      </div>
      <div
        onClick={() => {
          localStorage.clear();
          nav("/");
        }}
        className=" cursor-pointer absolute bottom-0 left-0 flex gap-3  p-4"
      >
        <LogOut size={20} />
        <p className=" font-bold">LogOut</p>
      </div>
    </nav>
  );
};

export default SideBar;
