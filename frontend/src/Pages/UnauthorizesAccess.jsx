import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Unauthorized_user({ message,url }) {
  console.log("message=", message);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-red-300 p-6">
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="text-5xl font-extrabold mb-4"
      >
        🚫 <span className="text-[#820000]">Access </span>  Denied
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg text-gray-700 mb-8"
      >
        <span className="font-semibold ">{message}</span>
      </motion.p>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 80 }}
      >
        <Link
          to={`/`}
          className="px-6 py-3 border-2 border-[#820000] bg-[#820000] hover:bg-white hover:text-[#820000] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          Go Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default Unauthorized_user;

















// import { useLocation, Link } from "react-router-dom";

// function Unauthorized_user({message}) {

//     console.log("message=",message)
    
//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>🚫 Access Denied</h1>
//       <p>you are {message}</p>
      
//       <Link to={`/${message}`}>Go Back to Home</Link>
    
//     </div>
//   );
// }

// export default Unauthorized_user;






















