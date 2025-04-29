import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";
const ConnectDB= async ()=>{
   
  try {
    const  connectinstant = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`)
    console.log(`\n mongodb connected !! DB host ${connectinstant}`)
  } catch (error) {
    console.error("the data is invailid", error);
    process.exit(1)
  }
}
export default ConnectDB;