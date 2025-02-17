import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = ({ label, count, bg, team, items }) => {
    return (
        <Link to='/allTask'>
            <div className="w-full h-35 bg-orange p-5 shadow-md rounded-md flex items-center justify-between cursor-pointer">
                <div className="h-full flex flex-2 flex-col justify-between">
                    <p className="text-base text--600">{label}</p>
                    <span className="text-2xl font-semibold">{count}</span>
                    <span className="text-sm text-gray-400">{`${items} items added by ${team}`}</span>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${bg}`}>
                    {label.charAt(0)}
                </div>
            </div>
        </Link>
    );
};

Card.propTypes = {
    label: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    bg: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
    items: PropTypes.number.isRequired,
};

const Dashboard = () => {
    const stats = [
        {
            label: "TOTAL TASK",
            total: 50,
            bg: "bg-[#1d4ed8]",
            team: "Team A",
            items: 110,
        },
        {
            label: "COMPLETED TASK",
            total: 25,
            bg: "bg-[#0f766e]",
            team: "Team B",
            items: 60,
        },
        {
            label: "TASK IN PROGRESS",
            total: 15,
            bg: "bg-[#f59e0b]",
            team: "Team C",
            items: 45,
        },
        {
            label: "PENDING",
            total: 10,
            bg: "bg-[#be185d]",
            team: "Team D",
            items: 30,
        },
        {
            label: "DEPLOYED",
            total: 10,
            bg: "bg-[#f59e0b]",
            team: "Team E",
            items: 20,
        },
        {
            label: "DEFERRED",
            total: 10,
            bg: "bg-[#0f766e]",
            team: "Team F",
            items: 15,
        },
    ];

    return (
        <div className="mx-auto w-[80%]">
            <div className="flex flex-col w-full justify-between">
                <h1 className="sm:text-2xl text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text my-8 text-center">Tasks</h1>
                <div className="h-full w-80% mx-auto py-4 px-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 place-item-center">
                        {stats.map(({ label, total, bg, team, items }, index) => (
                            <Card key={index} bg={bg} label={label} count={total} team={team} items={items} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;