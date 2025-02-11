import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";

const AddTask = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: new Date(),
        endDate: null,
        status: 'Pending',
        assignee: '',
        priority: 'P0'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEndDateChange = (date) => {
        setFormData({
            ...formData,
            endDate: date
        });
    };

    const handleStartDateChange = (date) => {
        // Check if date is a valid Date object
        if (date instanceof Date && !isNaN(date)) {
            setFormData({
                ...formData,
                startDate: date
            });
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const serializableFormData = {
            ...formData,
            startDate: formData.startDate.toISOString(),
            endDate: formData.endDate ? formData.endDate.toISOString() : null
        };
        console.log(serializableFormData);
        dispatch(addTask(serializableFormData));
        setFormData({
            title: '',
            description: '',
            startDate: new Date(),
            endDate: null,
            status: 'Pending',
            assignee: '',
            priority: ''
        });
    };


    return (
        <div className="w-[70%] mx-auto">
            <div className=''>
                <h1 className="text-3xl font-bold my-8 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text text-center">Add New Task</h1>
                <div className='grid place-items-center'>
                    <form className="w-full mt-12 sm:mt-0 max-w-lg" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-2 sm:mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-500 h-100 w-100 text-xs font-bold mb-2" htmlFor="title">
                                    Title
                                </label>
                                <input
                                    className="appearance-none block w-full bg- -200 text- -700 border border- -200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-500 focus:border- -500"
                                    id="title"
                                    type="text"
                                    placeholder="Task Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2 sm:mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text- -700 text-xs font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    className="appearance-none block w-full bg- -200 text- -700 border border- -200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-500 focus:border- -500"
                                    id="description"
                                    placeholder="Task Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2 sm:mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text- -700 text-xs font-bold mb-2" htmlFor="startDate">
                                    Start Date
                                </label>
                                <DatePicker
                                    selected={formData.startDate}
                                    onChange={handleStartDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="appearance-none block w-[280px] sm:w-[245px] bg- -200 text- -700 border border- -200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-500 focus:border- -500"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-2 sm:mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text- -700 text-xs font-bold mb-2" htmlFor="endDate">
                                    End Date
                                </label>
                                <DatePicker
                                    selected={formData.endDate}
                                    onChange={handleEndDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="appearance-none block w-[280px] sm:w-[245px] bg- -200 text- -700 border border- -200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-500 focus:border- -500"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2 sm:mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text- -700 text-xs font-bold mb-2" htmlFor="status">
                                    Status
                                </label>
                                <select
                                    className="block appearance-none w-full bg- -200 border border- -200 text- -700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-500 focus:border-white-500"
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Deployed">Deployed</option>
                                    <option value="Deferred">Deferred</option>
                                </select>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text- -700 text-xs font-bold mb-2" htmlFor="priority">
                                    Priority
                                </label>
                                <select
                                    className="block appearance-none w-full bg- -200 border border- -200 text- -700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-500 focus:border- -500"
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                >
                                    <option value="P0">P0</option>
                                    <option value="P1">P1</option>
                                    <option value="P2">P2</option>
                                </select>
                            </div>
                        </div>
                        <button type='submit' className='mt-4 w-full p-2 bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md'>Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
