/**
 * Created by mac on 15. 9. 25..
 */

define('App', [
    'jquery'
    , 'underscore'
    , 'bootstrap'
    , 'util'
    , 'lib/suncalc'
    , 'moment'
    , 'jqueryToast'
    , 'bs_datetimepicker'
    , 'text!templates/SupplyLogList.ejs'
    , 'text!templates/Setting.ejs'
    , 'text!templates/SettingSupplySectionRow.ejs'
    , 'text!templates/SettingSupplyNumberRow.ejs'
    //'backbone',
    //'AppView'
], function ($
    , _
    , bs
    , util
    , SunCalc
    , moment
    , jqueryToast
    , bs_datetimepicker
    , tplSupplyLogList
    , tplSetting
    , tplSettingSupplySectionRow
    , tplSettingSupplyNumberRow
             //, Backbone
             //, View
) {
    //new View;
    // 자바스크립트 캘린더

    moment.lang('kr');

    //region 부트스트랩
    $('[data-toggle="tooltip"]').tooltip();

    getSupplyLog({date: new Date()});
    $('#datetimepicker12').datetimepicker({
        inline: true,
        //sideBySide: true
    }).on('dp.show', function () {
        alert('show');
    }).on('dp.change', function (data) {
        getSupplyLog(data);
    });

    function getSupplyLog(data) {

        $.ajax({
            url: '/json/getSupplyLog/' + moment(data.date).format("YYYY-MM-DD"),
            success: function (aData) {
                var tpl = _.template(tplSupplyLogList);
                console.log('---data---');
                console.log(aData);
                console.log('---data---');

                $('#accordionSupplyLog').html(tpl(
                    {aData: aData}
                ));
            }
        })
    }

    function bindEventAddSection() {
        $('.btn-add-section').off().on('click', function () {
            var nCountTr
            // 현재 클릭한 곳의 부모엘리먼트를 받아옵니다.
                , $parentsSupplyNumber = $(this).parents('.supply-number')
                , tpl = _.template(tplSettingSupplySectionRow)
                , htmlTr = '';

            // 구역의 갯수를 카운트합니다.
            nCountTr = $parentsSupplyNumber.find('.tr-section').length + 1;

            //현재 구역의 갯수를 input value에 입력합니다.
            $parentsSupplyNumber.find('input[name=supply_section]').val(nCountTr);

            htmlTr = tpl(
                {
                    oData: {
                        nCountTr: nCountTr,
                        sPrintType: 'none'
                    }
                }
            );

            $parentsSupplyNumber.find('.table-section tbody').append(htmlTr);
        });
        $('.btn-remove-section').off().on('click', function () {
            var nCountTr
            // 현재 클릭한 곳의 부모엘리먼트를 받아옵니다.
                , $parentsSupplyNumber = $(this).parents('.supply-number')
                , htmlTr = '';

            // 구역의 갯수를 카운트를 한개 내립니다.
            nCountTr = $parentsSupplyNumber.find('.tr-section').length - 1;

            //현재 구역의 갯수를 input value에 입력합니다.
            $parentsSupplyNumber.find('input[name=supply_section]').val(nCountTr);

            if ($parentsSupplyNumber.find('.tr-section').length != 1) {

                $parentsSupplyNumber.find('.tr-section:last-child').remove();
            } else {
                $().toastmessage('showNoticeToast', "더 이상 제거할 구역이 없습니다.");
            }

        });
    }

    getSetting();
    function getSetting() {
        $.ajax({
            url: '/json/setting',
            success: function (oData) {
                var tpl = _.template(tplSetting)
                    , oDataValue = {};

                if (_.isEmpty(oData)) {
                    oData = {
                        value: {}
                    };
                }

                if (typeof oData == 'object') {
                    oDataValue = oData.value;

                    console.log("oMachineSettingValue", oDataValue);
                    $('.out-envi').html(tpl(
                        {oData: _.extend(oDataValue, {sPrintType: 'input'})}
                    ));
                    //region 구역, 삭제 이벤트
                    bindEventAddSection();
                    //endregion

                    $('[data-toggle="tooltip"]').tooltip();

                    /*
                     *
                     *
                     * 저장시 아래와 같이 ajax 를 통해서 전송됩니다.
                     INSERT INTO machine_setting SET userno='12',value='{"firstTimeSupply":"0:7121","lastTimeSupply":"18:30:00",
                     "radiation":"25000","maxSupplyInDay":"1009","minSupplyInDay":"909090","mode":"time","supply_number":["1","2","3"],
                     "supply_section":["4","2","2"],"ec":["0","0","0"],"ph":["0","0","0"],"supply_time":["0","0","0"],"supplySettingTitle":""}'

                     * */

                    //region 횟수 추가
                    $('#btnAddSupply').off().on('click', function () {
                        var countTr = $('#tabPanelSupplySetting .supply-number').length + 1
                            , htmlTr = ''
                            , templateSupplyNumberRow = _.template(tplSettingSupplyNumberRow);

                        $('#tabPanelSupplySetting>.panel>.panel-body').append(
                            templateSupplyNumberRow({
                                oData: {
                                    supply_number: [1],
                                    supply_section: [1],
                                    sPrintType: 'input'
                                }
                            })
                        );
                        console.log(templateSupplyNumberRow({
                            oData: {
                                supply_number: [1],
                                supply_section: [1],
                                sPrintType: 'input'
                            }
                        }));
                        //$('#tabPanelSuppEW
                        //region 구역, 삭제 이벤트
                        bindEventAddSection();
                        //endregion
                    });
                    $('#btnRemoveSupply').off().on('click', function () {
                        var $supply = $('.supply-number');

                        if ($supply.length != 1) {
                            $supply.last().remove();
                            $().toastmessage('showNoticeToast', '횟수를 제거했습니다. 남은 횟수 : ' + ($supply.length - 1));
                        } else {
                            $().toastmessage('showNoticeToast', "더 이상 제거할 공급이 없습니다.");
                        }
                    });
                    //endregion

                    $('#formSetting1 [name=mode]').on('change', function () {
                        var mode = $('#formSetting1 [name=mode]:checked').val();

                        switch (mode) {
                            case 'time':
                                $('#supplyRadiationWrap').addClass('hidden');
                                $('#supplyTimeWrap').removeClass('hidden');
                                break;
                            case 'radiation':
                                $('#supplyRadiationWrap').removeClass('hidden');
                                $('#supplyTimeWrap').addClass('hidden');
                                break;
                        }
                    });

                    $("#formSetting1").on('submit', function () {
                        $.ajax({
                            type: 'post',
                            url: '/json/insertSetting',
                            dataType: 'json',
                            data: $("#formSetting1").serialize(),
                            success: function (data) {
                                // 저장 성공여부에 따라 메시지를 출력합니다.
                                if (data.isSuccess == true) {
                                    $().toastmessage('showNoticeToast', "데이터가 성공적으로 저장되었습니다.");
                                } else {
                                    $().toastmessage('showWarningToast', "데이터를 저장하는데 실패했습니다.");
                                }
                                console.log('zzz' + JSON.stringify(data));
                            }
                        });
                        return false;
                    });

                    //설정 내용을 저장합니다.
                    $("#btnAddSupplySetting").on('click', function () {
                        $.post('/json/insertSupplySetting', $("#formSetting1").serialize(), function (oData) {

                            console.log(JSON.stringify(oData));
                            // 저장 성공여부에 따라 메시지를 출력합니다.
                            if (true) {
                                $().toastmessage('showNoticeToast', "데이터가 성공적으로 저장되었습니다.");
                            } else {
                                $().toastmessage('showWarningToast', "데이터를 저장하는데 실패했습니다.");
                            }
                        });
                    });
                    // 저장된 설정 내용을 불러옵니다.
                    $("#btnGetSupplySetting").on('click', function () {
                            var res
                                , oData
                                , id
                                , regdt
                                , html = '';

                            $.get('/json/getSupplySetting', function (aData) {
                                    console.log(aData);
                                    html += '<ul class="list-group" style="overflow: hidden;">';
                                    for (var i = 0; i < aData.length; i++) {
                                        if (aData[i].hasOwnProperty('value')) {
                                            oData = JSON.parse(aData[i].value);
                                            id = aData[i]._id;
                                            regdt = moment(aData[i].regdt).format("YYYY년 MM월 DD일 hh:mm:ss");

                                            console.log('get Supply Setting', oData);
                                            html += util.sprintf(
                                                '<li data-id="%s" class="clearfix list-group-item">' +
                                                '<div class="title pull-left">%s</div>' +
                                                '<time>%s</time>' +
                                                '<div class="pull-right">' +
                                                '<a class="btn-load-supply-setting btn btn-info btn-xs">불러오기</a>' +
                                                '<a class="btn-delete-supply-setting btn btn-danger btn-xs">삭제</a>' +
                                                '</div>' +
                                                '</li>'
                                                , id
                                                , oData['supplySettingTitle']
                                                , regdt
                                            );
                                        }
                                    }
                                    html += '</ul>';
                                    $('#modalSupplySetting .modal-body').html(html);
                                    $('#modalSupplySetting .modal-body .btn-delete-supply-setting').off().on('click', function () {
                                        var id = $(this).parents('[data-id]').data('id');

                                        $.post('/json/deleteSupplySetting/' + id, function (data) {
                                            // 다시 불러오기 위해서 추가했습니다.
                                            $("#btnGetSupplySetting").trigger('click');
                                        });
                                    });
                                    //"불러오기"버튼을 클릭하면, 해당 설정을 불러옵니다.
                                    $('#modalSupplySetting .modal-body .btn-load-supply-setting').off().on('click', function () {
                                            var id = $(this).parents('[data-id]').data('id');

                                            $.get('/json/getSupplySetting/' + id, function (aData) {
                                                var oDataValue = JSON.parse(aData[0].value)
                                                    , tpl = _.template(tplSettingSupplyNumberRow);

                                                console.log('oDataValue' + JSON.stringify(oDataValue));
                                                for (var key in oDataValue) {
                                                    $('[name=' + key + ']').val(oDataValue[key]);
                                                }
                                                $('#tabPanelSupplySetting').html(tpl(
                                                    {
                                                        oData: _.extend(oDataValue, {sPrintType: 'input'})
                                                    })
                                                );

                                                //region 구역, 삭제 이벤트
                                                bindEventAddSection();
                                                //endregion

                                                $('#modalSupplySetting').modal('hide');
                                            });
                                        }
                                    );

                                    $('#modalSupplySetting').modal('show');
                                }
                            );

                        }
                    );
                }
            }
        });
    }

//endregion

//region 일출 일몰
    var longitude = 37.555107
        , latitude = 126.970691
        , times = SunCalc.getTimes(new Date(), longitude, latitude)
        , sSunrise = times.sunrise.getHours() + ':' + times.sunrise.getMinutes()
        , sSunset = times.sunset.getHours() + ':' + times.sunset.getMinutes();

    $('#sunrise').text(sSunrise);
    $('#sunset').text(sSunset);
//endregion


})
;
