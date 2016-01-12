/**
 * Created by mac on 2016. 1. 7..
 */


define('UserView', [
    'jquery'
    , 'backbone'
    , 'underscore'
    , 'util'
    , 'UserCollection'
    , 'User'
    , 'text!templates/user/User.ejs'
], function ($
    , Backbone
    , _
    , util
    , UserCollection
    , User
    , tplUser) {
    return Backbone.View.extend({
        el: '.user'
        , initialize: function () {

        }
        , events: {
        }
        , template: _.template(tplUser)
        , render: function () {
            this.template({
              user :this.model.toJSON()
              ,config : config
            });

            this
        }
    });
});