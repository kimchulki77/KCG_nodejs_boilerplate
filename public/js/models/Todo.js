/**
 * Created by mac on 2016. 1. 9..
 */

define('Todo', [
    'backbone'
    , 'jquery'
], function (Backbone
    , $) {
    return Backbone.Model.extend({
        default: {}
        , idAttribute: config.COLUMN_ID
        , urlRoot: config.ROUTER_TODO
    });

});