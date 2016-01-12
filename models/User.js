/**
 * Created by mac on 15. 11. 13..
 */

var QueryMaker = require('../utils/query')
    , config = require('../config')
    , _ = require('underscore-node')
    , util = require('util');


var tableName = config.TABLE_USER;


//==============================
function User() {
}
User.prototype = new QueryMaker(tableName);

module.exports = User;
