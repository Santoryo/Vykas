import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const update = async (data: any, userId: any) => {
if (data != "This user doesn't have Armory Extension" && !(JSON.stringify(data).includes('3001')) && data != "This user doesn't exist") {
        var connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
    
        connection.connect();
    
        const dbQuery = async (sql:string, data:string) =>
        {
            return new Promise((resolve, reject) => {
                connection.query(sql, [data], function(error:any, results:any, fields:any) {
                    if(error) console.log(error);
                    resolve(results)
                });
            }) 
    
        }
    
        
        const pcId = data.pcID;
    
        let doesExist: any = 0;
        doesExist = await dbQuery(`SELECT * from vykas.players WHERE data->>'$.pcID' = '${pcId}'`, "");
    
        if(doesExist.length > 0)
        {
            console.log("Player exists, updating this player.")
            
            let sql = `UPDATE vykas.players SET data = ? WHERE data->>'$.pcID' = '${pcId}'`
            await dbQuery(sql, JSON.stringify(data));
    
        }
        else
        {
            console.log("This character doesn't exist yet, adding it to database");
            let sql = `INSERT INTO players (twitchName, data) VALUES (${userId}, ?)`
            await dbQuery(sql, JSON.stringify(data));
        }
    
    
        connection.end();
}
else
{
    console.log("Not uploading to databse since this user doesn't have armory extension.");
}
}

export {update};