import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LandingPage = () => {

   const nav = useNavigate()
  return (
    <main className=' font-space'>
     
       <nav className='flex justify-between p-10'>
        <p className='text-2xl font-space font-bold'>SkillHive</p>
        <Link to='/login'>
          <button className='bg-primary text-white px-4 py-2 rounded-lg'>Login</button>
        </Link>
       </nav>
    
        <div className=' h-[70vh] flex flex-col gap-10 items-center justify-center w-full'>
              <h1 className=' text-4xl font-space font-bold'>
              Learn, Teach, Grow – Share Your Skills with the World!
              </h1>
        
            <div className=' flex gap-10'>
                <Link to='/adminSignup'>
                 <button className='bg-primary text-white px-3 py-2 rounded-lg'>Join as Instructor</button>
                </Link>
                <Link to='/signup'>
                  <button>Join as Learner</button>
                  </Link>
            </div>
        </div>

    </main>
  )
}

export default LandingPage
