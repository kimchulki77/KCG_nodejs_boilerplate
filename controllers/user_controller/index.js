/**
 * Created by mac on 15. 10. 28..
 */

var User = require('../../models/User')
    , _ = require('underscore-node')
    , user = new User()
//, pass = require('../../pass')
    , util = require('util');

//region PASSPORT 인증과 관련한 함수입니다.
exports.authenticate = function (req, userId, userPw, done) {

    user.getUserInfoById(userId, function (dbError, dbResult) {
        if (dbError) {
            console.log('err' + dbError);
            return;
        }
        console.log(JSON.stringify(dbResult));

        if (userId == dbResult[0].user_id && userPw == dbResult[0].user_pw) {
            var user = {
                'userno': dbResult[0].userno
            };
            // global.data 가 객체가 아닐경우 객체로 만들어줍니다.
            if (req.data == undefined) {
                req.data = {};
            }
            // 전역변수에 회원정보를 저장합니다.
            req.data.user = dbResult[0];

            return done(null, user);
        } else {
            return done(null, false);
        }
    });

};
exports.ensureAuthenticated = function (req, res, next) {
    console.log("req.isAuthenticated())" + req.isAuthenticated());
    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
    if (req.isAuthenticated()) {
        return next();
    }
    // 로그인이 안되어 있으면, login 페이지로 진행
    res.redirect('/login');
};
exports.getUsers = getUsers;
function getUsers(req, res) {
    user
        .select()
        .doQuery(function (dbErr, dbRes) {
            if (dbErr) {
                console.log(dbErr);
                return;
            }

            res.send(dbRes);
            res.end();
        });
}
exports.getUser = getUser;
function getUser(req, res) {
    var id = req.params.id;

    user
        .select()
        .setWhere({_id: id})
        .doQuery(function (dbErr, dbRes) {
            if (dbErr) {
                res.end();
                return;
            }
            console.log(dbRes);

            res.send(dbRes);
            res.end();
        })
}
exports.updateUser = updateUser;
function updateUser(req, res) {
    var oBody = req.body;

    user.update()
        .setColumnAndValue({
            nickname: oBody.nickname
            , user_pw: oBody.user_pw
            , user_id: oBody.user_id
        })
        .setWhere({_id: oBody._id})
        .doQuery(function (dbErr, dbRes) {
            if (dbErr) {
                console.log(dbErr);
                return;
            }
            res.send(dbRes);
            res.end();
        })
}
//endregion
function getUserno(req, res, fn) {
    var userno = 0;

    isLogin(req, res, function (isLogin) {
        if (isLogin == true) {
            try {
                userno = req.session.passport.user.userno;
                fn(userno);
            } catch (e) {
                console.log(e);
            }
        } else {
            // 로그인이 안되어 있으면, login 페이지로 진행
            res.redirect('/login');
        }
    });
}


/*
 * 회원정보를 받아옵니다.
 * */
function getUserInfo(userno, fn) {
    isExistUser(userno, function (isExist) {
        if (isExist == true) {
            user
                .select({
                    COLUMN: 'userno, user_id, user_pw',
                    WHERE: util.format('userno="%s"', userno)
                })
                .doQuery(fn);
        } else {
            console.log('존재 않함');
        }
    });
}
/*
 * 회원정보를 받아옵니다.
 * */
function getUserById(userId, fn) {
    isExistUserById(userId, function (isExist) {
        if (isExist == true) {
            console.log('user exist');
            user
                .select({
                    COLUMN: 'userno, user_id, user_pw',
                    WHERE: util.format('user_id="%s"', userId)
                })
                .doQuery(fn);
        } else {
            console.log('존재 않함');
        }
    });
}
/*
 * 회원존재를 확인합니다.
 */
function isExistUser(userno, fn) {
    user
        .select({
            COLUMN: 'userno',
            WHERE: util.format('userno="%s"', userno)
        })
        .doQuery(
            function (dbError, dbResult) {
                //데이터가 존재하면
                if (dbResult[0] != null) {
                    console.log("회원 있다");
                    fn(true);
                } else {
                    console.log("회원 없다");
                    fn(false);
                }
            });
}
/*
 * 회원존재를 확인합니다.
 */
function isExistUserById(userId, fn) {

    user
        .select({
            COLUMN: 'userno',
            WHERE: util.format('user_id="%s"', userId)
        })
        .doQuery(function (dbError, dbResult) {
            //데이터가 존재하면
            if (dbResult[0] != null) {
                console.log("회원 있다");
                fn(true);
            } else {
                console.log("회원 없다");
                fn(false);
            }
        });
}

/*
 * 회원을 생성합니다.
 * */
function createUser(oUser, fn) {
    var that = this;

    this.isExistUserById(oUser.user_id, function (isExist) {
        if (isExist == true) {
            console.log('아이디가 이미 존재하여 회원가입할 수 없습니다.');
        } else {
            console.log('아이디가 존재하지 않으므로 회원가입할 수 있습니다.');

            queryMaker
                .insert({
                    COLUMN: util.format('user_id="%s", user_pw="%s"', oUser.user_id, oUser.user_pw)
                })
                .doQuery(fn);
        }
    });
}

exports.getUserno = getUserno;

exports.login = function (req, res) {
    var data = {};

    data = _.extend(data, {user: ''});

    res.render('pages/user/login', data);
};
exports.loginFailure = function (req, res) {
    res.send('failure ::::' + req.user);
};
exports.loginSuccess = function (req, res) {
    res.redirect('/');
};


function isLogin(req, res, fn) {
    var isLogin = false;
    try {
        if (req.session.passport.user.userno) {
            isLogin = true;
        }
    } catch (e) {
        console.log(e);
    }

    fn(isLogin);
}
exports.isLogin = isLogin;

exports.logout = function (req, res) {
    console.log('logout suucc');
    req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
    });
    //res.send('success ::::' + req.user);
};

function mypage(req, res) {
    var data = {};

    getUserno(req, res, function (userno) {
        user.getUserInfo(userno, function (dbError, dbResult) {
            if (dbError) return;
            data = _.extend(data, {user: dbResult[0]});
            res.render('pages/user/mypage', data);
            res.end();
        })
    });
}
exports.mypage = mypage;

exports.join = function (req, res) {
    res.render('pages/user/join');
};

exports.joinEnd = function (req, res) {
    var oUserInfo = req.body
        , oData;
    oUserInfo.user_pw = oUserInfo.user_pw;

    user.createUser(oUserInfo, function (dbError, dbResult) {
        if (dbError) {
            console.log('err' + dbError);
            return;
        }
        res.redirect('/login');


        aData = _.extend(req, {oMachineSetting: dbResult[0]});
        /*
         res.render('pages/user/join_success', oData);
         // 회원가입에 성공하면 성공페이지를 실패하면 실패페이지를 출력합니다.
         if (true) {
         } else {
         }
         */
    });
};
