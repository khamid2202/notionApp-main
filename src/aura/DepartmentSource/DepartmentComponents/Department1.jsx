import React from 'react'
import { useNavigate } from 'react-router-dom'

const Department1 = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-96 rounded-xl group hover:bg-slate-50 hover:shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4">
  <div className="order-1 md:order-2 flex justify-center md:justify-end">
    <img src='public/images/english-kid.jpg' alt="Placeholder" className="transition ease-in-out delay-150 w-full md:w-2/3 lg:w-1/2 rounded group-hover:scale-105"></img>
  </div>
  <div className="order-2 md:order-1 text-center md:text-left">
    <h1 className="underline-offset-8 group-hover:text-slate-800 text-4xl md:text-6xl font-bold">English</h1>
    <p className="group-hover:underline text-gray-500 text-xl md:text-3xl mt-4 ">English department for adults.</p>
    <button onClick={() => navigate("/department")} className="mt-4 px-6 py-2 rounded-full delay-150 bg-blue-500 group-hover:scale-110 hover:bg-indigo-500 duration-300 text-white">
      Click Me
    </button>
  </div>
</div>
  )
}

export default Department1
