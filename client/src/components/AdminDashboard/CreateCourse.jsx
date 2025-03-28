import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import AdminSidebar from "./AdminSidebar";

const CreateCourse = () => {
     const userId = localStorage.getItem("userId")
     const [formData, setFormData] = useState({
          title: "",
          description: "",
          teacher: userId,
          price: "",
          category: "",
          gmeetLink: "",
     });

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };



     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               console.log("Form data:", formData);
               
               const response = await axiosInstance.post("/courses/create", formData);
               alert("Course created successfully!");
               console.log(response.data);
          } catch (error) {
               console.error(error);
               alert("Error creating course");
          }
     };

     return (
          <div className="flex min-h-screen bg-gray-100">
               <div className="flex-1 flex justify-center items-center p-6">
                    <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
                         <h2 className="text-2xl font-semibold mb-4 text-center">Create Course</h2>
                         <form onSubmit={handleSubmit} className="space-y-4">
                              <input
                                   type="text"
                                   name="title"
                                   placeholder="Title"
                                   value={formData.title}
                                   onChange={handleChange}
                                   className="w-full p-2 border rounded"
                                   required
                              />
                              <input
                                   type="text"
                                   name="description"
                                   placeholder="Description"
                                   value={formData.description}
                                   onChange={handleChange}
                                   className="w-full p-2 border rounded"
                                   required
                              />
                              <input
                                   type="number"
                                   name="price"
                                   placeholder="Price"
                                   value={formData.price}
                                   onChange={handleChange}
                                   className="w-full p-2 border rounded"
                              />
                              <input
                                   type="text"
                                   name="category"
                                   placeholder="Category"
                                   value={formData.category}
                                   onChange={handleChange}
                                   className="w-full p-2 border rounded"
                                   required
                              />
                              <input
                                   type="text"
                                   name="gmeetLink"
                                   placeholder="Google Meet Link"
                                   value={formData.gmeetLink}
                                   onChange={handleChange}
                                   className="w-full p-2 border rounded"
                                   required
                              />
                              <button type="submit" className="w-full bg-primary text-white p-2 rounded hover:bg-blue-600">
                                   Create Course
                              </button>
                         </form>
                    </div>
               </div>
          </div>
     );
};

export default CreateCourse;