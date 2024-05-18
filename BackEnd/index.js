import app from "./app/app.js";
import { config } from "dotenv";  
import cors from "cors";

config();

let port = process.env.PORT;

  
app.listen(port, ()=>{
    console.log(`Server is running on port 666`);
});