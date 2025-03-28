import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState();

  const handleUserData = async () => {
    try {
      console.log(id);
      const res = await axiosInstance.get(`/api/users/${id}`);
      console.log(res.data);
      setUserData(res.data);
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);

  return (
    <div>
      <img
        className=" w-full h-44 rounded-2xl p-4 object-cover"
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIEA7QMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAABAgADBAUGB//EACwQAQEAAQMDAwIFBQEAAAAAAAABAgMRIQQSMUFRgQUiQmJxkfBSU2FyoSP/xAAaAQADAQEBAQAAAAAAAAAAAAABAgMABAUG/8QAHxEBAQEBAQACAgMAAAAAAAAAAAECEQMSMSFBBCJC/9oADAMBAAIRAxEAPwD+Kb5HepLu4MVLkd77oLGPdfdu7L3DN1j3U92XulmZXdl/UZchCInc7pJox3/Md/zJMMKpardLHkNFd2XuZckk8FW53TDDRlSqx7kx0xm3KuZ00VjxyvdJjpisVud0wzyeCqVeMuV+06Wlc+Z4erHDHHw6vLxu/wA36UzjqNPS25z5rqzO3OJici8nH5Ubis+JrxGIYnRhYKkGfkWioxPILMzGEsFQYxkIJ4aMQREmJnkwW6qKiYvCK5GKxm3LolUdWZxWEwGKQxejQ0d/uy8K0NDxln8R6Hd4eHf7VbGL+2k448Fmd8i8nGZmZn5OszPh68LoYyLkJ8RExUzHk4aMQwiWaQjBLMx+DCzMIlgWYwwKxh5OjDhOXWJMdGZxSLhiYqLQ0VHq6fR8ZZfEGhpeMsvh6I7/AA8P9VfGVxhC9CVeFmYYLFnfHpeoy08c8dHLsy8ZWbS/pfUbZGfjO1UxWHyF85HhQAhPUFiDsmaMWY0hizMZmILC0YMwKYPd9N0umy1sdTr7lOnw+7LHC7Zan5cfbf3vj/lMnRk6rQ6HUnQ3rtb/AM+n7uzTt86uU8zGesm83vpvPWx57d69n1b6lqfU+qmrnMNPT08Jp6Ojpz7dLTnjHGfP6222vEvJycUhVEmKQypOXq0NP8WXxEaOn+LL4jvK7fDz/dVzl1lVHOVUehmryrlVERVsnN4UmuHXGyzxw5zy2nt6vNqdRZxp/u422827pb/lSfiEvrPqPr6H1nS6LHfo+i0r1H9/qJ33H/XHbaX/ADd3h6vq+p67Xy1+s1s9XVv4tTLnZ5or+ezl7bflftK6tfGChs8vWXmAbK2ZK5MGITs4ZiCAszM1Zm3G7Ft6xKVQIxxdN95IiKWyeQmCGeVIJj0aWHEuSNPHbm+fR1ldXlid7VMx0i45xUrtmlo6SrjnE6mrMJt6+6nzmZ2m+XHbLUmE58+zz56uWpeeJ7Ody3u98tEN+2tkurVRUTFFyBihFT+cbqQ0fJTVCuXWXmRLEOfUEMzIahoGIJYLDdrWTtZiDGYxUEMPmGhIhnlSGMdsMduUYzbl0lXxk8XKqVEMrpzTx0lVK5yoy1N+J4nk19JmGuuOmertxHP1TFRK7uifLqouIiopkyp5VBDFYaKikr/dTJ4+RQ3c26O+PJlYNuLk5tcN1gLQ5t0etaGZz6ppWIUWM0igykhiQRgmLxgxils5NFRURFRaU8VFXLZzt7U3Luo304PV5Z9yRDE+20FxURFRSCuLiIpbJ4uFMpi0PFylMMUlPHydguxNT3l4sSFBybycBQ2c+smDbFktZMIWYpiwIiVRMVDQYoxJh5TKa5J3A/NukwGBG6VRMVFIaKiomGeVMmi91REVFYeLioiLi2TxUMEMUh4+YAxtvFgoLOTZ4AzOXRoGZkqZj6MyZgWZhJjMYYqMzGMzQMAVU9fk+7MaMuefmNPE/RmPk8VDPLMrDqiozKQ0VFxmWyeKhhZWHj//2Q=="
        alt=""
      />
      {userData && (
        <div>
        <div className=" flex gap-2 items-center">
          <img className=" h-32 w-32" src={userData.profilePicture} alt="" />
          <div>
            <h1 className=" font-space font-bold text-xl">{userData.name}</h1>
            <h1 className=" font-space ">{userData.bio}</h1>
          </div>
          
        </div>
        <p className="m-6 text-xl font-space font-bold">Skills</p>
        <div className=" flex gap-3 m-6">
            {
                userData.skills && userData.skills.map((skill)=>(
               <p className=" bg-primary px-2 py-1 rounded-full text-white">{skill}</p>
                ))
            }
        </div>
      
         <div className=" px-6">
         <p className=" text-xl font-space font-bold">Courses Learned</p>
                <div className=" w-full flex  items-center justify-center">
                    <p>No Courses Learned</p>
                </div>
         </div>

        </div>
      )}
    </div>
  );
};

export default Profile;
