import mongoose from "mongoose";

export default  function connectMongodb() {

   return  mongoose.connect(process.env.MONGO_URI)
};


