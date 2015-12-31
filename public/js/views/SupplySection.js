/**
 * Created by mac on 15. 9. 25..
 */

define('SupplySectionView', [
    'jquery',
    'underscore',
    'backbone',
    'text!templates/SupplySection.html'
], function ($, _, Backbone, tpl) {
    var view = Backbone.View.extend({

        el: $('#tableSupply'),
        tagName: "tr",
        className: 'trSection',

        template: _.template(tpl),

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },
        events: {
            'click #btnAddSection': 'addSection',
            'click #btnRemoveSection': 'removeSection'
        },
        addSection: function () {
            var countTr = this.$('tr').length - 1
                , htmlTr = ''
                , template = _.template(tpl)
                , oData = {
                    _id: countTr
                };
            this.$el.append(template(aData));
        },
        removeSection: function () {
            if (this.$('.trSection').length != 0) {
                this.$('.trSection:last-child').remove();
            } else {
                $().toastmessage('showNoticeToast', "더 이상 제거할 구역이 없습니다.");
            }
        },

    });
    return view;
});