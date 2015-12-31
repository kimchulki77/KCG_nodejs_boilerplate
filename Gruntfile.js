/**
 * Created by mac on 2015. 12. 30..
 */

module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                },
                files: {
                    "public/css/result.css": "public/less/domekit_style.less"
                }
            }
        },
        watch: {
            files: "./public/less/*",
            tasks: ["less"]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
};