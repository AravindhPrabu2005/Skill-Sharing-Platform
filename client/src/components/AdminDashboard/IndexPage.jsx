import React from "react";

const AdminIndexpage = () => {
  return (
    <div className="bg-gray-200 h-screen font-space w-full">
      <div className="p-6">
        <p className="text-3xl">
          Welcome to <span className="font-bold text-primary">Admin Panel</span>
        </p>
      </div>
      <div className="flex gap-5 m-5">
        <article className="p-6 flex flex-col rounded-md bg-white items-center justify-center">
          <p className="font-bold">Total Users</p>
          <p className="text-3xl">0</p>
        </article>
        <article className="p-6 flex flex-col rounded-md bg-white items-center justify-center">
          <p className="font-bold">Total Courses Created</p>
          <p className="text-3xl">0</p>
        </article>
        <article className="p-6 flex flex-col rounded-md bg-white items-center justify-center">
          <p className="font-bold">Total Webinars Hosted</p>
          <p className="text-3xl">0</p>
        </article>
      </div>

      <div className="p-6">
        <p className="font-bold text-xl">Recent Activities</p>
        <div className="flex items-center h-40 justify-center">
          <p>No Recent Activities</p>
        </div>
      </div>
    </div>
  );
};

export default AdminIndexpage;