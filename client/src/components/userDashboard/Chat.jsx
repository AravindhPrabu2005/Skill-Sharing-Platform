import React from 'react'
import { useParams } from 'react-router-dom'

const Chat = () => {
     const {id} = useParams()
  return (
  <div className='w-full min-h-screen  font-space bg-gray-200'>
    <h1 className='text-2xl font-bold text-center mt-6'>Chat with {id}</h1>


     <div className=' absolute bottom-6  flex gap-3 left-[50%]'>
           <input type="text" 
            placeholder='Type a message'
            className='w-96 h-12 border-2 border-gray-300 rounded-lg px-4'
           />
            <button className='bg-primary text-white h-12 w-20 rounded-xl'>Send</button>
     </div>

  </div>
  )
}

export default Chat