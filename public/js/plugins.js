/**
 * Created by mac on 2015. 12. 30..
 */
define('plugins', [
        'jquery'
        , 'underscore'
        , 'bootstrap'
        , 'jqueryToast'
    ],
    function ($,
              _,
              bs,
              jqueryToast) {
        return {
            toast: function (method, str) {
                $().toastmessage(method, str);
            }
        }
    });