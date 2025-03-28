import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import Flow from "../Flow";

const AiTutor = () => {
  const [selected, setSelected] = useState("genie");
  const [chat, setChat] = useState([]);

  const [prompt, setPrompt] = useState("");
  const [technology, setTechnlogy] = useState("");
  const [isTech ,setIsTech] =useState(false)
  const handleSend = async () => {
    try {
      const res = await axiosInstance.post("/ai", {
        prompt: prompt + "," + " " + technology,
      });
      console.log(res.data);
      
      if (res.data.result) {
        const answer = JSON.parse(res.data.result).answer;
        setChat([
          ...chat,
          { role: "model", text: answer },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [input, setInput] = useState("");
   const [skill, setSkill] = useState("");
   const [isSkill, setIsSkill] = useState(false);
  const [roadMap ,setroadmap] = useState(null);

  const handleGenrate = async () => {
    try {
      const res = await axiosInstance.post("/roadmap", {
        technology: skill,
      });
      console.log(res.data);
      
      if (res.data.result) {
        const blocks = JSON.parse(res.data.result).blocks;
        setroadmap(blocks)
        console.log(blocks);
        
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className=" bg-gray-100 font-space h-screen w-full ">
      <div className=" flex w-full mt-12 items-center justify-center gap-2 ">
        <p
          onClick={() => {
            setSelected("genie");
          }}
          className={` ${
            selected == "genie"
              ? "bg-primary text-white"
              : " bg-white text-primary"
          } cursor-pointer rounded-full text-xl  px-2 py-1`}
        >
          Doubt Genie
        </p>
        <p
          onClick={() => {
            setSelected("roadmap");
            setroadmap(null)
            setSkill("")
            setIsSkill(false)
          }}
          className={` ${
            selected == "roadmap"
              ? "bg-primary text-white"
              : " bg-white text-primary"
          } cursor-pointer rounded-full  text-xl  px-2 py-1`}
        >
          RoadMap Ai
        </p>
      </div>

      {selected == "genie" ? <div>
    
       
       {
        !isTech ? <div className="flex justify-center items-center h-96">
        <input
          type="text"
          placeholder="Enter the technology"
          className="border-2 border-primary p-2 rounded-lg"
          value={technology}
          onChange={(e) => setTechnlogy(e.target.value)}
        />
        <button
          className="bg-primary text-white p-2 rounded-lg ml-2"
          onClick={() => setIsTech(true)}
        >
          Set
        </button>
        </div> : <div className="m-10 " >
          <p className=" text-xl text-center capitalize font-bold">{technology}</p>
        </div>
       }
   
        <div className=" absolute bottom-10 left-[50%] flex items-center justify-center">
           <input value={input} onChange={(e)=>{
                setInput(e.target.value)
           }} className=" w-80 h-10 border-0  rounded-full " type="text" />
            <button  onClick={()=>{
                setPrompt(input)
                handleSend()
                chat.push({role:"user",text:input})
                setInput("")
            }} className=" bg-primary text-white p-2 rounded-full ml-2">Ask</button>
        </div>
   
        <div className="flex flex-col justify-center  w-full mx-5 gap-2 mt-10">
          {chat.map((item, index) => {
            return (
              <div
                key={index}
                className={`${
                  item.role == "user"
                    ? "bg-primary text-white ml-32 rounded-tl-xl rounded-br-xl"
                    : "bg-white text-primary ml-96  rounded-tr-xl rounded-bl-xl"
                } p-2 w-80`}
              >
                {item.text}
              </div>
            );
          })}
        </div>

      </div> : <div>
        
        {
        !isSkill ? <div className="flex flex-col justify-center items-center h-96">
            
          <div>
        <input
          type="text"
          placeholder="Enter the technology"
          className="border-2 border-primary p-2 rounded-lg"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <button
          className="bg-primary text-white p-2 rounded-lg ml-2"
          onClick={() => {setIsSkill(true)
           handleGenrate()
          }
          }
        >
          Generate Roadmap
        </button>
          </div>

       
        </div> : <div className="m-10 " >
          <p className=" text-xl text-center capitalize font-bold">RoadMap for {skill}</p>
        
           {
             roadMap  && (
              <Flow roadmap={roadMap} />
             )
           }
        </div>
        }
        </div>}

       

    </div>
  );
};

export default AiTutor;
