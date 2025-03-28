import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";

const Mycourses = () => {
  // const courses = [
  //   {
  //     name: "Mastering React.js",
  //     type: "Full Course",
  //     coverImg:
  //       "data:image/jpeg;base64,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XzkvhEokbDipQ8m33Z0rXEsm6CXAC+XFBrBtuo+6fced/tQ7FzOGO2LFiviw49+f4luab7RNqRxiJtY/CAAC5kTngDK2NzC49pJPFcsiC0khcS5xLnOJc5ziS5zibkknMkkk3KqiICIiAiIgIiICIiDIJVHPVXPVF0yz9GJiklQiLm2IiICIiAiIgLO2HtI0tRFUNaHGJ4eGkkAkdBI3LBRBajkdE5j2Gzo3Mcx2Vw5hDmu7iAVutocoGyMlbHSxwuqCDUPY6R2OzxJhY15IhYXgOLRfcBewstGiDe0vKaRkccBbihbBNTviL3YZGzSyS4yPyva57SHDP2B1rQubcW4WUog6La/KgTNmw0rI5KlsLJ5OckdibCYyyzDZrTeJmdid9rXusWfa8UkEcUlKHSQxOijm56QEAySSAmMey4h0h371p0QbrZW3hExkcsDZhE98kJ5yWN8TpABIMURBcx2FpLeu+ea8ht2QyVUsgD31cckch3BvOyxyEtHAxgAdRWqRBu9m8ppYPuvNgf2pn3klsrKh4dIx7d2EgW777wFjS7XLjWewP7w3dmfY/uWVOXXmzD2Fa1EG+ruVMs09JUSNaZKXmsxlzropzNjfYZOcXHERvNz0rA23VwzkmOmEDnF5eRLJJiL89z8m2N93WsBEG+25yokqxMJW3Ek/3iO7nHmHEFr2sJ3sc0gFuQu0FUptvNjheyOljZLJTmmkma+QB8ZGEudDfCZS3856fatdaREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf/2Q==",
  //     instructor: "John Doe",
  //   },
  //   {
  //     name: "Node.js Backend Development",
  //     type: "Webinar",
  //     coverImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLJ3Y3yz5X_M4_lyBnLrlo2_qtqijBfIQLA&s",
  //     instructor: "Jane Smith",
  //   },
  //   {
  //     name: "AI-Powered Web Apps with TensorFlow.js",
  //     type: "Full Course",
  //     coverImg: "https://i.ytimg.com/vi/QPDsEtUK_D4/maxresdefault.jpg",
  //     instructor: "Alice Johnson",
  //   },
  //   {
  //     name: "Ethereum Smart Contracts with Solidity",
  //     type: "Webinar",
  //     coverImg: "https://i.ytimg.com/vi/c6Iblz2kxyE/maxresdefault.jpg",
  //     instructor: "Bob Brown",
  //   },
  //   {
  //     name: "Full Stack Development with MERN",
  //     type: "Full Course",
  //     coverImg:
  //       "https://miro.medium.com/v2/resize:fit:1200/1*t7GMvlZmrR_eZHgYZ058gQ.png",
  //     instructor: "Charlie White",
  //   },
  //   {
  //     name: "Cybersecurity in IoT Networks",
  //     type: "Webinar",
  //     coverImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD75lPLu9tq_2QS4RBoAAg_snCJ1ZCZrtiBw&s",
  //     instructor: "David Lee",
  //   },
  //   {
  //     name: "Data Science for Developers",
  //     type: "Full Course",
  //     coverImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN_SqRmdzL6USGXssZ8LnQ9jUyFjVJpTyhwQ&s",
  //     instructor: "Emma Watson",
  //   },
  // ];
   const [courses, setCourses] = useState([]);
  const nav = useNavigate()
   const fetchCourses = async () => {
      try {
         const res = await axiosInstance.get("/courses");
          setCourses(res.data);
          console.log(res.data);
          
      } catch (error) {
          console.log(error);

      }
   }

   useEffect(() => {
      fetchCourses();
   }, []);

  return (
    <div className=" bg-gray-200 min-h-screen w-full   font-space ">
      <div className=" p-6">
        <p className="text-xl  font-semibold ">Available Courses</p>
      </div>

      <div className=" flex flex-wrap">
        {/* {courses.map((course, index) => (
          <div key={index} className="flex w-[20%] gap-5 py-1 m-5">
            <article className="px-3 flex flex-col rounded-md bg-white items-center justify-center">
              <img
                src={course.coverImg}
                alt={course.name}
                className=" object-cover my-2"
              />
              <p className="font-bold py-2 ">{course.name}</p>
              <p className="text-sm">Instructor : {course.instructor}</p>
              <p className="text-sm  font-bold">{course.type}</p>

              <div>
                   <button className=" bg-primary  py-1 text-sm px-2 my-2 text-white rounded-2xl ">
                    Join Course
                   </button>
              </div>
            </article>
              
          </div>
        ))} */}
        {courses.map((course, index) => (
          <div key={index} className="flex w-[20%] gap-5 py-1 m-5">
            <article onClick={()=>{
             nav(`/dashboard/course/${course._id}`)
            }} className="px-3 cursor-pointer flex flex-col rounded-md bg-white items-center justify-center">
              <img
                src={course.image}
                alt={course.title}
                className=" object-cover my-2"
              />
              <p className="font-bold py-2 ">{course.title}</p>
              <div>

              <p className="text-sm  font-bold   text-primary">Category : {course.category}</p>
              <p className="text-sm ">{new Date(course.createdAt).toLocaleDateString() + " "+
                new Date(course.createdAt).toLocaleTimeString() }</p>
              </div>

              <div>
                   <button className=" bg-primary  py-1 text-sm px-2 my-2 text-white rounded-2xl ">
                    Join Course
                   </button>
              </div>
            </article>
              
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mycourses;
