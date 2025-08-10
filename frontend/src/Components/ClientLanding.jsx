import React, { useState } from 'react';
import ClientMainSection from './ClientComponents/ClientMainSection';
import QuickActions from './ClientComponents/ClientQuikActions';
import ActiveJobPosts from './ClientComponents/ClientActiveJobs';
import RecommendedEmployees from './ClientComponents/RocomendedEmployee';
import Sidebar from './ClientComponents/ClientSidebar';

const ClientLanding = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    // Sample data
    const jobs = [
        {
            title: 'Website Development',
            date: '2025-08-10',
            applicants: 7,
            status: 'Active'
        },
        {
            title: 'Mobile App UI',
            date: '2025-08-05',
            applicants: 3,
            status: 'Active'
        }
    ];

    const employees = [
        {
            name: 'John Doe',
            role: 'Web Developer',
            rate: '$20/hr'
        },
        {
            name: 'Jane Smith',
            role: 'Graphic Designer',
            rate: '$15/hr'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Mobile menu button */}
            <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-xl hover:bg-blue-700 transition duration-200"
                style={{ width: '50px', height: '50px' }}
            >
                {sidebarOpen ? (
                    <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 p-4 md:p-6 mt-16 md:mt-0">
                <ClientMainSection name="Abdullah" activeJobs={3} pendingApplications={5} />
                <QuickActions />
                <ActiveJobPosts jobs={jobs} />
                <RecommendedEmployees employees={employees} />
            </main>
        </div>
    );
};

export default ClientLanding;