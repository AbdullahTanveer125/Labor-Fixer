// import React from 'react'
// import { useState } from 'react';
// import axios from 'axios';
// import { useSelector } from "react-redux";

// function PostJob() {

//     const { user, token, isAuthenticated } = useSelector((state) => state.user);


//     console.log("User ID in Post-Job Page: ", user);
//     // console.log("Token in Home Page: ", token);


//     const [jobData, setJobData] = useState({
//         title: '',
//         category: '',
//         type: '',
//         description: '',
//         location: '',
//     });
//     const [attachment, setAttachment] = useState(null);
//     const [message, setMessage] = useState('');

//     const handleChange = (e) => {
//         setJobData({ ...jobData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         setAttachment(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formData = new FormData();
//             Object.keys(jobData).forEach((key) => formData.append(key, jobData[key]));
//             if (attachment) formData.append('attachment', attachment);

//             const res = await axios.post(`http://localhost:5000/api/jobs/post-job/${user.client.id}`, formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });

//             setMessage(res.data.message);
//             setJobData({ title: '', category: '', type: '', description: '', location: '' });
//             setAttachment(null);
//         } catch (err) {
//             setMessage(err.response?.data?.message || 'Error posting job');
//         }
//     };

//     return (
//         <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
//             {message && <p className="mb-4 text-green-600">{message}</p>}
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <input type="text" name="title" placeholder="Job Title" value={jobData.title} onChange={handleChange} className="w-full p-2 border rounded" required />

//                 <select name="category" value={jobData.category} onChange={handleChange} className="w-full p-2 border rounded" required>
//                     <option value="">Select Category</option>
//                     <option value="Web Development">Web Development</option>
//                     <option value="Design">Design</option>
//                     <option value="Writing">Writing</option>
//                 </select>

//                 <select name="type" value={jobData.type} onChange={handleChange} className="w-full p-2 border rounded" required>
//                     <option value="">Job Type</option>
//                     <option value="Full-time">Full-time</option>
//                     <option value="Part-time">Part-time</option>
//                     <option value="Freelance">Freelance</option>
//                 </select>

//                 <textarea name="description" placeholder="Job Description" value={jobData.description} onChange={handleChange} className="w-full p-2 border rounded" required />

//                 <input type="text" name="location" placeholder="Location (optional)" value={jobData.location} onChange={handleChange} className="w-full p-2 border rounded" />

//                 <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />

//                 <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
//                     Post Job
//                 </button>
//             </form>
//         </div>
//     );

// }

// export default PostJob






















































































import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

function PostJob() {
    const { user } = useSelector((state) => state.user);
    const [jobData, setJobData] = useState({
        title: '',
        category: '',
        type: '',
        description: '',
        location: '',
    });
    const [attachment, setAttachment] = useState(null);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            Object.keys(jobData).forEach((key) => formData.append(key, jobData[key]));
            if (attachment) formData.append('attachment', attachment);

            const res = await axios.post(`http://localhost:5000/api/jobs/post-job/${user.client.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setMessage(res.data.message);
            setJobData({ title: '', category: '', type: '', description: '', location: '' });
            setAttachment(null);
            
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error posting job');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="bg-blue-600 py-4 px-6">
                        <h2 className="text-2xl font-bold text-white">Post a New Job Opportunity</h2>
                        <p className="text-blue-100 mt-1">Fill out the form below to attract top talent</p>
                    </div>

                    <div className="p-6 sm:p-8">
                        {message && (
                            <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Job Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="e.g. Senior React Developer"
                                    value={jobData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={jobData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Design">Design</option>
                                        <option value="Writing">Writing</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Customer Support">Customer Support</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                                        Job Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={jobData.type}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                        required
                                    >
                                        <option value="">Select job type</option>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Freelance">Freelance</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Job Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={5}
                                    placeholder="Describe the responsibilities, requirements, and benefits of this position..."
                                    value={jobData.description}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    placeholder="e.g. New York, NY or Remote"
                                    value={jobData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                />
                            </div>

                            <div>
                                <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-1">
                                    Attachment (Optional)
                                </label>
                                <div className="mt-1 flex items-center">
                                    <label className="cursor-pointer">
                                        <span className="inline-block px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200">
                                            Choose File
                                        </span>
                                        <input
                                            id="attachment"
                                            name="attachment"
                                            type="file"
                                            onChange={handleFileChange}
                                            className="sr-only"
                                        />
                                    </label>
                                    <span className="ml-2 text-sm text-gray-500">
                                        {attachment ? attachment.name : "No file chosen"}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Posting...
                                        </>
                                    ) : 'Post Job'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Your job post will be reviewed and visible to potential candidates shortly.</p>
                </div>
            </div>
        </div>
    );
}

export default PostJob;