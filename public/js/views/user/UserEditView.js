/**
 * Created by mac on 2016. 1. 7..
 */


define('UserEditView', [
    'jquery'
    , 'backbone'
    , 'underscore'
    , 'util'
    , 'UserCollection'
    , 'User'
    , 'UserView'
    , 'text!templates/user/UserEdit.ejs'
], function ($
    , Backbone
    , _
    , util
    , UserCollection
    , User
    , UserView
    , tplUserEdit) {

    var userCollection = new UserCollection
        , user = new User;

    return Backbone.View.extend({
        el: '.home-container'
        , initialize: function () {
            userCollection.bind('add', this.addOne, this);
            userCollection.bind('reset', this.addAll, this);
            userCollection.fetch();
        }
        , events: {
            'submit #formUser': 'save'
        }
        , template: _.template(tplUserEdit)
        , render: function (users) {
            this.addAll(users);
        }
        , addOne: function (user) {
            var userView = new UserView({model: user});

            $('#formUser').append(
                //userView.render().$el
            );
        }
        , addAll: function (users) {
            users.each(this.addOne);
        }
        , save: function (ev) {
            var $formUser = $(ev.currentTarget)
            //, userDetails = $formUser.serializeAny()
                , oUserDetail = $formUser.serializeObject()
                , oUserDetailCollect = {};

            for (var i = 0; i < oUserDetail[config.COLUMN_ID].length; i++) {
                !oUserDetailCollect[config.COLUMN_USER_ID] ? oUserDetailCollect[config.COLUMN_USER_ID] = [] : '';
                !oUserDetailCollect[config.COLUMN_USER_PW] ? oUserDetailCollect[config.COLUMN_USER_PW] = [] : '';
                !oUserDetailCollect[config.COLUMN_NICKNAME] ? oUserDetailCollect[config.COLUMN_NICKNAME] = [] : '';

                oUserDetailCollect[config.COLUMN_USER_ID].push(oUserDetail[config.COLUMN_USER_ID][i]);
                oUserDetailCollect[config.COLUMN_USER_PW].push(oUserDetail[config.COLUMN_USER_PW][i]);
                oUserDetailCollect[config.COLUMN_NICKNAME].push(oUserDetail[config.COLUMN_NICKNAME][i]);
            }

            console.log(JSON.stringify(oUserDetailCollect));

            user.saveAll();

            //userCollection.saveAll();

            return false;
        }
    });
});