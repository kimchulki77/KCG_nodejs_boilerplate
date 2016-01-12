/**
 * Created by mac on 2016. 1. 7..
 */


define('TodoEditView', [
    'jquery'
    , 'backbone'
    , 'underscore'
    , 'util'
    , 'plugins'
    , 'text!templates/todo/TodoEditItem.ejs'
], function ($
    , Backbone
    , _
    , util
    , plugins
    , tplTodoEditItem) {

    return Backbone.View.extend({
        el: ''
        , tagName: 'tr'
        , initialize: function () {
        }
        , events: {
            'click input[data-action=update]': 'update'
        }
        , template: _.template(tplTodoEditItem)
        , render: function () {
            var tpl = this.template({todo: this.model.toJSON()});

            this.$el.html(tpl);

            return this;
        }
        , update: function (ev) {
            var oData = this.$el.serializeAnyToObject();

            this.model.save(oData, {
                success: function () {
                    plugins.toast('showNoticeToast', "성공적으로 저장했습니다.");
                }
            });

            return false;
        }
    });
});