/**
 * Created by mac on 2016. 1. 9..
 */

define('User', [
    'backbone'
    , 'jquery'
], function (Backbone
    , $) {
    var User = Backbone.Model.extend({
        default: {}
        , idAttribute: '_id'
        , urlRoot: '/api/user'
    });

    return User;
});