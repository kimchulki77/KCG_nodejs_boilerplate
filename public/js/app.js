/**
 * Created by mac on 15. 9. 25..
 */

define('App', [
    'AppRouter'
], function (AppRouter) {
    return {
        start: function () {
            var routes = new AppRouter;

            routes.home();
            //routes.navigate('/');
        }
    }
});
