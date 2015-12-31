/**
 * Created by 김철기 on 2015-03-25.
 */
/**
 * Grid-light theme for Highcharts JS
 * @author Torstein Honsi
 */
//
//// Load the fonts
//Highcharts.createElement('link', {
//    href: '//fonts.googleapis.com/css?family=Dosis:400,600',
//    rel: 'stylesheet',
//    type: 'text/css'
//}, null, document.getElementsByTagName('head')[0]);
//$('#datetimepicker1').datetimepicker({
//    format: 'YYYY/MM/DD'
//});
//$("#datetimepicker1").on("dp.change", function (e) {
//    var selectedDate = $('#datetimepicker1').data("date").split(" ")[0];// ex) 2015/05/08
//
//    $.isLoading({text: '데이터를 불러오는 중입니다..'});
//    socket.emit("sensorLogsByDt", {dt: selectedDate});
//});
//
//$('#btnExportTempToExcel').on('click', function () {
//    var selectedDate = $('#datetimepicker1').data("date").split(" ")[0];// ex) 2015/05/08
//
//    $.isLoading({text: '데이터를 불러오는 중입니다..'});
//    socket.emit("sensorLogsByDtForExcel", {dt: selectedDate});
//});

$('#datetimepicker1').datepicker({
    format: "yyyy/mm/dd",
    todayBtn: true,
    language: "kr",
    autoclose: true,
    todayHighlight: true,
    beforeShowDay: function (date) {
        if (date.getMonth() == (new Date()).getMonth())
            switch (date.getDate()) {
                case 4:
                    return {
                        tooltip: 'Example tooltip',
                        classes: 'active'
                    };
                case 8:
                    return false;
                case 12:
                    return "green";
            }
    },
    beforeShowMonth: function (date) {
        switch (date.getMonth()) {
            case 8:
                return false;
        }
    },
    datesDisabled: ['2015/09/03', '2015/09/7']
});
Highcharts.setOptions({
    lang: {
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        weekdays: ['월', '화', '수', '목', '금', '토', '일']
    }
});// 차트
// Apply the theme
Highcharts.setOptions(Highcharts.theme.white);
var inTemp = [10.5, 9, 2]
    , outTemp = [2.5, 2, 6]
    , outHumi = [50, 72, 90]
    , xCate = []
    , i;

for (i = 0; i < 24; i++) {
    xCate.push(i + '시');
}

// 차트설정
// 실내 환경
var chartInTemp = $("#chartInTemp").highcharts({
    title: {
        text: '외부온도',
        x: -20 //center
    },
    subtitle: {
        text: 'Modified by 스미',
        x: -20
    },
    xAxis: {
        title: {
            text: '시간 (시)'
        },
        categories: xCate
        //units: xCate
    },
    yAxis: {
        title: {
            text: '온도 (°C)'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: true
        }
    },
    tooltip: {
        valueSuffix: '°C'
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: [{
        name: '온도',
        data: inTemp
    }, {
        name: '설정 온도',
        data: outTemp
    }, {
        name: '습도',
        data: outHumi
    }, {
        name: '설정 습도',
        data: outHumi
    }]
});
// 실외 환경
$("#chartOutTemp").highcharts({
    title: {
        text: '내부온도',
        x: -20 //center
    },
    subtitle: {
        text: 'Modified by 스미',
        x: -20
    },
    xAxis: {
        title: {
            text: '시간 (시)'
        },
        //categories: xCate
        units: xCate
    },
    yAxis: {
        title: {
            text: '온도 (°C)'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: true
        }
    },
    tooltip: {
        valueSuffix: '°C'
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: [{
        name: '내부온도',
        data: inTemp
    }, {
        name: '외부온도',
        data: outTemp
    }, {
        name: '외부습도',
        data: outHumi
    }]
});