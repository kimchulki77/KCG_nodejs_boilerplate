var userController = require('./controllers/user_controller')
    , configController = require('./controllers/config')
    , todoController = require('./controllers/todoController');

var fs = require('fs');
var http = require('http');
//hello!!


exports.route = function (app, passport) {

    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy({
            usernameField: 'user_id',
            passwordField: 'user_pw',
            passReqToCallback: true
        }
        , userController.authenticate
    ));

// 인증 후, 사용자 정보를 Session에 저장함
    passport.serializeUser(function (user, done) {
        console.log('serialize' + JSON.stringify(user));
        done(null, user);
    });

// 인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.
    passport.deserializeUser(function (user, done) {
        //findById(id, function (err, user) {
        console.log('deserialize :::::' + user);

        done(null, user);
        //});
    });

    app.get('/', function (req, res) {
        res.render('pages/index');
    });

    app.get('/api/user', userController.getUsers);
    app.get('/api/user/:id', userController.getUser);
    app.put('/api/user/:id', userController.updateUser);

    app.get('/api/config', configController.getConfig);

    app.get('/api/todo', todoController.getTodos);
    app.get('/api/todo/:id', todoController.getTodo);
    app.post('/api/todo', todoController.createTodo);
    app.put('/api/todo/:id', todoController.updateTodo);
    app.delete('/api/todo/:id', todoController.deleteTodo);
    //region 로그인

    app.get('/login', userController.login);
    app.post('/login',
        passport.authenticate('local', {failureRedirect: '/loginFailure', failureFlash: true}),
        function (req, res) {
            console.log("authentic");
            res.redirect('/loginSuccess');
        });
    app.get('/loginFailure', userController.loginFailure);
    app.get('/loginSuccess', userController.ensureAuthenticated, userController.loginSuccess);

    app.get('/logout', userController.logout);
    app.get('/mypage', userController.mypage);

    //endregion


    //region 회원가입

    app.get('/join', userController.join);
    // 폼내용을 확인 한 후 DB에 회원정보를 저장합니다.
    app.post('/joinEnd', userController.joinEnd);

    //endregion

    app.get('/testSession', function (req, res) {
        //console.log('=======================');
        //global.data = {user: 'data'};
        //console.log(global.data);
        //console.log('=======================');
        res.send(global.data);
        //try {
        //    console.log(req.session.passport.user.userno);
        //} catch (e) {
        //    console.log('catch!!!');
        //    console.log(e);
        //}
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('pages/404');
    });


};