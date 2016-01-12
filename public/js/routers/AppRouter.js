/**
 * Created by mac on 15. 9. 25..
 */
define('AppRouter', [
        'jquery'
        , 'backbone'
        , 'util'
        , 'plugins'
        , 'UserController'
        , 'TodoController'
        , 'HomeView'
    ],
    function ($
        , Backbone
        , util
        , plugins
        , UserController
        , TodoController
        , HomeView) {
        var homeView = new HomeView;

        var AppRouter = Backbone.Router.extend({
            routes: {
                '': 'home'
                , 'user/list': 'userList'
                , 'user/edit': 'edit'
                , 'user/edit/:id': 'edit'

                , 'todo/list': 'todoList'

                , '*action': '404'
            }
            , home: function () {
                // 기본 상태일 경우 다른 ex) #/user/edit에서 페이지를 새로 고침이나 넘어놀 경우 Backbone이 동작하지 않고 멈춰있으므로
                // URL을 초기화하기 위해서 추가합니다.
                this.navigate('/');
                //this.userList();

                homeView.render();
            }
            , userList: UserController.getUserList
            , edit: UserController.editUser
            , todoList: TodoController.getTodoList
            , 404: function () {
                plugins.toast('showNoticeToast', '페이지를 찾을 수 없습니다.');
                history.go(-1);
            }
        });

        Backbone.history.start();

        return AppRouter;
    });
