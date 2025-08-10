import React from 'react';

const QuickActions = () => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 md:p-4 rounded-lg shadow transition duration-200 text-sm md:text-base">
                Post a New Job
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white p-3 md:p-4 rounded-lg shadow transition duration-200 text-sm md:text-base">
                View Active Jobs
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white p-3 md:p-4 rounded-lg shadow transition duration-200 text-sm md:text-base">
                Browse Employees
            </button>
        </section>
    );
};

export default QuickActions;