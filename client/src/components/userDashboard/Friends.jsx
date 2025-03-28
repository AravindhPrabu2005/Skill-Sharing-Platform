import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance';
import { Link } from 'react-router-dom';

const Friends = () => {

    const [Friends, setFriends] = useState(null);

    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("/api/skillbarter/posts");
        const posts = response.data;
        
        const acceptedPostIds = posts
          .filter(post => post.acceptedBy !== null)
          .map(post => post.acceptedBy);
    
        // Fetch all users concurrently
        const friendsData = await Promise.all(
          acceptedPostIds.map(async (id) => {
            const userResponse = await axiosInstance.get(`/api/users/${id}`);
            return userResponse.data;
          })
        );
    
        setFriends(friendsData);
        console.log(friendsData);
    
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    


  useEffect(()=>{
    fetchPosts();
  },[])

  return (
    <div className=' min-h-screen w-full bg-gray-200  font-space'>
        
        <h1 className='px-10 py-4 text-2xl font-bold'>My Network</h1>



          <div>
            { Friends && Friends.map((friend) => (
              <div key={friend._id} className='flex  cursor-pointer transition-all  justify-between items-center px-10 py-4 bg-white/70 mx-6  m-2'>
                <Link to={`/dashboard/chat/${friend._id}`}>
                <div className='flex gap-1 items-center'>
                  <img src={friend.profilePicture} alt={friend.name} className='h-16 w-16 rounded-full'/>
                  <span className='ml-2 font-bold text-xl'>{friend.name}</span>
                </div>
                </Link>
              </div>
            ))}
          </div>
    </div>
  )
}

export default Friends