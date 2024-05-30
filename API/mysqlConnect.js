const mysql = require('mysql2/promise');
//const logger = require('../utils/logger');
//const config = require('../config');

var connection;
connection = mysql.createPool({
    host     : '100.91.106.187',
    user     : 'xxxxxxxxxxx',
    password : 'xxxxxxxxxxx',
    database : 'xxxxxxxxxxx',
    port: 6379,
    waitForConnections: true,
    supportBigNumbers: true,
    namedPlaceholders:true
});
try{
    connection.getConnection();
    console.log('Connected to DB');
}
catch(err){
    //logger.error('Error in connecting to DB',err);
}

module.exports = {
    sqlConnection: async (query,params) =>{
        //console.log(query);
        const [results,error] = await connection.execute(query,params);
        //console.log(results);
        return results;
    }
};


