/**
 * Created by mac on 2016. 1. 7..
 */


define('TodoView', [
    'jquery'
    , 'backbone'
    , 'underscore'
    , 'util'
    , 'plugins'
    , 'text!templates/todo/TodoItem.ejs'
], function ($
    , Backbone
    , _
    , util
    , plugins
    , tplTodoItem) {

    return Backbone.View.extend({
        el: ''
        //, tag: 'tr'
        , tagName: 'tr'
        , initialize: function () {
            this.model.bind('destroy', this.remove, this);
        }
        , events: {
            'click input[data-action=del]': 'del'
        }
        , template: _.template(tplTodoItem)
        , render: function () {
            var tpl = this.template({todo: this.model.toJSON()});

            console.log(this.model.toJSON());

            this.$el.html(tpl);

            return this;
        }
        , del: function () {
            var sTitle = this.model.toJSON().title;

            if (confirm(util.format('"%s"를 정말로 삭제하시겠습니까?', sTitle))) {
                this.model.destroy({
                    wait: true,
                    success: function (model, response) {
                        plugins.toast('showNoticeToast', util.format('%s 이 성공적으로 제거되었습니다.', sTitle));
                    }
                });
            }
        }
        , remove: function () {
            this.$el.remove();
        }
    });
});