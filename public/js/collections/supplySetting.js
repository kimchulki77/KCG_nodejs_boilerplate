/**
 * Created by mac on 15. 9. 25..
 */

define('SupplySettingCollection', [
    'jquery',
    'backbone',
    'SupplySettingModel'
], function ($, Backbone, SupplySettingModel) {
    var Collection = Backbone.Collection.extend({
        url: '/json/supplySetting',
        model: SupplySettingModel,
    });
    return Collection;
});