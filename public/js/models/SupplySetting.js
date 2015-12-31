/**
 * Created by mac on 15. 9. 25..
 */

define('SupplySettingModel', [
    'jquery',
    'backbone'
], function ($, Backbone) {
    var Todo = Backbone.Model.extend({
        idAttribute: '_id'
    });
    return Todo;
});