import React from 'react';

const RecommendedEmployees = ({ employees }) => {
    return (
        <section className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Recommended Employees</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {employees.map((employee, index) => (
                    <div key={index} className="border p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200">
                        <h4 className="font-semibold text-sm md:text-base">{employee.name}</h4>
                        <p className="text-gray-600 text-xs md:text-sm">{employee.role}</p>
                        <p className="text-gray-600 text-xs md:text-sm">Rate: {employee.rate}</p>
                        <button className="mt-2 bg-blue-600 text-white px-2 py-1 text-xs md:text-sm rounded hover:bg-blue-700 transition duration-200">
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecommendedEmployees;