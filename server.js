require("dotenv").config();
const http=require("http");
const app = require("./src/app");
const connectDB = require("./src/config/db");
const PORT= process.env.PORT ||5000;

// connect to mongodb
connectDB();

const server= http.createServer(app);

server.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`);
    
})