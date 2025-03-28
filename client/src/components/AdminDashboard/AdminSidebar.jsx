import React, { useState, useEffect } from "react";
import { BarChart, BookOpen, Users, Settings, LogOut, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

const AdminSidebar = () => {
  const nav = useNavigate();
  const adminId = localStorage.getItem("adminId");
  const [adminData, setAdminData] = useState({ name: "", profilePicture: "" });

  const fetchAdminData = async () => {
    try {
      const res = await axiosInstance.get(`/api/admins/${adminId}`);
      if (res.data) {
        setAdminData(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <nav className="h-screen w-[20%] font-space bg-white shadow-lg">
      <h1 className="p-9 font-bold text-xl">Admin Panel</h1>

      <ul className="px-5 flex flex-col gap-7">
        <Link className="flex gap-2" to={"/admin/dashboard"}>
          <BarChart size={25} />
          <p className="text-lg font-bold">Dashboard</p>
        </Link>
        <Link className="flex gap-2" to={"/admin/course"}>
          <BookOpen size={25} />
          <p className="text-lg font-bold">Create Courses</p>
        </Link>
        <Link className="flex gap-2" to={"/admin/Manage"}>
          <BookOpen size={25} />
          <p className="text-lg font-bold">Manage Courses</p>
        </Link>
        <Link className="flex gap-2" to={"/admin/users"}>
          <Users size={25} />
          <p className="text-lg font-bold">Manage Users</p>
        </Link>
        <Link onClick={() => {
          localStorage.clear();
          nav("/");
        }} className="flex gap-2" to={"/admin/settings"}>
          <Settings size={25} />
          <p className="text-lg font-bold">Settings</p>
        </Link>
      </ul>

      <div className="absolute bottom-16 left-0 p-4 flex items-center gap-3">
        {adminData.profilePicture && (
          <img src={adminData.profilePicture} alt="profile" className="w-10 h-10 rounded-full" />
        )}
        {adminData.name && (
          <Link to={`/admin/profile/${adminId}`}>
            <p className="text-md font-semibold">{adminData.name}</p>
          </Link>
        )}
      </div>

      <div
        onClick={() => {
          localStorage.clear();
          nav("/login");
        }}
        className="cursor-pointer absolute bottom-0 left-0 flex gap-3 p-4"
      >
        <LogOut size={20} />
        <p className="font-bold">Log Out</p>
      </div>
    </nav>
  );
};

export default AdminSidebar;
