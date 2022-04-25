//Them cac gói thư viện cần thiết
import express from 'express';
import cors from 'cors';
import movies from './api/movies.route.js';

const app=express();
app.use(cors());
app.use(express.json());
//routing cơ bản
app.use("/api/v1/movies",movies);
app.use('*',(req,res)=>{
    res.status(404).json({error: "not found"});
});
export default app;