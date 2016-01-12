/**
 * Created by mac on 2016. 1. 7..
 */
define('UserCollection', [
        'jquery'
        , 'backbone'
        , 'User'
    ]
    , function ($
        , Backbone
        , User) {

        return Backbone.Collection.extend({
            url: '/api/user'
            , model: User
            , initialize: function () {
                this.fetch({
                    success: function (users) {
                        this.models = users;
                    }
                });
            }
            , saveAll: function () {
                _(this.models).each(function (user) {
                    console.log(user);
                    user.save({
                        success: function () {
                            alert('성공적으로 저장되었습니다.');
                        }
                        , error: function (err) {
                            alert(err);
                        }
                    })
                });
            }
        });
    });