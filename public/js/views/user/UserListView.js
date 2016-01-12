/**
 * Created by mac on 2016. 1. 7..
 */


define('UserListView', [
    'backbone'
    , 'jquery'
    , 'underscore'
    , 'UserCollection'
    , 'User'
    , 'plugins'
    , 'text!templates/user/UserList.ejs'
    //, 'UserController'
], function (Backbone
    , $
    , _
    , UserCollection
    , User
    , plugins
    , tplUserList) {
    return Backbone.View.extend({
        el: '.home-container'
        , initialize: function () {

        }
        , events: {
            'dblclick .user': 'edit'
        }
        , edit: function (ev) {
            var $user = $(ev.currentTarget)
                , userId = $user.data('id')
                , userCollection = new UserCollection
                , user = new User({_id: userId});

            user.fetch({
                //data: {_id: userId}
                success: function (users) {
                    plugins.toast('showNoticeToast', JSON.stringify(users.toJSON()));
                }
            })
        }
        , template: _.template(tplUserList)
        , render: function (users) {
            this.$el.html(this.template(
                {
                    users: users.toJSON()
                    , config: config
                }
            ));
        }
    });
});