define('util', [
        'jquery'
    ],
    function ($) {
        //region jquery 기본 설정
        //어떤것이든 serialize할 수 있게해줍니다.
        $.fn.serializeAny = function () {
            var ret = [];
            $.each($(this).find(':input'), function () {
                ret.push(encodeURIComponent(this.name) + "=" + encodeURIComponent($(this).val()));
            });

            return ret.join("&").replace(/%20/g, "+");
        };
        //endregion
        return {
            sprintf: function (str) {
                var args = [].slice.call(arguments, 1),
                    i = 0;

                return str.replace(/%s/g, function () {
                    return args[i++];
                });
            }
        };

    });