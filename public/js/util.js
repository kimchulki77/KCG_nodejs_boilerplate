define('util', [
        'jquery'
        , 'bootstrap'
    ],
    function ($
        , bs) {
        //region jquery 기본 설정
        // 어떤 eleement든 serialzie() 가능합니다.
        $.fn.serializeAny = function () {
            var ret = [];
            $.each($(this).find(':input'), function () {
                ret.push(encodeURIComponent(this.name) + "=" + encodeURIComponent($(this).val()));
            });

            return ret.join("&").replace(/%20/g, "+");
        };
        // serializeAny를 사용한 것을 object로 반환합니다.
        $.fn.serializeAnyToObject = function () {
            var params = {};

            //if( !this.is("a") || this.attr("href").indexOf("?") == -1 )
            //    return( result );

            var pairs = $(this).serializeAny().split('&');
            pairs.forEach(function (pair) {
                pair = pair.split('=');
                if (pair[1] !== undefined) {
                    var key = decodeURIComponent(pair[0]),
                        value = decodeURIComponent(pair[1]);

                    value = value ? value.replace(/\++/g, ' ').trim() : '';

                    if (key.length === 0) {
                        return;
                    }
                    if (params[key] === undefined) {
                        params[key] = value;
                    }
                    else {
                        if ("function" !== typeof params[key].push) {
                            params[key] = [params[key]];
                        }
                        params[key].push(value);
                    }
                }
            });
            return ( params )
        }
        $.fn.serializeObject = function () {
            var o = Object.create(null),
                elementMapper = function (element) {
                    element.name = $.camelCase(element.name);
                    return element;
                },
                appendToResult = function (i, element) {
                    var node = o[element.name];

                    if ('undefined' != typeof node && node !== null) {
                        o[element.name] = node.push ? node.push(element.value) : [node, element.value];
                    } else {
                        o[element.name] = element.value;
                    }
                };

            $.each($.map(this.serializeArray(), elementMapper), appendToResult);
            return o;
        };


        //endregion
        return {
            format: function (str) {
                var args = [].slice.call(arguments, 1),
                    i = 0;

                return str.replace(/%s/g, function () {
                    return args[i++];
                });
            }
        };

    });