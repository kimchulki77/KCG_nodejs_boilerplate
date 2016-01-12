/**
 * Created by mac on 15. 9. 8..
 */
var mysql = require('mysql')
    , config = require('./config')
    , dbConnection;

function createDBConnection() {
    dbConnection = mysql.createConnection({
        host: config.DB_HOST,
        port: config.DB_PORT,
        user: config.DB_USER_NAME,
        password: config.DB_USER_PW,
        database: config.DB_NAME,
        connectionLimit: config.DB_CONNECTION_LIMIT_TIME,
        waitForConnections: false
    });

}
function connect() {
    dbConnection.connect(function (err) {
        if (err) {
            console.log('DB error!' + err);
            return;
        }
        dbConnection.on('connected', function () {
            console.log('DB connected');
        });
        dbConnection.on('error', function () {
            console.log('DB error');
        });
    });
}
function disconnect() {
    dbConnection.disconnect(function (err) {
        console.log("error :  " + err);
    });
}

function getDBConnection() {
    if (!dbConnection) {
        createDBConnection();
        connect();
    }
    return dbConnection;
}

exports.getDBConnection = getDBConnection;


