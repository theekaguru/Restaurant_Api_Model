import "dotenv/config"
import { migrate } from "drizzle-orm/node-postgres/migrator";
import db, {client} from "./db";


async function migration(){
     console.log("==================Migration Started ⛹️‍♂️⛹️‍♂️==================");
     await migrate(db,{migrationsFolder: __dirname + "/migrations"});
     await client.end();
     console.log("==================Migration successfull 🦾🦾==================");
     process.exit(0);    
}

migration().catch((e) => {
    console.log(e)
    process.exit(0)
})