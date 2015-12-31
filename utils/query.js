/**
 * Created by HDplants_msi on 2015-06-01.
 */
var util = require('util')
    , _ = require('underscore-node');


function QueryMaker(tableName) {
    this.tableName = tableName;
}
QueryMaker.prototype = {
    queryOption: function (options) {
        var oDefault = {
            FROM: this.tableName
            , COLUMN: '*'
            , WHERE: ''
            , ORDER_BY: ''
            , ORDER: ''
            , LIMIT: ''
        };
        options = _.extend(oDefault, options);

        if (options.ORDER_BY != '' && options.ORDER_BY.toUpperCase().indexOf('ORDER BY')) {
            options.ORDER_BY = 'ORDER BY ' + options.ORDER_BY;
        }
        if (options.WHERE != '' && options.WHERE.toUpperCase().indexOf('WHERE')) {
            options.WHERE = 'WHERE ' + options.WHERE;
        }
        if (options.LIMIT != '' && options.LIMIT.toUpperCase().indexOf('LIMIT')) {
            options.LIMIT = 'LIMIT ' + options.LIMIT;
        }

        return _.extend(oDefault, options);
    },
    select: function (options) {
        console.log('select');
        var query;

        options = this.queryOption(options);

        if (options.FROM.indexOf('FROM') == -1) {
            options.FROM = 'FROM ' + options.FROM;
        }

        query = util.format("SELECT %s %s %s %s %s %s "
            , options.COLUMN
            , options.FROM
            , options.WHERE
            , options.ORDER_BY
            , options.ORDER
            , options.LIMIT
        );

        console.log(query);

        return query;
    },
    insert: function (options) {
        var query;

        options = this.queryOption(options);


        query = util.format("INSERT INTO %s SET %s"
            , options.FROM
            , options.COLUMN);

        console.log(query);
        return query;
    },
    update: function (options) {
        var query;

        options = this.queryOption(options);

        query = util.format("UPDATE %s SET %s %s"
            , options.FROM
            , options.COLUMN
            , options.WHERE);

        console.log(query);

        return query;
    },
    delete: function (options) {
        var query;

        options = this.queryOption(options);

        if (options.FROM.indexOf('FROM') == -1) {
            options.FROM = 'FROM ' + options.FROM;
        }

        query = util.format("DELETE %s %s"
            , options.FROM
            , options.WHERE);
        console.log(query);

        return query;
    },
    doQuery: function (sQuery) {
    }
};

exports.QueryMaker = QueryMaker;

