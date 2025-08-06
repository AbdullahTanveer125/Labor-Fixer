// import { useState } from 'react';
// import axios from 'axios';

// export default function PostJob() {
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

//             const res = await axios.post('http://localhost:5000/api/jobs/post-job', formData, {
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



import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

function PostJob() {

    const { user, token, isAuthenticated } = useSelector((state) => state.user);
    

    console.log("User ID in Post-Job Page: ", user);
    // console.log("Token in Home Page: ", token);


    const [jobData, setJobData] = useState({
        title: '',
        category: '',
        type: '',
        description: '',
        location: '',
    });
    const [attachment, setAttachment] = useState(null);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
            {message && <p className="mb-4 text-green-600">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="title" placeholder="Job Title" value={jobData.title} onChange={handleChange} className="w-full p-2 border rounded" required />

                <select name="category" value={jobData.category} onChange={handleChange} className="w-full p-2 border rounded" required>
                    <option value="">Select Category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Design">Design</option>
                    <option value="Writing">Writing</option>
                </select>

                <select name="type" value={jobData.type} onChange={handleChange} className="w-full p-2 border rounded" required>
                    <option value="">Job Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Freelance">Freelance</option>
                </select>

                <textarea name="description" placeholder="Job Description" value={jobData.description} onChange={handleChange} className="w-full p-2 border rounded" required />

                <input type="text" name="location" placeholder="Location (optional)" value={jobData.location} onChange={handleChange} className="w-full p-2 border rounded" />

                <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Post Job
                </button>
            </form>
        </div>
    );

}

export default PostJob
