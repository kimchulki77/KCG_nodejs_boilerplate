/**
 * Created by mac on 15. 9. 25..
 */
define('AppView', [
    'jquery',
    'jquery_toast',
    'underscore',
    'backbone',
    'SupplySettingCollection',
    'SupplySettingView',
    'SupplySectionView',
], function ($, jq_toast, _, Backbone, Collection, SupplySettingView, SupplySectionView) {


    var AppView = Backbone.View.extend({
        el: $("#formSetting1"),

        events: {
            'click #btnGetSupplySetting': 'loadPopup',
            'click #btnAddSupplySetting': 'addSupplySetting',
        },
        initialize: function () {
            console.log('init');
            this.render();
            Todos.fetch({wait:true});
            console.log(Todos);
            //var view = new SupplySectionView({model : {_id : 1}});
            //view.render();
        },

        render: function () {
            console.log('render');
            window.Todos = new Collection();
            Todos.bind('add', this.addOne, this);
            Todos.bind('sync', this.addAll, this);
            //Todos.bind('add', this.loadPopupAddItem, this);
            //Todos.bind('sync', this.loadPopupAddItem, this);
        },
        addOne: function (todo) {
            console.log('AddOne');
            var view = new SupplySettingView({model: todo});
            this.$("#home").append(view.render().el);
        },

        addAll: function () {
            console.log('AddAll');
            Todos.each(this.addOne, this);
        },

        loadPopupAddItem: function (todo) {
            var view = new SupplySettingView({model: todo});
            this.$("#modalSupplySetting .modal-body").append(view.render().el);
            console.log("add Item");
        },
        loadPopupAddAll: function () {
            Todos.each(this.loadPopupAddItem, this);
        },
        loadPopup: function () {
            Backbone.history.navigate('popup');
            this.$("#modalSupplySetting .modal-body").html("");
            this.$("#modalSupplySetting .modal-body").append('<ul>');
            console.log('start');
            this.loadPopupAddAll();
            console.log("end");
            this.$("#modalSupplySetting .modal-body").append('</ul>');
            $('#modalSupplySetting').modal('show');
        },

        addSupplySetting: function () {

            //어떤것이든 serialize할 수 있게해줍니다.
            $.fn.serializeAny = function () {
                var ret = [];
                $.each($(this).find(':input'), function () {
                    ret.push(encodeURIComponent(this.name) + "=" + encodeURIComponent($(this).val()));
                });
            };

            Todos.create($("#supplyTimeWrap").serializeAny());
            //var res;
            //res = $.post('/json/insertSupplySetting', $("#supplyTimeWrap").serializeAny());
            //console.log(JSON.stringify(res));
            // 저장 성공여부에 따라 메시지를 출력합니다.
            if (true) {
                $().toastmessage('showNoticeToast', "데이터가 성공적으로 저장되었습니다.");
            } else {
                $().toastmessage('showWarningToast', "데이터를 저장하는데 실패했습니다.");
            }
        }

    });

    return AppView;
});