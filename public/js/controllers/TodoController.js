/**
 * Created by mac on 2016. 1. 7..
 */
define('TodoController', [
    'jquery'
    , 'plugins'

    , 'TodoView'
    , 'TodoAppView'
    , 'Todos'
], function ($
    , plugins
    , TodoView
    , TodoAppView
    , Todos) {
    var appView = new TodoAppView;

    return {
        getTodoList: function () {
            appView.render();
        }
    }
});