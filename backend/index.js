const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const employeeUser_router = require("./Routes/employeeUser");
const user_router = require("./Routes/user.js");



const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



//to use router
app.use("/employee", employeeUser_router);
app.use("/user", user_router);



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
