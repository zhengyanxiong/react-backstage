/*$(function () {
    andZLSCData();

});*/

//解码
function uncode(str) {
    return str.replace(/&#(x)?([^&]{1,5});?/g, function (a, b, c) {
        return String.fromCharCode(parseInt(c, b ? 16 : 10));
    });
}
function RandomNumBoth(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random(2);
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}
/**
 * 获取地址栏参数
 * @param name hallCode 营业厅编码
 * @returns
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

var hallCode = GetQueryString('hallCode');

$(function () {
    getHallInfor();
    loadGridAnalyze();
});


var peopleNum = 0;
var ageData = []; //年龄数据
var genderData = [];//性别比例数据
var aroundLLTTLData = [];//流量吞吐量分析
function loadGridAnalyze() {
    var gridURL = "/app?service=page/app.bigShow&listener=loadGridAnalyze&ajax_random=" + Math.floor(Math.random() * 10000 + 10);
    /*$.ajax({
        type: "post",
        url: gridURL,
        data: {hallCode: hallCode},
        dataType: "json",
        success: function (data) {

            if (data[0].ResultCode == 'noLogin') {
                alert(uncode(data[0].ResultInfo));
                window.location.href = '/mapp/login/login.html?redirect_page=%2fapp%3fservice%3dpage%2fapp.publiccontainer%26listener%3dinitPage%26redirect_page%3dmapp%2fbigScreenShow%2fbusinessAnalyze.html';
            } else {
                var hallName = uncode(data[0].HALL_NAME);
                hallName = '重庆移动' + hallName + '智慧运营平台';
                $('#hall_name').html(hallName);

                $('#three_01').attr('href', '/app?service=page/app.sharecontainer&listener=initPage&redirect_page=mapp/bigScreenShow/businessAnalyze.html');
                $('#three_02').attr('href', '/app?service=page/app.sharecontainer&listener=initPage&redirect_page=mapp/bigScreenShow/businessManagement.html');


                setInterval(function () {
                    window.location.href = '/app?service=page/app.sharecontainer&listener=initPage&redirect_page=mapp/bigScreenShow/businessAnalyze.html';
                }, 2 * 60 * 1000);

                var aroundUserList = data[0].aroundUserList;*/

                $("#resident").html(112);
                $("#realtime").html(232);
                var wuxin = {value: RandomNumBoth(231,334)};
                var sixin = {value: RandomNumBoth(231,334)};
                var sanxin = {value: RandomNumBoth(231,334)};
                var erxin = {value: RandomNumBoth(271,334)};
                var yixin = {value: RandomNumBoth(231,534)};
                aroundXJYHChart.hideLoading();
                aroundXJYHChart.setOption({
                    series: [
                        {
                            name: '五星及以上用户',
                            itemStyle: {
                                normal: {
                                    label: {
                                        formatter: function (param) {
                                            var data = wuxin;
                                            if (param.name != 'other')
                                                return param.name + ': ' + data.value + '%';
                                            else
                                                return '';
                                        }
                                    }
                                }
                            }
                        },
                        {
                            name: '四星用户',
                            itemStyle: {        // 图形样式
                                normal: {
                                    label: {
                                        formatter: function (param) {
                                            var data = sixin;
                                            if (param.name != 'other')
                                                return param.name + ': ' + data.value + '%';
                                            else
                                                return '';
                                        }
                                    }
                                }
                            }
                        },
                        {
                            name: '三星用户',
                            itemStyle: {        // 图形样式
                                normal: {
                                    label: {
                                        position: 'left',
                                        color: '#E6E6E6',
                                        formatter: function (param) {
                                            var data = sanxin;
                                            if (param.name != 'other')
                                                return param.name + ': ' + data.value + '%';
                                            else
                                                return '';
                                        }
                                    }
                                }
                            }
                        },
                        {
                            name: '二星用户',
                            itemStyle: {        // 图形样式
                                normal: {
                                    label: {
                                        formatter: function (param) {
                                            var data = erxin;
                                            if (param.name != 'other')
                                                return param.name + ': ' + data.value + '%';
                                            else
                                                return '';
                                        }
                                    }
                                }
                            }
                        },
                        {
                            name: '一星用户',
                            itemStyle: {        // 图形样式
                                normal: {
                                    label: {
                                        formatter: function (param) {
                                            var data = yixin;
                                            if (param.name != 'other')
                                                return param.name + ': ' + data.value + '%';
                                            else
                                                return '';
                                        }
                                    }
                                }
                            }
                        }
                    ]
                });

                var miguAndweixin = {
                    MIGUNUM: RandomNumBoth(330,445),
                    WEINUM: RandomNumBoth(330,545)
                };
                $('#miGuContainer').html(template('MiWeiNum', miguAndweixin));

                loadResidentInfo();

                /*if (data[0].SUCCESS) {

                    var ageList = data[0].gridAgeData;
                    var genderList = data[0].gridGenderData;
                    var flag = 0;
                    for (var a in ageList) {
                        peopleNum += ageList[a].count;

                        if (uncode(ageList[a].label) == '等于0') {
                            ageData.push({value: ageList[a].count, name: '17岁以下'});
                        } else if (uncode(ageList[a].label) == '在24至27之间') {
                            ageData.push({value: ageList[a].count, name: '18-28岁 '});
                        } else if (uncode(ageList[a].label) == '大于60') {
                            ageData.push({value: ageList[a].count, name: '60岁以上'});
                        } else {
                            flag += ageList[a].count;
                        }
                    }
                    if (peopleNum > 0) {
                        ageData.push({value: flag, name: '29-60岁'});
                        aroundAgeChart.hideLoading();
                        aroundAgeChart.setOption({
                            legend: [{
                                name: 'first',
                                data: [{name: '17岁以下', icon: 'circle'},
                                    {name: '29-60岁', icon: 'circle'}],
                                formatter: function (name) {
                                    var data = [];
                                    for (var i = 0; i < ageData.length; i++) {
                                        if (ageData[i].name.indexOf('17岁以下') || ageData[i].name.indexOf('29-60岁')) {
                                            data.push(ageData[i]);
                                        }
                                    }
                                    var total = 0;
                                    var target;
                                    var show;
                                    for (var i = 0; i < data.length; i++) {
                                        total += data[i].value;
                                        if (name == data[i].name) {
                                            target = data[i].value;
                                        }

                                        show = ['{a|' + name + '}   ' + '{b|' + ((target / total) * 100).toFixed(2) + '%}',];

                                    }
                                    return show.join('\n');
                                }
                            }, {
                                name: 'second',
                                data: [{name: '18-28岁 ', icon: 'circle'},
                                    {name: '60岁以上', icon: 'circle'}],
                                formatter: function (name) {
                                    var data = [];
                                    for (var i = 0; i < ageData.length; i++) {
                                        if (ageData[i].name.indexOf('18-28岁 ') || ageData[i].name.indexOf('60岁以上')) {
                                            data.push(ageData[i]);
                                        }
                                    }
                                    var total = 0;
                                    var target;
                                    var show;
                                    for (var i = 0; i < data.length; i++) {
                                        total += data[i].value;
                                        if (name == data[i].name) {
                                            target = data[i].value;
                                        }
                                        show = ['{a|' + name + '}   ' + '{b|' + ((target / total) * 100).toFixed(2) + '%}',];

                                    }
                                    return show.join('\n');
                                }
                            }],
                            series: [{
                                name: '年龄',
                                data: ageData
                            }]
                        });
                    }
                    var manData = [];
                    var womanData = [];
                    for (var g in genderList) {
                        if (genderList[g].label.length == 8) {
                            genderData.push({value: genderList[g].count, name: uncode(genderList[g].label) + '性'});
                            if (uncode(genderList[g].label) == "男") {
                                manData.push(genderList[g].count)
                            } else {
                                womanData.push(genderList[g].count)
                            }
                        }
                    }
                    aroundSexChart.hideLoading();
                    aroundSexChart.setOption({
                        legend: [{
                            name: '男性',
                            formatter: function (name) {
                                var data = genderData;
                                var total = 0;
                                var target;
                                var show;
                                for (var i = 0; i < data.length; i++) {
                                    total += data[i].value;
                                    if (name == data[i].name) {
                                        target = data[i].value;
                                    }
                                    show = '{b|}\n{a|' + ((target / total) * 100).toFixed(2) + '%' + '}';
                                }
                                return show;
                            }
                        },
                            {
                                name: '女性',
                                formatter: function (name) {
                                    var data = genderData;
                                    var total = 0;
                                    var target;
                                    var show;
                                    for (var i = 0; i < data.length; i++) {
                                        total += data[i].value;
                                        if (name == data[i].name) {
                                            target = data[i].value;
                                        }
                                        show = '{b|}\n{a|' + ((target / total) * 100).toFixed(2) + '%' + '}';
                                    }
                                    return show;
                                }
                            }],
                        series: [
                            {
                                name: '男性',
                                data: manData
                            },
                            {
                                name: '女性',
                                data: womanData
                            }
                        ]
                    });

                    aroundLLTTLData = [
                        {value: data[0].local, name: '本地人口：'},
                        {value: data[0].roamin, name: '外地人口：'},
                        {value: data[0].national, name: '国际友人：'}];

                    var llttSum = parseInt(data[0].local) + parseInt(data[0].roamin) + parseInt(data[0].national);

                    aroundLLTTLAnalyzeChart.setOption({
                        legend: [{
                            formatter: function (name) {
                                var data = aroundLLTTLData;
                                var total = 0;
                                var target;
                                var show;
                                for (var i = 0; i < data.length; i++) {
                                    /!*total += data[i].value;*!/
                                    if (name == data[i].name) {
                                        target = data[i].value;
                                    }

                                    show = ['{a|' + name + '}   ' + '{b|' + ((target / llttSum) * 100).toFixed(2) + '%}',];

                                }
                                return show.join('\n');
                            },
                        }],
                        series: [
                            {
                                name: '本地人口：',
                                data: [
                                    {value: data[0].local, name: ''},
                                    {value: llttSum, name: '本地人口'}
                                ]
                            },
                            {
                                name: '外地人口：',
                                data: [
                                    {value: llttSum - data[0].local, name: '外地人口'},
                                    {value: data[0].roamin, name: ''}
                                ]
                            }, {
                                name: '国际友人：',
                                data: [
                                    {value: data[0].national, name: '国际友人'},
                                    {value: 80, name: ''}]
                            }
                        ]
                    })


                } else {
                    if (data[0].QUERY_SUCCESS == -1) {
                        alert("没有该编码(" + hallCode + ")的营业厅")
                        location.href = '/app?service=page/app.sharecontainer&listener=initPage&redirect_page=mapp/bigScreenShow/businessAnalyze.html&hallCode=' + hallCode
                        return;
                    }*/

                    $("#resident").html(3450);
                    $("#realtime").html(4650);
                    aroundAgeChart.hideLoading();
                    aroundAgeChart.setOption({
                        legend: [{
                            name: 'first',
                            data: [{name: '17岁以下', icon: 'circle'},
                                {name: '29-60岁', icon: 'circle'}],
                            formatter: function (name) {
                                var data = [
                                    {value: 335, name: '17岁以下'},
                                    {value: 310, name: '29-60岁'}
                                ];
                                var total = 369;
                                var target;
                                var show;
                                for (var i = 0; i < data.length; i++) {
                                    total += data[i].value;
                                    if (name == data[i].name) {
                                        target = data[i].value;
                                    }
                                    show = ['{a|' + name + '}   ' + '{b|' + ((target / total) * 100).toFixed(2) + '%}',];
                                }
                                return show.join('\n');
                            }
                        }, {
                            name: 'second',
                            data: [{name: '18-28岁 ', icon: 'circle'},
                                {name: '60岁以上', icon: 'circle'}],
                            formatter: function (name) {
                                var data = [
                                    {value: 234, name: '18-28岁 '},
                                    {value: 135, name: '60岁以上'}
                                ];
                                var total = 645;
                                var target;
                                var show;
                                for (var i = 0; i < data.length; i++) {
                                    total += data[i].value;
                                    if (name == data[i].name) {
                                        target = data[i].value;
                                    }
                                    show = ['{a|' + name + '}   ' + '{b|' + ((target / total) * 100).toFixed(2) + '%}',];
                                }
                                return show.join('\n');
                            }
                        }],
                        series: [{
                            name: '年龄',
                            data: [
                                {value: 335, name: '17岁以下'},
                                {value: 310, name: '29-60岁'},
                                {value: 234, name: '18-28岁 '},
                                {value: 135, name: '60岁以上'}
                            ]
                        }]
                    });

                    aroundSexChart.hideLoading();
                    aroundSexChart.setOption({
                        legend: [{
                            name: '男性',
                            formatter: function (name) {
                                var data = [
                                    {value: 320, name: '男性'},
                                    {value: 120, name: '女性'}
                                ];
                                var total = 0;
                                var target;
                                var show;
                                for (var i = 0; i < data.length; i++) {
                                    total += data[i].value;
                                    if (name == data[i].name) {
                                        target = data[i].value;
                                    }
                                    show = '{b|}\n{a|' + ((target / total) * 100).toFixed(2) + '%' + '}';
                                }
                                return show;
                            }
                        },
                            {
                                name: '女性',
                                formatter: function (name) {
                                    var data = [
                                        {value: 320, name: '男性'},
                                        {value: 120, name: '女性'}
                                    ];
                                    var total = 0;
                                    var target;
                                    var show;
                                    for (var i = 0; i < data.length; i++) {
                                        total += data[i].value;
                                        if (name == data[i].name) {
                                            target = data[i].value;
                                        }
                                        show = '{b|}\n{a|' + ((target / total) * 100).toFixed(2) + '%' + '}';
                                    }
                                    return show;
                                }
                            }],
                        series: [
                            {
                                name: '男性',
                                data: [320]
                            },
                            {
                                name: '女性',
                                data: [120]
                            }
                        ]
                    });

                    aroundLLTTLData = [
                        {value: 465, name: '本地人口：'},
                        {value: 30, name: '外地人口：'},
                        {value: 5, name: '国际友人：'}
                    ];
                    aroundLLTTLAnalyzeChart.setOption({
                        legend: [{
                            formatter: function (name) {
                                var data = aroundLLTTLData;
                                var total = 0;
                                var target;
                                var show;
                                for (var i = 0; i < data.length; i++) {
                                    total += data[i].value;
                                    if (name == data[i].name) {
                                        target = data[i].value;
                                    }

                                    show = ['{a|' + name + '}   ' + '{b|' + ((target / total) * 100).toFixed(2) + '%}',];

                                }
                                return show.join('\n');
                            },
                        }],
                        series: [
                            {
                                name: '本地人口：',
                                data: [
                                    {value: 100, name: ''},
                                    {value: 360, name: '本地人口'}
                                ]
                            },
                            {
                                name: '外地人口：',
                                data: [
                                    {value: 360, name: '外地人口'},
                                    {value: 100, name: ''}
                                ]
                            }, {
                                name: '国际友人：',
                                data: [
                                    {value: 100, name: '国际友人'},
                                    {value: 360, name: ''}]
                            }
                        ]
                    })
    /*   }
  /* }

},
ror: function (data) {

}
});*/
}


//驻留时长统计
var hours = ['12am', '1am', '2am', '3am', '4am', '5am', '6am',
    '7am', '8am', '9am', '10am', '11am',
    '12pm', '1pm', '2pm', '3pm', '4pm', '5pm',
    '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];
var y_hours = ['0.5h', '2h', '4h',
    '6h以上'];

var zlscData = [];

//加载周边驻留人口数据
function loadResidentInfo() {

    var residentList = [
            {INSERT_HOUR:1,XY2:222},
            {INSERT_HOUR:1,XY4:222},
            {INSERT_HOUR:1,XY6:222},
            {INSERT_HOUR:1,DY6:222},
            {INSERT_HOUR:2,XY2:222},
            {INSERT_HOUR:2,XY4:222},
            {INSERT_HOUR:2,XY6:222},
            {INSERT_HOUR:2,DY6:222},
            {INSERT_HOUR:3,XY2:222},
            {INSERT_HOUR:3,XY4:222},
            {INSERT_HOUR:3,XY6:222},
            {INSERT_HOUR:3,DY6:222},
            {INSERT_HOUR:4,XY2:222},
            {INSERT_HOUR:4,XY4:222},
            {INSERT_HOUR:4,XY6:222},
            {INSERT_HOUR:4,DY6:222},
            {INSERT_HOUR:5,XY2:222},
            {INSERT_HOUR:5,XY4:222},
            {INSERT_HOUR:5,XY6:222},
            {INSERT_HOUR:5,DY6:222},

        ];
    //alert(residentList)

    for (var r in residentList) {

        var now_hour = parseInt(residentList[r].INSERT_HOUR);
        zlscData.push([0, now_hour, (residentList[r].XY2) / 100]);
        zlscData.push([1, now_hour, (residentList[r].XY4) / 100]);
        zlscData.push([2, now_hour, (residentList[r].XY6) / 100]);
        zlscData.push([3, now_hour, (residentList[r].DY6) / 100]);

    }

    zlscData = zlscData.map(function (item) {
        return [item[1], item[0], item[2]];
    });
    aroundZLSCChar.setOption({
        series: [{
            name: 'Punch Card',
            data: zlscData

        }]
    })

}

// = [[0, 0, 50], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4]];

var aroundZLSCChar = echarts.init(document.getElementById('ZLSC'));
aroundZLSCChar.setOption({
    tooltip: {
        show: false,
        position: 'top',
        formatter: function (params) {
            return params.value[2] + ' commits in ' + hours[params.value[0]] + ' of ' + y_hours[params.value[1]];
        }
    },
    grid: {
        left: 5,
        top: 20,
        bottom: 15,
        right: 10,
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: hours,
        boundaryGap: false,
        splitLine: {
            show: true,
            interval: 0,
            lineStyle: {
                color: '#999',
                type: 'dashed'
            }
        },
        axisTick: {
            alignWithLabel: false,
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#3B4455',
                width: 0
            }
        },
        axisLabel: {
            color: '#E6E6E6',
            fontSize: 10
        }
    },
    yAxis: {
        type: 'category',
        data: y_hours,
        axisTick: {
            alignWithLabel: false,
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#3B4455',
                width: 0
            }
        },
        axisLabel: {
            color: '#E6E6E6',
            fontSize: 10
        }
    },
    series: [{
        name: 'Punch Card',
        type: 'scatter',
        symbolSize: function (val) {
            return val[2] * 3.5;
        },
        data: [],
        animationDelay: function (idx) {
            return idx * 5;
        }
    }]
});

//周边星级用户统计
var aroundXJYHChart = echarts.init(document.getElementById('XJYH'));
aroundXJYHChart.setOption({
    series: [
        {
            name: '五星及以上用户',
            type: 'funnel',
            left: '14%',
            width: '71%',
            top: '10%',
            gap: 0,
            bottom: '5%',
            hoverAnimation: false,
            avoidLabelOverlap: false,
            zlevel: 1,
            z: 0,
            sort: 'ascending',
            itemStyle: {
                normal: {
                    borderColor: '#F07532',
                    borderWidth: 2,
                    shadowColor: '#F07532',
                    shadowBlur: 10,
                    shadowOffsetX: -1,
                    shadowOffsetY: 1,
                    color: '#F07532',
                    label: {
                        position: 'left',
                        color: '#E6E6E6',
                        formatter: function (param) {
                            if (param.name != 'other')
                                return param.name + ': ' + param.value + '%';
                            else
                                return '';
                        }
                    },
                    labelLine: {
                        show: false,
                        length: 30,
                        lineStyle: {
                            color: ['rgba(0,0,0,1)', 'rgba(0,0,0,0)']
                        }
                    }
                },
                emphasis: {
                    label: {
                        color: '#E6E6E6',
                        fontSize: 14
                    }
                }
            },
            tooltip: {
                show: false
            },
            data: [
                {value: 20, name: '五星及以上用户'},
                {value: 40, name: 'other'},
                {value: 60, name: 'other'},
                {value: 80, name: 'other'},
                {value: 100, name: 'other'}

            ]
        },
        {
            name: '四星用户',
            type: 'funnel',
            left: '14%',
            width: '71%',
            top: '24%',
            gap: 0,
            bottom: '5%',
            zlevel: 2,
            z: 1,
            sort: 'ascending',
            itemStyle: {        // 图形样式
                normal: {
                    borderColor: '#F99E3B',
                    color: '#F99E3B',
                    label: {
                        position: 'right',
                        color: '#E6E6E6',
                        formatter: function (param) {
                            if (param.name != 'other')
                                return param.name + ': ' + param.value + '%'
                            else
                                return '';
                        }
                    },
                    labelLine: {
                        show: false,
                        length: 60
                    },
                    opacity: 1    // 系列1图形透明度
                },
                emphasis: {
                    label: {
                        color: '#E6E6E6',
                        fontSize: 14
                    }
                }
            },
            tooltip: {
                show: false			// 让系列一(金字塔外层图形的提示框不显示)
            },
            data: [
                {value: 20, name: '四星用户'},
                {value: 40, name: 'other'},
                {value: 60, name: 'other'},
                {value: 80, name: 'other'},
                {value: 100, name: 'other'},

            ]
        },
        {
            name: '三星用户',
            type: 'funnel',
            left: '14%',
            width: '71%',
            top: '38%',
            bottom: '5%',
            zlevel: 5,
            sort: 'ascending',
            itemStyle: {        // 图形样式
                normal: {
                    borderColor: '#8AC55C',
                    color: '#8AC55C',
                    label: {
                        position: 'left',
                        color: '#E6E6E6',
                        formatter: function (param) {
                            if (param.name != 'other')
                                return param.name + ': ' + param.value + '%'
                            else
                                return '';
                        }
                    },
                    labelLine: {
                        show: false,
                        length: 105
                    },
                    opacity: 1    // 系列1图形透明度
                },
                emphasis: {
                    label: {
                        color: '#E6E6E6',
                        fontSize: 14
                    }
                }
            },
            tooltip: {
                show: false			// 让系列一(金字塔外层图形的提示框不显示)
            },
            data: [
                {value: 20, name: '三星用户'},
                {value: 40, name: 'other'},
                {value: 60, name: 'other'},
                {value: 80, name: 'other'},
                {value: 100, name: 'other'},


            ]
        },
        {
            name: '二星用户',
            type: 'funnel',
            left: '14%',
            width: '71%',
            top: '49%',
            bottom: '5%',
            zlevel: 6,
            sort: 'ascending',     // 金字塔形:'ascending',  漏斗图形:'descending'
            itemStyle: {        // 图形样式
                normal: {
                    borderColor: '#32B09C',
                    color: '#32B09C',
                    opacity: 1, // 系列1图形透明度
                    label: {
                        position: 'right',
                        color: '#E6E6E6',
                        formatter: function (param) {
                            if (param.name != 'other')
                                return param.name + ': ' + param.value + '%'
                            else
                                return '';
                        }
                    },
                    labelLine: {
                        show: false,
                        length: 135
                    }
                },
                emphasis: {
                    label: {
                        color: '#E6E6E6',
                        fontSize: 14
                    }
                }
            },
            tooltip: {
                show: false			// 让系列一(金字塔外层图形的提示框不显示)
            },
            data: [
                {value: 20, name: '二星用户'},
                {value: 40, name: 'other'},
                {value: 60, name: 'other'},
                {value: 80, name: 'other'},
                {value: 100, name: 'other'},


            ]
        },
        {
            name: '一星用户',
            type: 'funnel',
            left: '14%',
            width: '71%',
            top: '62%',
            bottom: '5%',
            color: '#1E8F7E',
            zlevel: 7,
            backgroundColor: '#1E8F7E',
            sort: 'ascending',     // 金字塔形:'ascending',  漏斗图形:'descending'
            itemStyle: {        // 图形样式
                normal: {
                    borderColor: '#1E8F7E',

                    opacity: 1,
                    label: {
                        position: 'left',
                        color: '#E6E6E6',
                        formatter: function (param) {
                            if (param.name != 'other')
                                return param.name + ': ' + param.value + '%'
                            else
                                return '';
                        }
                    },
                    labelLine: {
                        show: false,
                        length: 135
                    }
                },
                emphasis: {
                    label: {
                        color: '#E6E6E6',
                        fontSize: 14
                    }
                }
            },
            tooltip: {
                show: false			// 让系列一(金字塔外层图形的提示框不显示)
            },
            data: [
                {value: 20, name: '一星用户'},
                {value: 40, name: 'other', textStyle: {color: 'rgba(0,0,0,0)'}},
                {value: 60, name: 'other'},
                {value: 80, name: 'other'},
                {value: 100, name: 'other'},


            ]
        }
    ]
});

//周边年龄分析
var aroundAgeChart = echarts.init(document.getElementById('around-age'));
aroundAgeChart.setOption({
    background: '',
    color: function (params) {
        //自定义颜色
        var colorList = [
            '#4DA3FF', '#2A20FF', '#F4BD3D', '#FF3324'
        ];
        return colorList[params.dataIndex]
    },

    title: [{
        text: '年龄',
        left: '15%',
        top: '32%',
        textStyle: {
            color: '#ccc',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            fontSize: 18
        }
    }],
    legend: [{
        name: 'first',
        orient: 'horizontal',
        x: '36%',
        y: '28%',
        data: [],
        formatter: function (name) {
            var data = [
                {value: 335, name: '17岁以下'},
                {value: 310, name: '29-60岁'}
            ];
            var total = 0;
            var target;
            var show;
            for (var i = 0; i < data.length; i++) {
                total += data[i].value;
                if (name == data[i].name) {
                    target = data[i].value;
                }

                show = ['{a|' + name + '}   ' + '{b|' + ((target / total) * 100).toFixed(2) + '%}',];

            }
            return show.join('\n');
        },
        textStyle: {
            rich: {
                a: {
                    fontSize: 14,
                    color: '#E6E6E6',
                    align: 'center'
                },
                b: {
                    fontSize: 14,
                    color: '#E6E6E6',
                    align: 'center'
                }
            }
        }
    }, {
        name: 'second',
        orient: 'horizontal',
        x: '36%',
        y: '48%',
        data: [],
        formatter: function (name) {
            var data = [];
            var total = 0;
            var target;
            var show;
            for (var i = 0; i < data.length; i++) {
                total += data[i].value;
                if (name == data[i].name) {
                    target = data[i].value;
                }

                show = ['{a|' + name + '}   ' + '{b|' + ((target / total) * 100).toFixed(2) + '%}',];

            }
            return show.join('\n');
        },
        textStyle: {
            rich: {
                a: {
                    fontSize: 14,
                    color: '#E6E6E6',
                    align: 'center'
                },
                b: {
                    fontSize: 14,
                    color: '#E6E6E6',
                    align: 'center'
                }
            }
        }
    }],
    series: [
        {
            name: '年龄',
            type: 'pie',
            radius: ['60%', '80%'],
            center: ['20%', '42%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            hoverLayerThreshold: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '14'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: true
                }
            },
            data: []
        }
    ]
});
aroundAgeChart.showLoading();

//周边性别比例
var aroundSexChart = echarts.init(document.getElementById('sex_pre'));
aroundSexChart.setOption({
    title: [{
        text: '性别',
        left: '35%',
        top: '3%',
        textStyle: {
            color: '#ccc',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            fontSize: 18
        }
    }],
    tooltip: {
        show: false,
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: [{
        name: '男性',
        icon: 'none',
        data: ['男性'],
        /*itemWidth: 30,
        itemHeight: 30,
        x: '1%',
        y: '24%',*/
        formatter: function (name) {
            var data = [];
            var total = 0;
            var target;
            var show;
            for (var i = 0; i < data.length; i++) {
                total += data[i].value;
                if (name == data[i].name) {
                    target = data[i].value;
                }
                show = '{a|((target / total) * 100).toFixed(2) + ' % '}';
            }
            return show;
        },
        textStyle: {
            fontSize: 13,
            padding: [28, 109, 0, -88],
            rich: {
                a: {
                    lineHeight: 25,
                    align: 'left'

                },
                b: {
                    height: 30,
                    width: 30,
                    align: 'left',
                    backgroundColor: {
                        image: '/bigScreenShow/image/icon-female.png'
                    }
                }
            },
            color: '#E6E6E6'
        }
    }, {
        name: '女性',
        icon: 'none',
        data: ['女性'],
        itemWidth: 10,
        itemHeight: 10,
        x: '67%',
        y: '65%',
        formatter: function (name) {
            var data = [];
            var total = 0;
            var target;
            var show;
            for (var i = 0; i < data.length; i++) {
                total += data[i].value;
                if (name == data[i].name) {
                    target = data[i].value;
                }
                show = name + ' ' + ((target / total) * 100).toFixed(2) + '%';
            }
            return show;
        },
        textStyle: {
            fontSize: 13,
            padding: [-38, -67, 0, -88],
            rich: {
                a: {
                    lineHeight: 25,
                    align: 'right'

                },
                b: {
                    height: 30,
                    width: 30,
                    align: 'right',
                    backgroundColor: {
                        image: '/bigScreenShow/image/icon-male.png'
                    }
                }
            },
            color: '#E6E6E6'
        }
    }],
    grid: {
        left: '15%',
        right: '15%',
        bottom: '36%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        show: false
    },
    yAxis: {
        type: 'category',
        data: [''],
        show: false
    },
    series: [
        {
            name: '男性',
            type: 'bar',
            stack: '总量',
            barWidth: 18,
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            },
            itemStyle: {
                normal: {
                    color: '#61c4d6'
                }
            },
            data: [320]
        },
        {
            name: '女性',
            type: 'bar',
            stack: '总量',
            barWidth: 18,
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            },
            itemStyle: {
                normal: {
                    color: '#488ee3'
                }
            },
            data: [120]
        }
    ]
});
aroundSexChart.showLoading();

//流量吞吐量分析
var aroundLLTTLAnalyzeChart = echarts.init(document.getElementById('LLTTLAnalyze'));
aroundLLTTLAnalyzeChart.setOption({
    tooltip: {
        show: false,
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: [{
        orient: 'vertical',
        x: '36%',
        y: '28%',
        data: [{name: '本地人口：', icon: 'none'},
            {name: '外地人口：', icon: 'none'},
            {name: '国际友人：', icon: 'none'}],
        formatter: function (name) {
            var data = [
                {value: 465, name: '本地人口：'},
                {value: 30, name: '外地人口：'},
                {value: 5, name: '国际友人：'}
            ];
            var total = 0;
            var target;
            var show;
            for (var i = 0; i < data.length; i++) {
                total += data[i].value;
                if (name == data[i].name) {
                    target = data[i].value;
                }

                show = ['{a|' + name + '}   ' + '{b|' + ((target / total) * 100).toFixed(2) + '%}',];

            }
            return show.join('\n');
        },
        textStyle: {
            rich: {
                a: {
                    fontSize: 12,
                    color: '#E6E6E6',
                    align: 'center'
                },
                b: {
                    fontSize: 12,
                    color: '#E6E6E6',
                    align: 'center'
                }
            }
        }
    }],
    series: [
        {
            name: '本地人口：',
            type: 'pie',
            radius: ['56%', '60%'],
            center: ['25%', '56%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '10',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 100, name: ''},
                {value: 360, name: '本地人口'}
            ],
            itemStyle: {
                normal: {
                    color: function (params) {
                        //自定义颜色
                        var colorList = [
                            '#77f46a', '#3c445b'
                        ];
                        return colorList[params.dataIndex]
                    }
                }
            }
        },
        {
            name: '外地人口：',
            type: 'pie',
            radius: ['46%', '50%'],
            center: ['25%', '56%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '10',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 360, name: '外地人口'},
                {value: 100, name: '邮件营销'}
            ],
            itemStyle: {
                normal: {
                    color: function (params) {
                        //自定义颜色
                        var colorList = [
                            '#3c445b', '#faf14f'
                        ];
                        return colorList[params.dataIndex]
                    }
                }
            }
        }, {
            name: '国际友人：',
            type: 'pie',
            radius: ['36%', '40%'],
            center: ['25%', '56%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    formatter: "{d}%"
                }
            },
            data: [
                {value: 100, name: '国际友人'},
                {value: 360, name: ''}],
            itemStyle: {
                normal: {
                    color: function (params) {
                        //自定义颜色
                        var colorList = [
                            '#db7b38', '#3c445b'
                        ];
                        return colorList[params.dataIndex]
                    }
                }
            }
        }
    ]
});