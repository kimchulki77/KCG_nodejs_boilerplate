/**
 * Created by mac on 15. 10. 28..
 */

var Todo = require('../models/Todo')
    , _ = require('underscore-node')
    , todo = new Todo()
    , config = require('../config')
    , util = require('util');


exports.getTodos = getTodos;
function getTodos(req, res) {
    todo.select()
        .doQuery(function (dbErr, dbRes) {
            res.send(dbRes);
            res.end();
        });
}

exports.createTodo = createTodo;
function createTodo(req, res) {
    var oBody = req.body
        , oData = {};

    console.log(oBody);

    todo.insert()
        .setColumnAndValue(oBody)
        .doQuery(function (dbErr, dbRes) {
            if (dbErr) {
                console.log(dbErr);
                return;
            }

            console.log(dbRes);
            res.send(dbRes);
            res.end();
        });
}
exports.deleteTodo = deleteTodo;
function deleteTodo(req, res) {
    var id = req.params['id']
        , oData = {};

    oData[config.COLUMN_ID] = id;

    console.log(req.params);

    todo.delete()
        .setWhere(oData)
        .doQuery(function (dbErr, dbRes) {
            if (dbErr) {
                console.log(dbErr);
                return;
            }

            console.log(dbRes);
            res.send(dbRes);
            res.end();

        });
}

exports.getTodo = getTodo;
function getTodo(req, res) {
    var id = req.params['id']
        , oData = {};

    oData[config.COLUMN_ID] = id;

    console.log(id);

    todo.select()
        .setWhere(oData)
        .doQuery(function (dbErr, dbRes) {
            if (dbErr) {
                console.log(dbErr);
                return;
            }

            console.log(dbRes);
            res.send(dbRes);
            res.end();

        });

}
exports.updateTodo = updateTodo;
function updateTodo(req, res) {
    var id = req.params['id']
        , oBody = req.body
        , oWhere = {};

    oWhere[config.COLUMN_ID] = id;

    console.log(oWhere);
    console.log(oBody);

    todo.update()
        .setColumnAndValue(oBody)
        .setWhere(oWhere)
        .doQuery(function (dbErr, dbRes) {
            if (dbErr) {
                console.log(dbErr);
                return;
            }

            console.log(dbRes);
            res.send(dbRes);
            res.end();

        });

}