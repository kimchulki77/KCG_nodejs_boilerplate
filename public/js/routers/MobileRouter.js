define([
        'jquery'
        , 'backbone'
    ],
    function ($, Backbone) {

        var MobileRouter = Backbone.Router.extend({
            initialize: function () {
                alert('mobile');
                Backbone.history.start();
            },
            routes: {
                '': ' index',
                "help": "help",    // #help
                "search/:query": "search",  // #search/kiwis
                "search/:query/p:page": "search",   // #search/kiwis/p7
                "*actions": 'defaultRoute'
            },

            help: function () {
                alert("hello");
                Backbone.history.navigate('search/11',{trigger:true});
            },

            search: function (query, page) {
                alert("search" + '_' + query + '_' + page);
            },
            defaultRoute: function (actions) {
                alert(actions);
            },
            index: function () {
                alert('index');
            }
        });

        return MobileRouter;
    });