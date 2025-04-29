const express = require("express");
require("./Config/config");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*', 
  credentials: true
}));
const port=process.env.PORT || 3000;
app.use("/auth",require("./Routes/AuthenticationRoutes"))
app.use("/log",require("./Routes/logRoutes"))
app.use("/profile",require("./Routes/profileRoutes"))
app.use("/task",require("./Routes/taskRoutes"))
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });