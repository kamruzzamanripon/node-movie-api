import mongoose from "mongoose";

//database connection
const connectiondb = async (DATABASE_URL) =>  {
    try{
        const options = {
            //user:process.env.DBUSERNAME,
            //pass:process.env.DBPASSWORD,
            dbName:process.env.DBNAME,
            //authSource: process.env.DBAUTHSOURCE,
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