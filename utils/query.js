/**
 * Created by HDplants_msi on 2015-06-01.
 */
var util = require('util')
    , dbConnection = require('../db').getDBConnection()
    , config = require('../config')
    , _ = require('underscore-node');


function QueryMaker(tableName) {
    this.setTableName(tableName);

    this.init();
}
QueryMaker.prototype.init = function () {

    this.action = 'select';
    this.where = '';
    this.column = '*';
    this.order = '';
    this.orderBy = '';
    this.limit = '';
    if( !this.aColumnKey ) this.aColumnKey = null;
};
QueryMaker.prototype.select = function () {
    this.init();
    this.action = config.ACTION_READ;

    return this;
};
QueryMaker.prototype.insert = function () {
    this.init();
    this.action = config.ACTION_CREATE;

    return this;
};
QueryMaker.prototype.update = function () {
    this.init();
    this.action = config.ACTION_UPDATE;

    return this;
};

QueryMaker.prototype.delete = function () {
    this.init();
    this.action = config.ACTION_DELETE;

    return this;
};
QueryMaker.prototype.setTableName = function (tableName) {
    this.tableName = tableName;
};
QueryMaker.prototype.setColumnKey = function (aColumnKey) {
    this.aColumnKey = aColumnKey;
};
QueryMaker.prototype.setColumn = function (aColumn) {
    this.column = aColumn.join(', ');

    return this;
};
QueryMaker.prototype.setColumnAndValue = function (oColumn) {
    var columnKey = null
        , aColumn = [];

    console.log('zz' + this.aColumnKey);
    console.log( this.aColumnKey);

    console.log('zz' );

    for (columnKey in oColumn) {
        if (oColumn.hasOwnProperty(columnKey)) {
            //현재 키를 이 테이블이 가지고 있는지 체크합니다.
            if (_.contains(this.aColumnKey, columnKey)) {
                aColumn.push(util.format(
                    "%s = '%s'"
                    , columnKey
                    , oColumn[columnKey]));
            }
        }
    }
    this.column = aColumn.join(', ');

    return this;
};

QueryMaker.prototype.setWhere = function (oColumn) {
    var aColumn = []
        , sColumnKey;

    // 예) id=1을 만들고 싶을 경우 {id:1}로 넘깁니다.
    for (sColumnKey in oColumn) {
        if (oColumn.hasOwnProperty(sColumnKey)) {
            //현재 키를 이 테이블이 가지고 있는지 체크합니다.
            if (_.contains(this.aColumnKey, sColumnKey)) {
                aColumn.push(
                    util.format(
                        "%s = '%s'"
                        , sColumnKey
                        , oColumn[sColumnKey])
                );
            }
        }
    }

    this.where = ' WHERE ' + aColumn.join(' AND ');

    return this;
};
QueryMaker.prototype.setOrder = function (sOrder) {
    //기본값은 DESC로 합니다.
    this.order = util.format(
        ' ORDER BY "%s" '
        , sOrder);

    return this;
};
QueryMaker.prototype.setOrderBy = function (sOrderBy) {
    this.orderBy = sOrderBy;

    return this;
};

QueryMaker.prototype.setLimit = function (sStart, sEnd) {
    this.limit = util.format(
        'LIMIT %s, %s'
        , sStart
        , sEnd);

    return this;
};
QueryMaker.prototype.setLeftJoin = function () {

    return this;
};
QueryMaker.prototype.doQuery = function (fn) {
    var sql = '';

    if (this.action == config.ACTION_CREATE) {
        sql = util.format("INSERT INTO %s SET %s"
            , this.tableName
            , this.column);
    } else if (this.action == config.ACTION_READ) {
        sql = util.format("SELECT %s FROM %s %s %s %s %s "
            , this.column
            , this.tableName
            , this.where
            , this.order
            , this.orderBy
            , this.limit
        );

    } else if (this.action == config.ACTION_UPDATE) {
        sql = util.format("UPDATE %s SET %s %s"
            , this.tableName
            , this.column
            , this.where);
    } else if (this.action == config.ACTION_DELETE) {
        sql = util.format("DELETE FROM %s %s"
            , this.tableName
            , this.where);
    }

    console.log(sql);

    dbConnection.query(sql, fn);
};

module.exports = QueryMaker;

