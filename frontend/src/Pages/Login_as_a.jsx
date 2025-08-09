import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Login_as_a() {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelection = () => {
        if (selectedOption === "option1") {
            navigate("/client-login");
        } else if (selectedOption === "option2") {
            navigate("/recipient_login");
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4"
        >
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('./LogIn.png')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50"></div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative w-full max-w-md"
            >
                <motion.div
                    variants={itemVariants}
                    className="bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-blue-100"
                >
                    <div className="p-8">
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl font-bold text-center text-blue-800 mb-2"
                        >
                            Welcome Back
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-center text-blue-600 mb-8"
                        >
                            Please select your login type
                        </motion.p>

                        <motion.div
                            variants={containerVariants}
                            className="space-y-4 mb-8"
                        >
                            <motion.label
                                variants={itemVariants}
                                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${selectedOption === "option1"
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-blue-300"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="selection"
                                    value="option1"
                                    checked={selectedOption === "option1"}
                                    onChange={() => setSelectedOption("option1")}
                                    className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                />
                                <div className="ml-3">
                                    <span className="block text-lg font-medium text-gray-900">Client</span>
                                    <span className="block text-sm text-gray-500">Access client dashboard</span>
                                </div>
                            </motion.label>

                            <motion.label
                                variants={itemVariants}
                                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${selectedOption === "option2"
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-blue-300"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="selection"
                                    value="option2"
                                    checked={selectedOption === "option2"}
                                    onChange={() => setSelectedOption("option2")}
                                    className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                />
                                <div className="ml-3">
                                    <span className="block text-lg font-medium text-gray-900">Employee</span>
                                    <span className="block text-sm text-gray-500">Access employee portal</span>
                                </div>
                            </motion.label>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <button
                                onClick={handleSelection}
                                disabled={!selectedOption}
                                className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-300 ${selectedOption
                                        ? "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                        : "bg-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                Continue
                                <span className="ml-2">→</span>
                            </button>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-6 text-center text-sm text-gray-600"
                >
                    Need help? <a href="#" className="text-blue-600 hover:underline">Contact support</a>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default Login_as_a;