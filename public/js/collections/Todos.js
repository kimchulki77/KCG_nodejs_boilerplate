/**
 * Created by mac on 2016. 1. 7..
 */
define('Todos', [
        'jquery'
        , 'backbone'
        , 'Todo'
    ]
    , function ($
        , Backbone
        , Todo) {

        return Backbone.Collection.extend({
            url: config.ROUTER_TODO
            , model: Todo
        });
    });