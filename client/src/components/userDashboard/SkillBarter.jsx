import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { FaPlus, FaTimes, FaCheck } from "react-icons/fa";

const SkillBarter = () => {
  const userId = localStorage.getItem("userId");
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [requiredSkill, setRequiredSkill] = useState("");
  const [teachableSkill, setTeachableSkill] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("/api/skillbarter/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handlePostSubmit = async () => {
    if (!requiredSkill.trim() || !teachableSkill.trim()) return;
    try {
      const response = await axiosInstance.post("/api/skillbarter/create", {
        user: userId,
        requiredSkill,
        teachableSkill
      });
      setPosts([response.data, ...posts]);
      setShowModal(false);
      setRequiredSkill("");
      setTeachableSkill("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleAcceptDeal = async (id) => {
    try {
      const response = await axiosInstance.post(`/accept/${id}`, { userId });
      setPosts(posts.map(post => post._id === id ? response.data : post));
    } catch (error) {
      console.error("Error accepting deal:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Skill Barter Exchange</h2>
      
      <div className="w-full max-w-md h-[500px] overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold uppercase">
                {post.user?.name ? post.user.name.charAt(0) : "A"}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{post.user?.name || "Anonymous"}</h3>
            </div>
            <p className="text-gray-600 text-sm">Wants to learn: <span className="font-medium text-gray-800">{post.requiredSkill}</span></p>
            <p className="text-gray-600 text-sm">Can teach: <span className="font-medium text-gray-800">{post.teachableSkill}</span></p>
            
            {post.acceptedBy ? (
              <p className="text-green-600 mt-3">✅ Deal accepted</p>
            ) : (
              <button onClick={() => handleAcceptDeal(post._id)} className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg flex items-center shadow-md hover:bg-green-600 transition">
                <FaCheck className="mr-2" /> Accept Deal
              </button>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Create Skill Barter</h3>
            <input
              type="text"
              placeholder="Skill you need"
              value={requiredSkill}
              onChange={(e) => setRequiredSkill(e.target.value)}
              className="w-full p-3 border rounded-md mb-3 focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Skill you can teach"
              value={teachableSkill}
              onChange={(e) => setTeachableSkill(e.target.value)}
              className="w-full p-3 border rounded-md mb-4 focus:ring focus:ring-blue-300"
            />
            <div className="flex justify-between">
              <button onClick={handlePostSubmit} className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                Post
              </button>
              <button onClick={() => setShowModal(false)} className="px-5 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition">
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button onClick={() => setShowModal(true)} className="px-5 py-3 fixed right-5 bottom-10 flex gap-1 items-center bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition">
        <FaPlus className="mr-2" /> Post a Skill Barter
      </button>
    </div>
  );
};

export default SkillBarter;