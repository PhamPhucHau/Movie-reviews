import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDao from './dao/moviesDAO.js';
import ReviewDAO from './dao/reviewDAO.js';
async function main()
{
    dotenv.config();
    const client= new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);
    const port=process.env.PORT||8000;
    try{
        await client.connect();
        await MoviesDao.injectDB(client);
        await ReviewDAO.injectDB(client); 
        app.listen(port, ()=>{
            console.log('Server đang chạy ở port: '+port);

        });
    }
    catch(e)
    {
        console.error(e);
        process.exit(1);
    };
}
main().catch(console.error);