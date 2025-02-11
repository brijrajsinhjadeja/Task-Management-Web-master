import { GrTask } from "react-icons/gr";
import { MdDashboard, MdLogin, MdOutlineTaskAlt, MdAddTask, MdPendingActions, MdCloudDone, MdOutlineAccessTimeFilled, MdQueryStats } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-750/80">
            <div className="flex items-center gap-2 justify-center h-16 text-white text-2xl font-bold mt-6">
                <GrTask />
                <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>
                    TaskiFy
                </span>
            </div>
            <nav className="flex gap-10 justify-start">
                <ul className="py-6 flex flex-col justify-start">
                    <Link to='/' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-gray-700 cursor-pointer flex justify-start items-center gap-2">
                        <MdDashboard className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>

                            Dashboard

                        </span>
                    </Link>
                    <Link to='/completeTask' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-gray-700 cursor-pointer flex justify-start items-center gap-2">
                        <MdOutlineTaskAlt className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>

                            Completed Tasks

                        </span>
                    </Link>
                    <Link to='/pendingTask' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-gray-700 cursor-pointer flex justify-start items-center gap-2">
                        <MdPendingActions className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>

                            Pending Tasks

                        </span>
                    </Link>
                    <Link to='/inProgressTask' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-gray-700 cursor-pointer flex justify-start items-center gap-2">
                        <GrInProgress className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>

                            In Progress Tasks

                        </span>
                    </Link>
                    <Link to='/deployedTask' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-gray-700 cursor-pointer flex justify-start items-center gap-2">
                        <MdCloudDone className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>

                            Deployed Tasks

                        </span>
                    </Link>
                    <Link to='/deferredTask' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-gray-700 cursor-pointer flex justify-start items-center gap-2">
                        < MdOutlineAccessTimeFilled className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>

                            Deferred Tasks

                        </span>
                    </Link>

                    <Link to='/addTask' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-gray-700 cursor-pointer flex justify-start items-center gap-2">
                        <MdAddTask className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>

                            Add New Tasks

                        </span>
                    </Link>
                    <Link to='/statsTask' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-gray-700 cursor-pointer flex justify-start items-center gap-2">
                        < MdQueryStats className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>

                            Task Stats

                        </span>
                    </Link>
                    <Link to='/' className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-gray-700 cursor-pointer flex justify-start items-center gap-2">
                    <MdLogin className="text-2xl" />
                        <span className='sm:block hidden bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>
                                Sign In

                        </span>
                    </Link>
                </ul>
            </nav>
        </div>
    );
};


export default Sidebar;