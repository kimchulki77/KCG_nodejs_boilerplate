/**
 * Created by mac on 15. 9. 8..
 */
var mysql = require('mysql')
    , config = require('./config');

var db = (function () {
    var dbConnection
        , INSTANCE;

    function Singleton() {
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

    Singleton.prototype = {
        connect: function () {
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
        , disconnect: function () {
            dbConnection.disconnect(function (err) {
                console.log("error :  " + err);
            });
        }
        , getDBConnection: function () {
            return dbConnection;
        }
    };

    return {
        getInstance: function () {
            if (INSTANCE == undefined) {
                INSTANCE = new Singleton();
            }
            return INSTANCE;
        }
    }

});

exports.getInstance = db().getInstance;


