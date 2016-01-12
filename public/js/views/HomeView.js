/**
 * Created by mac on 2016. 1. 7..
 */


define('HomeView', [
    'jquery'
    , 'backbone'
    , 'underscore'
    , 'util'
    , 'text!templates/Home.ejs'
], function ($
    , Backbone
    , _
    , util
    , tplHome) {

    return Backbone.View.extend({
        el: '.home-container'
        , initialize: function () {
        }
        , template: _.template(tplHome)
        , render: function () {
            this.$el.html(this.template());
        }
    });
});