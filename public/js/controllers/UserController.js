/**
 * Created by mac on 2016. 1. 7..
 */
define('UserController', [
    'jquery'
    , 'plugins'

    , 'UserListView'
    , 'UserEditView'
    , 'UserCollection'
], function ($
    , plugins
    , UserListView
    , UserEditView
    , UserCollection) {
    var userEditView = new UserEditView
        , userListView = new UserListView
        , userCollection = new UserCollection;

    function getUserList() {
        userCollection.fetch({
            success: function (users) {
                console.log(users);
                plugins.toast('showSuccessToast', '데이터를 성공적으로 받아왔습니다.');
                userListView.render(users);
            }
        });
        plugins.toast('showSuccessToast', 'users');
    }

    function editUser(id) {
        userCollection.fetch ({
            success: function (users) {
                userEditView.render(users);
            }
        })
    }


    return {
        getUserList: getUserList
        , editUser: editUser
    }
});