import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full '} 
            md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-white shadow-lg 
            transform transition-transform duration-200 ease-in-out z-40 `}
        >
            <div className="p-4 py-20">
                <h1 className="text-2xl font-bold text-blue-600 mb-8">Client Panel</h1>
                <nav className="space-y-2">
                    <Link
                        to="/client"
                        className="block text-gray-700 hover:text-white hover:bg-blue-600 py-2 px-4 rounded transition duration-200"
                        onClick={onClose}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/client/post-job"
                        className="block text-gray-700 hover:text-white hover:bg-blue-600 py-2 px-4 rounded transition duration-200"
                        onClick={onClose}
                    >
                        Post Job
                    </Link>
                    <Link
                        to="/client/jobs"
                        className="block text-gray-700 hover:text-white hover:bg-blue-600 py-2 px-4 rounded transition duration-200"
                        onClick={onClose}
                    >
                        My Jobs
                    </Link>
                    <Link
                        to="/client/messages"
                        className="block text-gray-700 hover:text-white hover:bg-blue-600 py-2 px-4 rounded transition duration-200"
                        onClick={onClose}
                    >
                        Messages
                    </Link>
                    <Link
                        to="/logout"
                        className="block text-gray-700 hover:text-white hover:bg-blue-600 py-2 px-4 rounded transition duration-200"
                        onClick={onClose}
                    >
                        Logout
                    </Link>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;






































// import React from 'react';
// import { Link } from 'react-router-dom';

// const Sidebar = ({ isOpen, onClose }) => {
//     return (
//         <>
//             {/* Mobile menu button - fixed at bottom right */}
//             <button 
//                 onClick={() => onClose(!isOpen)}
//                 className="md:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-xl hover:bg-blue-700 transition duration-200"
//             >
//                 {isOpen ? (
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                 ) : (
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                     </svg>
//                 )}
//             </button>

//             {/* Sidebar content */}
//             <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} 
//                 md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-white shadow-lg 
//                 transform transition-transform duration-200 ease-in-out z-40`}
//             >
//                 <div className="p-4 py-20 h-full overflow-y-auto">
//                     <h1 className="text-2xl font-bold text-blue-600 mb-8">Client Panel</h1>
//                     <nav className="space-y-2">
//                         <Link
//                             to="/client"
//                             className="block text-gray-700 hover:text-white hover:bg-blue-600 py-2 px-4 rounded transition duration-200"
//                             onClick={() => onClose(false)}
//                         >
//                             Dashboard
//                         </Link>
//                         <Link
//                             to="/client/post-job"
//                             className="block text-gray-700 hover:text-white hover:bg-blue-600 py-2 px-4 rounded transition duration-200"
//                             onClick={() => onClose(false)}
//                         >
//                             Post Job
//                         </Link>
//                         <Link
//                             to="/client/jobs"
//                             className="block text-gray-700 hover:text-white hover:bg-blue-600 py-2 px-4 rounded transition duration-200"
//                             onClick={() => onClose(false)}
//                         >
//                             My Jobs
//                         </Link>
//                         <Link
//                             to="/client/messages"
//                             className="block text-gray-700 hover:text-white hover:bg-blue-600 py-2 px-4 rounded transition duration-200"
//                             onClick={() => onClose(false)}
//                         >
//                             Messages
//                         </Link>
//                         <Link
//                             to="/logout"
//                             className="block text-gray-700 hover:text-white hover:bg-blue-600 py-2 px-4 rounded transition duration-200"
//                             onClick={() => onClose(false)}
//                         >
//                             Logout
//                         </Link>
//                     </nav>
//                 </div>
//             </aside>
//         </>
//     );
// };

// export default Sidebar;