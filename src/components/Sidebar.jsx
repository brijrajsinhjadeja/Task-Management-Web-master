import { GrTask } from "react-icons/gr";
import { MdDashboard, MdLogin, MdOutlineTaskAlt, MdAddTask, MdPendingActions, MdCloudDone, MdOutlineAccessTimeFilled, MdQueryStats } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { Link } from "react-router-dom";
import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';


const Sidebar = () => {
    
    return (
       <div className="sticky top-0 z-50 py-3 backdrop-blur-lg  border-b border-neutral-750/80">
            <div className="flex items-center gap-2 justify-center h-16 text-white hover:text-orange-500 text-2xl font-bold mt-6">
                <GrTask />
                <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>
                    TaskiFy
                </span>
            </div>
            <nav className="  gap-10 justify-start ">
                <ul className="py-6 flex flex-col justify-start">
                    <Link to='/' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-orange-500 to-red-900 cursor-pointer flex justify-start items-center gap-2">
                        <MdDashboard className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>

                            Dashboard

                        </span>
                    </Link>
                    <Link to='/completeTask' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-orange-500 cursor-pointer flex justify-start items-center gap-2">
                        <MdOutlineTaskAlt className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>

                            Completed Tasks

                        </span>
                    </Link>
                    <Link to='/pendingTask' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-orange-500 cursor-pointer flex justify-start items-center gap-2">
                        <MdPendingActions className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>

                            Pending Tasks

                        </span>
                    </Link>
                    <Link to='/inProgressTask' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-orange-500 cursor-pointer flex justify-start items-center gap-2">
                        <GrInProgress className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>

                            In Progress Tasks

                        </span>
                    </Link>
                    <Link to='/deployedTask' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-orange-500 cursor-pointer flex justify-start items-center gap-2">
                        <MdCloudDone className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>

                            Deployed Tasks

                        </span>
                    </Link>
                    <Link to='/deferredTask' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-orange-500 cursor-pointer flex justify-start items-center gap-2">
                        < MdOutlineAccessTimeFilled className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>

                            Deferred Tasks

                        </span>
                    </Link>

                    <Link to='/addTask' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-orange-500 cursor-pointer flex justify-start items-center gap-2">
                        <MdAddTask className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>

                            Add New Tasks

                        </span>
                    </Link>
                    <Link to='/statsTask' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-orange-500 cursor-pointer flex justify-start items-center gap-2">
                        < MdQueryStats className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>

                            Task Stats

                        </span>
                    </Link>
                    <Link to='/login' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-orange-500 cursor-pointer flex justify-start items-center gap-2">
                    <MdLogin className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>
                            Log - In
                        </span>
                    </Link>
                </ul>
                <div className="mt-auto p-4">
      {/* Contact Button */}
      <button 
        onClick={() => window.location.href = 'mailto:support@taskify.com'} 
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-4 flex items-center justify-center"
      >
        <MdEmail className="mr-2" />
        Contact Us
      </button>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-4">
        <a href="https://www.facebook.com/brijarajsinh.jadeja.908" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
          <FaFacebook size={20} />
        </a>
        <a href="https://www.linkedin.com/in/brijrajsinh-jadeja-08026233a/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
          <FaLinkedin size={20} />
        </a>
        <a href="https://github.com/brijrajsinhjadeja" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-800">
          <FaGithub size={20} />
        </a>
      </div>
    </div>
            </nav>
        </div>
    );
};


export default Sidebar;