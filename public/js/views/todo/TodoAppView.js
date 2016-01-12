/**
 * Created by mac on 2016. 1. 7..
 */

define('TodoAppView', [
    'jquery'
    , 'backbone'
    , 'underscore'
    , 'util'
    , 'Todos'
    , 'TodoView'
    , 'TodoEditView'
    , 'text!templates/todo/TodoParent.ejs'
], function ($
    , Backbone
    , _
    , util
    , Todos
    , TodoView
    , TodoEditView
    , tplTodoParent) {
    var todos = new Todos();

    return Backbone.View.extend({
        el: '.home-container'
        , initialize: function () {
            todos.bind('add', this.addOne, this);
            todos.bind('reset', this.addAll, this);


        }
        , render: function () {
            todos.fetch({reset: true});
            //엘리먼트를 초기화합니다.
            this.$el.html(this.template());

        }
        , template: _.template(tplTodoParent)
        , events: {
            'keypress #newTodo': 'createTodo'
            , 'click .change-mode': 'changeMode'
        }
        , addOne: function (model) {
            var todoView;

            //초기값은 ACTION_READ로합니다.
            this.mode ? this.mode : this.mode = config.ACTION_READ;

            if (this.mode == config.ACTION_UPDATE) {
                todoView = new TodoEditView({
                    model: model
                });
            } else if (this.mode == config.ACTION_READ) {
                todoView = new TodoView({
                    model: model
                });
            }

            this.$el.find('tbody').append(todoView.render().$el);
        }
        , addAll: function (models) {
            var that = this;
            console.log(models);

            models.each(function (model) {
                that.addOne(model);
            });
        }
        , createTodo: function (ev) {
            if (ev.keyCode != 13) {
                return;
            }
            todos.create({title: $('#newTodo').val()}, {wait: true});
        }
        , changeMode: function (ev) {

            //mode에 따라 토글합니다.
            if (!this.mode
                || this.mode == config.ACTION_READ) {
                this.mode = config.ACTION_UPDATE;
            } else if (this.mode == config.ACTION_UPDATE) {
                this.mode = config.ACTION_READ;
            }

            this.$el.find('tbody').children().remove();
            todos.fetch({reset:true});
        }
    });
});