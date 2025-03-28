import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { FaCommentDots, FaUserCircle, FaThumbsUp } from "react-icons/fa";

const Community = () => {
  const userId = localStorage.getItem("userId");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("/api/community/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handlePostSubmit = async () => {
    if (!newPost.trim()) return;
    try {
      const response = await axiosInstance.post("/api/community/posts", {
        user: userId,
        content: newPost,
      });
      setPosts([response.data, ...posts]);
      setNewPost("");
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await axiosInstance.post(
        `/api/community/posts/${id}/like`
      );
      setPosts(posts.map((post) => (post._id === id ? response.data : post)));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 max-w-5xl mx-auto p-6 flex flex-col">
        <h2 className="text-3xl font-bold mb-6">Community Discussions</h2>

        <div className="flex-grow overflow-y-auto space-y-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <div className="flex items-center mb-3">
                {post.user?.avatar ? (
                  <img
                    src={post.user.avatar}
                    alt="User"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-500 mr-3" />
                )}
                <p className="font-semibold text-lg">
                  {post.user?.name || "Anonymous"}
                </p>
              </div>
              <p className="text-gray-700">{post.content}</p>
              <div className="flex items-center mt-3 space-x-4 text-gray-600">
                <div
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={() => handleLike(post._id)}
                >
                  <FaThumbsUp className="text-blue-500" />
                  <span>{post.likes || 0}</span>
                </div>
                <div className="flex items-center space-x-1 cursor-pointer">
                  <FaCommentDots className="text-gray-500" />
                  <span>{post.comments?.length || 0} Comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-1/5 w-4/5 bg-white p-4 border-t shadow-lg flex items-center">
          <textarea
            className="flex-grow p-2 border rounded-md mr-4"
            rows="2"
            placeholder="Share your thoughts..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          ></textarea>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-4"
            onClick={handlePostSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
