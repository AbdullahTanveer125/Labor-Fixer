const express = require('express');
const cors = require('cors');
// const multer = require('multer');



const dotenv = require('dotenv');

dotenv.config();

// const user_router = require("./Routes/user.js");
const employeeUser_router = require("./Routes/employeeUser");
const clientUser_router = require("./Routes/clientUser.js");
const postJob_router = require('./Routes/postJob.js');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Setup Multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = Date.now() + '-' + file.originalname;
//     cb(null, uniqueName);
//   },
// });
// const upload = multer({ storage: storage });








//to use router
app.use('/uploads', express.static('uploads'));
// app.use("/user", user_router);
app.use("/employee", employeeUser_router);
app.use("/client", clientUser_router);
app.use('/api/jobs', postJob_router);





app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
