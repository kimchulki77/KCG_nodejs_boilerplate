/**
 * Created by mac on 15. 11. 13..
 */

var QueryMaker = require('../utils/query')
    , config = require('../config')
    , util = require('util');

var aColumnKey = [
    config.COLUMN_ID
    , config.COLUMN_CONTENT
    , config.COLUMN_TITLE
]
    , tableName = config.TABLE_TODO
    , queryMaker = new QueryMaker(tableName);


queryMaker.setColumnKey(aColumnKey);

function Todo() {
}
Todo.prototype = queryMaker;

module.exports = Todo;
