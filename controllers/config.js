/**
 * Created by mac on 2016. 1. 10..
 */
var config = require('../config');

var aAntiConfigKey = [
    'DB_USER_PW'
    , 'DB_HOST'
    , 'DB_NAME'
    , 'DB_USER_NAME'
    , 'DB_CONNECTION'
    , 'DB_CONNECTION_LIMIT_TIME'
    , 'DB_PORT'
    , 'COOKIE_KEY'
    , 'SESSION_KEY'
    , 'SESSION_AGE'
    , 'AUTHOR'
    , 'EMAIL'
    , 'DEBUG'
    , 'SITE_TITLE'
    , 'SITE_DESC'
    , 'PORT'
    , 'SITE_DESC'
];


exports.getConfig = getConfig;
function getConfig(req, res) {
    var key
        , oResultConfig = {};

    for (key in config) {
        if (config.hasOwnProperty(key)) {
            if (!isAntiConfig(key)) {
                oResultConfig[key] = config[key];
            }
        }
    }

    res.send(oResultConfig);

}

function isAntiConfig(sConfigKey) {
    var i;

    for (i = 0; i < aAntiConfigKey.length; i++) {
        if (aAntiConfigKey[i] == sConfigKey) {
            return true;
        }
    }

    return false;
}