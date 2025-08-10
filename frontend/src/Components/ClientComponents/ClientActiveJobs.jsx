import React from 'react';

const ActiveJobPosts = ({ jobs }) => {
    return (
        <section className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Active Job Posts</h3>
            <div className="min-w-full">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 text-xs sm:text-sm md:text-base">Job Title</th>
                            <th className="p-2 text-xs sm:text-sm md:text-base hidden sm:table-cell">Posted Date</th>
                            <th className="p-2 text-xs sm:text-sm md:text-base">Applicants</th>
                            <th className="p-2 text-xs sm:text-sm md:text-base hidden xs:table-cell">Status</th>
                            <th className="p-2 text-xs sm:text-sm md:text-base">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-2 text-xs sm:text-sm md:text-base">{job.title}</td>
                                <td className="p-2 text-xs sm:text-sm md:text-base hidden sm:table-cell">{job.date}</td>
                                <td className="p-2 text-xs sm:text-sm md:text-base">{job.applicants}</td>
                                <td className={`p-2 text-xs sm:text-sm md:text-base hidden xs:table-cell ${job.status === 'Active' ? 'text-green-600' : 'text-gray-600'}`}>
                                    {job.status}
                                </td>
                                <td className="p-2 space-x-1 md:space-x-2">
                                    <button className="text-blue-600 hover:underline text-xs sm:text-sm md:text-base">View</button>
                                    <button className="text-yellow-600 hover:underline text-xs sm:text-sm md:text-base">Edit</button>
                                    <button className="text-red-600 hover:underline text-xs sm:text-sm md:text-base">Close</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ActiveJobPosts;