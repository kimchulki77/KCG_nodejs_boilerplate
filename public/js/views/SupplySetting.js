/**
 * Created by mac on 15. 9. 25..
 */

define('SupplySettingView', [
    'jquery',
    'underscore',
    'backbone',
    'SupplySettingCollection',
    'text!templates/SupplySetting_item.html'
], function ($, _, Backbone, collection, tpl) {
    var TodoView = Backbone.View.extend({

        tagName: "li",
        className: 'list-group-item supply-setting-item',

        template: _.template(tpl),

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        events: {
            "click .btn-delete": "clear",
            "click .btn-load": "load",
        },
        load: function () {
            alert(this.model.toJSON()._id);
        },
        clear: function () {
            this.model.destroy();
        }

    });

    return TodoView;
});