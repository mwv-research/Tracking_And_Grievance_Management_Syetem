import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connect } from './configs/db.config.js'
import { companyRouter } from './routes/company.route.js'

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use("/company", companyRouter);

app.get("/", async(req,res)=>{
    res.send(`The server is running since ${new Date()}`)
});

app.listen(String(process.env.PORT), ()=>{
    console.log(`Server is Listening to http://localhost:${String(process.env.PORT)}`);
    connect;
});
