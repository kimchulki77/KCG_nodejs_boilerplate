/**
 * Created by mac on 15. 9. 25..
 */
requirejs.config({
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        'bs_datetimepicker': {
            deps: ['jquery'],
            exports: 'bs_datetimepicker'
        },
        'jqueryToast': {
            deps: ['jquery'],
            exports: 'jqueryToast'
        },
        'jqueryUI': {
            deps: ['jquery'],
            exports: 'jqueryUI'
        }
    },
    /**
     * HACK:
     * Modified Underscore and Backbone to be AMD compatible (define themselves)
     * since it didn't work properly with the RequireJS shim when optimizing
     */
    paths: {
        'text': 'lib/text',
        'jquery': 'lib/jquery/jquery.min',
        'jqueryToast': 'lib/jquery/jquery.toastmessage',
        'jqueryUI': 'lib/jquery/jquery-ui.min.js',
        'underscore': 'lib/underscore-1.7.0.min',
        'backbone': 'lib/backbone',
        'bootstrap': 'lib/bootstrap/bootstrap.min',
        'bs_datetimepicker': 'lib/bootstrap/bootstrap-datetimepicker',
        'moment': 'lib/moment',

        'config': 'config',
        'util': 'util',
        'plugins': 'plugins',

        //region Routers
        'AppRouter': 'routers/AppRouter',
        //endregion

        //region collections
        'UserController': 'controllers/UserController',
        'TodoController': 'controllers/TodoController',

        //endregion

        //region Views
        'UserListView': 'views/user/UserListView',
        'UserEditView': 'views/user/UserEditView',
        'UserView': 'views/user/UserView',

        'TodoAppView': 'views/todo/TodoAppView',
        'TodoEditView': 'views/todo/TodoEditView',
        'TodoView': 'views/todo/TodoView',

        'HomeView': 'views/HomeView',

        'SupplySettingView': 'views/SupplySetting',
        'SupplySectionView': 'views/SupplySection',
        //endregion

        //region collections
        'UserCollection': 'collections/UserCollection',

        'Todos': 'collections/Todos',

        'SupplySettingCollection': 'collections/SupplySetting',
        //endregion

        //region Models
        'User': 'models/User',
        'Todo': 'models/Todo',

        'SupplySettingModel': 'models/SupplySetting',
        //endregion

        'App': 'app',
    }
});


require([
    'App'
], function (App, MobileRouter) {
    //new MobileRouter;
    App.start();
});
