var socket = io();

var $inEnvi = $('.in-envi')
    , $outEnvi = $('.out-envi');

// JSON 구조
// data = {
// 'inEnvi' : {socket.emit("sensorLogsByDt",{dt:'2015-05-08'});
// "curTemp" : in_curTemp,
// "setTEmp" : in_setTemp,
// "curHumi" : in_curHumi,
// "setHumi" : in_setHumi
// },
// 'outEnvi' :{
// 'curTemp' :out_curTemp,
// 'setTemp' :out_setTemp,
// 'curHumi' :out_curHumi,
// 'setHumi' :out_setHumi
// }
// }
socket.on('sensorLogsByDtForExcel', function (datas) {
    $.isLoading('hide');
    if (_.isEmpty(datas)) {
        $().toastmessage('showNoticeToast', "해당 날짜에는 저장된 데이터가 없습니다.");
    } else {
        // json을 CSV로 바꿉니다.
        var jscvs = JSON2CSV(datas);

        // 해당 행의 제목을 위해서 추가합니다.
        jscvs = "내부온도,설정온도,내부습도,설정습도,날짜\n" + jscvs;

        // 파일로 저장시킵니다.
        var blob = new Blob([jscvs], {type: "text/plain;charset=utf-8"});
        saveAs(blob, moment().format("YYYY[-]MM[-]DD") + "_온도.csv");
    }
});
socket.on('sensorLogsByDt', function (datas) {
    $.isLoading('hide');
    if (_.isEmpty(datas)) {
        $().toastmessage('showNoticeToast', "해당 날짜에는 저장된 데이터가 없습니다.");
    } else {
        var curTemps = []
            , setTemps = []
            , curHumis = []
            , setHumis = []
            , maxTemp = 0
            , minTemp = 0
            , averTemp = 0
            , sumTemp = 0
            , maxHumi = 0
            , minHumi = 0
            , averHumi = 0
            , sumHumi = 0
            , xCates = []
            , i
            , max;

        for (i in datas) {
            curTemps.push(datas[i].in_curTemp);
            setTemps.push(datas[i].in_setTemp);
            curHumis.push(datas[i].in_curHumi);
            setHumis.push(datas[i].in_setHumi);
            xCates.push(datas[i].dt);
        }
        maxTemp = _.max(curTemps);
        minTemp = _.min(curTemps);
        maxHumi = _.max(curHumis);
        minHumi = _.min(curHumis);

        for (i = 0
                 , max = curTemps.length; i < max; i++) {
            sumTemp += curTemps[i];
        }
        averTemp = sumTemp / max;

        for (i = 0
                 , max = curHumis.length; i < max; i++) {
            sumHumi += curHumis[i];
        }
        averHumi = sumHumi / max;

        console.log(maxTemp + "::" + minTemp + "::" + maxHumi + "::" + minHumi +
        ":: 평균온도" + averTemp + ":: 평균습도" + averHumi +
        "모두 합친온도" + sumTemp + "모두 합친 습도" + sumHumi);

        $("#inTempMax .value").text(maxTemp);
        $("#inTempMin .value").text(minTemp);
        $("#inTempAver .value").text(averTemp);
        $("#inHumiMax .value").text(maxHumi);
        $("#inHumiMin .value").text(minHumi);
        $("#inHumiAver .value").text(averHumi);

        $("#chartInTemp").highcharts({
            chart: {
                events: {
                    load: function () {
                    }
                },
                zoomType: 'x'
            },
            xAxis: {
                title: {
                    text: '시간'
                },
                categories: xCates
            },
            yAxis: {
                title: {
                    text: '온도 (°C)'
                }
            },
            title: {
                text: '내부 온도'
            },
            subtitle: {
                text: '' // dummy text to reserve space for dynamic subtitle
            },
            series: [{
                name: '온도',
                data: curTemps,
                //pointStart: Date.UTC(2015, 5, 8),
                //pointInterval: 3600 * 1000,
                tooltip: {
                    //headerFormat: '<b>{point.y}</b><br />',
                    //pointFormat: '{point.x}°C',
                    valueDecimals: 1,
                    valueSuffix: '°C'
                }
            }, {
                name: '설정 온도',
                data: setTemps,
                //pointStart: Date.UTC(2015, 5, 8),
                //pointInterval: 3600 * 1000,
                tooltip: {
                    //headerFormat: '<b>{point.y}</b><br />',
                    //pointFormat: '{point.x}°C',
                    valueDecimals: 1,
                    valueSuffix: '°C'
                }
            }]
        });
        $("#chartInHumi").highcharts({
            chart: {
                events: {
                    load: function () {
                    }
                },
                zoomType: 'x'
            },
            xAxis: {
                title: {
                    text: '시간'
                },
                categories: xCates
            },
            yAxis: {
                title: {
                    text: '습도 %'
                }
            },
            title: {
                text: '내부 습도'
            },
            subtitle: {
                text: '' // dummy text to reserve space for dynamic subtitle
            },
            series: [{
                name: '습도',
                data: curHumis,
                tooltip: {
                    valueDecimals: 1,
                    valueSuffix: '%'
                }
            }, {
                name: '설정 습도',
                data: setHumis,
                tooltip: {
                    valueDecimals: 1,
                    valueSuffix: '%'
                }
            }]
        });
        //console.log(JSON.stringify(curTemps));
    }
});
socket.on('toClient', function (data) {
    var dataInEnvi = data['inEnvi']
        , dataOutEvi = data['outEnvi'];
    dataInEnvi = data['inEnvi'];
    dataOutEvi = data['outEnvi'];

    console.log(JSON.stringify(data));

    // 화면에 현재 센서값을 출력시킵니다.
    $inEnvi.find('.cur-temp .value').text(dataInEnvi.in_curTemp);
    $inEnvi.find('.set-temp .value').text(dataInEnvi.in_setTemp);
    $inEnvi.find('.cur-humi .value').text(dataInEnvi.in_curHumi);
    $inEnvi.find('.set-humi .value').text(dataInEnvi.in_setHumi);
    $inEnvi.find('.sunrise .value').text(dataInEnvi.sunrise);
    $inEnvi.find('.sunset .value').text(dataInEnvi.sunset);
    $inEnvi.find('.cur-time .value').text(dataInEnvi.curTime);

    //데이터베이스에 현재 센서값을 저장합니다.

});