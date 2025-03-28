import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import AdminSidebar from "./AdminSidebar";

const ManageCourses = () => {
     const [courses, setCourses] = useState([]);
     const [loading, setLoading] = useState(true);
     const [userId, setUserId] = useState(null);

     useEffect(() => {
          const storedUserId = localStorage.getItem("userId");
          if (storedUserId) {
               setUserId(storedUserId);
          }
     }, []);

     useEffect(() => {
          if (!userId) return;

          const fetchCourses = async () => {
               try {
                    const response = await axiosInstance.get(`courses/admin/${userId}`);
                    setCourses(response.data);
               } catch (error) {
                    console.error("Error fetching courses:", error);
               } finally {
                    setLoading(false);
               }
          };
          fetchCourses();
     }, [userId]);

     return (
          <div className="flex h-screen">
               <div className="flex-1 p-6 max-w-5xl mx-auto overflow-y-auto">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Created Courses</h2>
                    {loading ? (
                         <p className="text-gray-600">Loading...</p>
                    ) : courses.length === 0 ? (
                         <p className="text-gray-600">No courses found.</p>
                    ) : (
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {courses.map((course) => (
                                   <div key={course._id} className="border p-5 rounded-lg shadow-lg bg-white">
                                        <h3 className="text-xl font-semibold text-blue-600">{course.title}</h3>
                                        <p className="text-gray-700 mt-2">{course.description}</p>
                                        <p className="mt-2 text-sm text-gray-600"><strong>Category:</strong> {course.category}</p>
                                        <p className="mt-2 text-sm text-gray-600"><strong>Price:</strong> ${course.price}</p>
                                        <p className="mt-2 text-sm text-gray-600"><strong>Ratings:</strong> {course.ratings} ⭐</p>
                                        <p className="mt-2 text-sm text-gray-600"><strong>Google Meet Link:</strong> <a href={course.gmeetLink} className="text-blue-500" target="_blank" rel="noopener noreferrer">Join</a></p>
                                        <p className="mt-2 text-sm text-gray-600"><strong>Students Enrolled:</strong> {course.students.length}</p>
                                        <div className="mt-3 border-t pt-3">
                                             <h4 className="text-lg font-medium">Reviews</h4>
                                             {course.reviews.length === 0 ? (
                                                  <p className="text-sm text-gray-500">No reviews yet.</p>
                                             ) : (
                                                  <ul className="mt-2 space-y-2">
                                                       {course.reviews.map((review, index) => (
                                                            <li key={index} className="bg-gray-100 p-3 rounded-md">
                                                                 <p className="text-gray-800"><strong>Rating:</strong> {review.rating} ⭐</p>
                                                                 <p className="text-gray-700"><strong>Comment:</strong> {review.comment}</p>
                                                            </li>
                                                       ))}
                                                  </ul>
                                             )}
                                        </div>
                                   </div>
                              ))}
                         </div>
                    )}
               </div>
          </div>
     );
};

export default ManageCourses;
