var config = {
    AUTHOR: "김철기",
    EMAIL: "kimchulki77@naver.com",
    DEBUG: true,
    SITE_TITLE: "도매키트",
    SITE_DESC: "도매키트 프로그램입니다.",
    PORT: 8080,

    //MONGODB_URL: "mongodb://127.0.0.1:27017/test1",
    DB_PORT: 3306,
    DB_HOST: "localhost",
    DB_NAME: "backbone_test",
    DB_USER_NAME: "root",
    DB_USER_PW: "",
    DB_CONNECTION: "",
    DB_CONNECTION_LIMIT_TIME: 20,

    COOKIE_KEY: "",
    SESSION_KEY: "",
    SESSION_AGE: 60 * 1000 * 60 * 12,


    TABLE_USER: 'user',

    COLUMN_ID: '_id',
    COLUMN_USER_ID: 'user_id',
    COLUMN_NICKNAME: 'nickname',
    COLUMN_USER_PW: 'user_pw',

    TABLE_TODO: 'todo',

    COLUMN_TITLE: 'title',
    COLUMN_CONTENT: 'content',

    ACTION_READ : 'get',
    ACTION_UPDATE : 'update',
    ACTION_DELETE : 'delete',
    ACTION_CREATE : 'post'
};
module.exports = config;