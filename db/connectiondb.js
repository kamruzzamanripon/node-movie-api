import mongoose from "mongoose";

//database connection
const connectiondb = async (DATABASE_URL) =>  {
    try{
        const options = {
            //user:process.env.MONGOOSE_DB_USER,
            //pass:process.env.MONGOOSE_DB_PASS,
            dbName:process.env.DB_NAME
        };
    
        const connectionResult = await mongoose.connect(DATABASE_URL, options)
    
        console.log(
            `Connected to mongoDB on database:
            ${connectionResult.connections[0].name} at ${new Date().toDateString()}`
          );
    }catch(err){
        console.log(err);
    }

   

}

export default connectiondb;