var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , session = require('express-session')
    , app = express()
    , server = http.createServer(app)
    , ejs = require("ejs")
    , io
//, url = require("url")
    , bodyParser = require("body-parser")
    , cookieParser = require('cookie-parser')
    , fs = require("fs")
    , config = require('./config')
    , db = require('./db').getInstance()
    , flash = require('connect-flash'); // session 관련해서 사용됨. 로그인 실패시 session등 클리어하는 기능으로 보임.

var passport = require('passport');


db.connect();

//region res.locals라는 곳에 데이터를 저장하여 공유가능합니다.
app.use(function (req, res, next) {
    res.locals = {
        siteTitle: config.SITE_TITLE,
        author: config.AUTHOR,
        site_desc: config.SITE_DESC
    };
    next();
});
//endregion
//region EXPRESS SETTING

// 쿠키를 파싱합니다.
app.use(cookieParser(config.COOKIE_KEY));
// post 나 get 을 사용하기 위해서 body부분을 파싱하기 위해 필요합니다.
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(session({
    secret: config.SESSION_KEY,
    cookie: {
        // 기간을 12시간 유지
        maxAge: config.SESSION_AGE
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//endregion

routes.route(app, passport);

var httpServer = server.listen(global.config.PORT, function () {
    console.log('Express server listening on port ' + server.address().port);
});

process.on('exit', function () {
    db.disconnect();
});
process.on('uncaughtException', function (error) {
    console.log('예외발생 : ' + error);
});
server.on('connection', function () {
    console.log('server connection');
});
server.on('request', function () {
    console.log('server request');
});
server.on('close', function () {
    console.log('server close');
});