import {app} from "./app.js";
import {connectDb} from "./data/database.js"


connectDb();

app.listen(process.env.PORT, ()=>{
    console.log(`This server is runing on port:${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
})