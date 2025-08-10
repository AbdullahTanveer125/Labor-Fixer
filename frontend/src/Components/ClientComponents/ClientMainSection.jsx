import React from 'react';

const ClientMainSection = ({ name, activeJobs, pendingApplications }) => {
    return (
        <section className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Welcome back, {name}!</h2>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-blue-100 p-4 rounded-lg text-center flex-1">
                    <p className="text-xl md:text-2xl font-bold text-blue-700">{activeJobs}</p>
                    <p className="text-gray-600 text-sm md:text-base">Active Jobs</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center flex-1">
                    <p className="text-xl md:text-2xl font-bold text-green-700">{pendingApplications}</p>
                    <p className="text-gray-600 text-sm md:text-base">Pending Applications</p>
                </div>
            </div>
        </section>
    );
};

export default ClientMainSection;