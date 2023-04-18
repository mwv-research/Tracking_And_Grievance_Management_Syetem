import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const connect = mongoose.connect(
    String(process.env.MONGO_URI),
    {},
    (err) => {
        if(err) console.log(`The Connection could not be established due to ${err}`);
        
        else console.log("Database is Connected");
    }
);

export{
    connect
}