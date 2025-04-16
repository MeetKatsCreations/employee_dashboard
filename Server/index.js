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
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });