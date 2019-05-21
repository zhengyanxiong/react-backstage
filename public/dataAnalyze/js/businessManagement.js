
var hallCode = GetQueryString('hallCode');
$(function () {
    loadKlData();
});

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


function RandomNumBoth(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random(2);
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}

//到店客户年龄阶段分析
function getAgeRage() {

    var ageRageUrl = "/app?service=page/app.bigShow&listener=getAgeRage&ajax_random=" + Math.floor(Math.random() * 10000 + 1);
    /*$.ajax({
        type: "post",
        url: ageRageUrl,
        data: {},
        dataType: "json",
        success: function (data) {
            var resultCode = data[0].QUERY_SUCCESS;
            if (resultCode == 0) {
                var ageRageList = data[0].AGE_RAGE;
                if (uncode(ageRageList[0].COUNT_NUM) == '�') {
                    liquidAgeChart.setOption({
                        series: [{
                            name: '少年(<=17岁)',
                            data: [{
                                value: 0.16,
                                itemStyle: {
                                    normal: { //正常样式
                                        color: '#f1f04e',
                                        opacity: 0.6
                                    }
                                }
                            }],
                            label: {
                                formatter: function (parm) {
                                    return (parm.value) * 10 * 10 + "%";
                                }
                            }
                        }, {
                            name: '青年(18-28岁)',
                            data: [{
                                value: 0.2,
                                itemStyle: {
                                    normal: { //正常样式
                                        color: '#5ab3e6',
                                        opacity: 0.6
                                    }
                                }
                            }],
                            label: {
                                formatter: function (parm) {
                                    return ((parm.value) * 100).toFixed(2) + "%";
                                }
                            }
                        }, {
                            name: '中年(29-60岁)',
                            data: [{
                                value: 0.434,
                                itemStyle: {
                                    normal: { //正常样式
                                        color: '#7cf9fb',
                                        opacity: 0.6
                                    }
                                }
                            }],
                            label: {
                                formatter: function (parm) {
                                    return (parm.value) * 10 * 10 + "%";
                                }
                            }
                        }, {
                            name: '老年(>=60岁)',
                            data: [{
                                value: 0.226,
                                itemStyle: {
                                    normal: { //正常样式
                                        color: '#ea813a',
                                        opacity: 0.6
                                    }
                                }
                            }],
                            label: {
                                formatter: function (parm) {
                                    return (parm.value) * 10 * 10 + "%";
                                }
                            }
                        }
                        ]
                    });
                } else {*/
                    liquidAgeChart.setOption({
                        series: [{
                            name: '大学一年级',
                            data: [{
                                value: 0.1,
                                itemStyle: {
                                    normal: { //正常样式
                                        color: '#f1f04e',
                                        opacity: 0.6
                                    }
                                }
                            }],
                            label: {
                                formatter: function (parm) {
                                    return (parseFloat(parm.value) * 100) .toFixed(2)  + "%";
                                }
                            }
                        }, {
                            name: '大学二年级',
                            data: [{
                                value: 0.37,
                                itemStyle: {
                                    normal: { //正常样式
                                        color: '#5ab3e6',
                                        opacity: 0.6
                                    }
                                }
                            }],
                            label: {
                                formatter: function (parm) {
                                    return (parseFloat(parm.value) * 100) .toFixed(2)  + "%";
                                }
                            }
                        }, {
                            name: '大学三年级',
                            data: [{
                                value: 0.18,
                                itemStyle: {
                                    normal: { //正常样式
                                        color: '#7cf9fb',
                                        opacity: 0.6
                                    }
                                }
                            }],
                            label: {
                                formatter: function (parm) {
                                    return (parseFloat(parm.value) * 100) .toFixed(2) + "%";
                                }
                            }
                        }, {
                            name: '大学四年级',
                            data: [{
                                value: 0.45,
                                itemStyle: {
                                    normal: { //正常样式
                                        color: '#ea813a',
                                        opacity: 0.6
                                    }
                                }
                            }],
                            label: {
                                formatter: function (parm) {
                                    return (parseFloat(parm.value) * 100) .toFixed(2) + "%";
                                }
                            }
                        }
                        ]
                    });
                /*}

            } else {

            }

        },
        error: function (data) {

        }
    });*/
}

var base = +new Date();
var nextSecond = 5000;
var date = [];
var data1 = [RandomNumBoth(3.2, 5)];
var now = new Date();
var day = 20;

function addData(shift) {

    var ne = now.toLocaleString('chinese', {hour12: false});
    date.unshift(ne.substring(ne.length - 8));
    data1.push(RandomNumBoth(3.2, 4) + Math.random(1));
    if (shift) {
        date.pop();
        data1.shift();
    }
    now = new Date(now - 3000);
}

for (var i = 0; i < day; i++) {
    addData();
}

/*function getRealTimeIO(flag, listNum) {
    var URL = "/app?service=page/app.bigShow&listener=getRealTimeIO&ajax_random=" + Math.floor(Math.random() * 10000 + 10);
    $.ajax({
        type: "post",
        url: URL,
        data: {flag: flag, listNum: listNum},
        dataType: "json",
        success: function (data) {
            var resultCode = data[0].code;
            if (resultCode != '100001') {

                if (flag == 'init') {

                    listIO = data[0].realIOList;
                    llttChart.setOption({
                        series: [{
                            data: (function () {
                                var res = [];
                                var len = bar_num;
                                for (var l = 0; l < len; l++) {
                                    res.push(listIO[l]);
                                }
                                return res;
                            })()
                        }]

                    });
                } else {

                    count = bar_num + 1;
                    newIOV = data[0].realIO;
                }


            } /!*else {
                llttChart.setOption({
                    series: [{
                        data: (function () {
                            var res = [];
                            var len = bar_num;
                            while (len --){
                                res.push(RandomNumBoth(30.5, 31.2) + Math.random(1));
                            }
                            return res;
                        })()
                    }]

                });

            }*!/

        },
        error: function (data) {

        }
    });
}*/

var llttChart = echarts.init(document.getElementById('liuliangtunlv'));
var bar_num = 36;
llttChart.setOption({
    grid: {
        x: 60,
        y: 10,
        x2: 25,
        y2: 30
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            axisLabel: {
                show: false,
                color: '#E6E6E6',
                fontSize: 13,
                align: 'center'
            },
            axisLine: {
                lineStyle: {
                    color: '#344bb4',
                    width: 1
                }
            },
            axisTick: false,
            data: (function () {
                var now = new Date();
                var res = [];
                var len = bar_num;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                    now = new Date(now - 2000);
                }
                return res;
            })()
        },
        {
            type: 'category',
            show: false,
            boundaryGap: true,
            data: (function () {
                var res = [];
                var len = bar_num;
                while (len--) {
                    res.push(10 - len - 1);
                }
                return res;
            })()
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,

            splitLine: {
                show: false,
                lineStyle: {
                    color: '#3B4455',
                    type: 'solid'
                }
            },
            axisLabel: {
                color: '#E6E6E6',
                fontSize: 10,
                formatter: '{value} G'
            },
            axisLine: {
                lineStyle: {
                    color: '#344bb4',
                    width: 1
                }
            },
            axisTick: false,
            boundaryGap: [0.2, 0.2]
        }
    ],
    series: [
        {
            name: '流量吞吐量',
            type: 'bar',
            barWidth: 6,
            xAxisIndex: 1,
            yAxisIndex: 0,
            itemStyle: {
                emphasis: {
                    barBorderRadius: 7
                },
                normal: {
                    barBorderRadius: 7,
                    borderWidth: 1,
                    borderColor: new echarts.graphic.LinearGradient(
                        1, 0, 1, 1,
                        [
                            {offset: 0, color: '#3448f4'},
                            {offset: 1, color: '#20d0fb'}

                        ]
                    ),
                    color: '#FFFFFF00'

                },

            },
            data: (function () {
                var res = [];
                var len = bar_num;
                while (len --){
                    res.push(RandomNumBoth(30.5, 31.2) + Math.random(1));
                }
                return res;
            })()
        }
    ]
});

var listIO;
var newIOV;
/*llttChart.setOption({
                series: [{
                    data: (function () {
                        var res = [];
                        var len = bar_num;
                        while (len --){
                            res.push(RandomNumBoth(30.5, 31.2) + Math.random(1));
                        }
                        return res;
                    })()
                }]

            });*/
/*llttChart.setOption(llttChartOption);*/
//llttChart.showLoading();
count = bar_num + 1;
setInterval(function () {
    /*getRealTimeIO('second', 0);*/

    setTimeout(function () {
        /*if(listIO == null || listIO == 'null' || listIO == 'undefind'){
            llttChart.setOption({
                series: [{
                    data: (function () {
                        var res = [];
                        var len = bar_num;
                        while (len --){
                            res.push(RandomNumBoth(30.5, 31.2) + Math.random(1));
                        }
                        return res;
                    })()
                }]

            });
        }*/
        axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

        lloption = llttChart.getOption();

        var data0 = lloption.series[0].data;
        data0.shift();
        if(newIOV == null || newIOV == 'null' || newIOV == "undefind"){
            data0.push(RandomNumBoth(30.5, 31.3) + Math.random(1));
        } else {
            data0.push(newIOV);
        }
        lloption.xAxis[0].data.shift();
        lloption.xAxis[0].data.push(axisData);
        lloption.xAxis[1].data.shift();
        lloption.xAxis[1].data.push(count++);

        llttChart.setOption(lloption, true);
    }, 1000);

}, 3100);


//客流量分析
var KLLFXLine = [];
var KLLFXPoint = new Array();

/*KLLFXPoint[0] = RandomNumBoth(20, 150);
KLLFXPoint[1] = RandomNumBoth(40, 150);
KLLFXPoint[2] = RandomNumBoth(40, 150);
KLLFXPoint[3] = RandomNumBoth(40, 150);
KLLFXPoint[4] = RandomNumBoth(30, 150);
KLLFXPoint[5] = RandomNumBoth(60, 150);
KLLFXPoint[6] = RandomNumBoth(50, 150);
KLLFXPoint[7] = RandomNumBoth(40, 150);
KLLFXPoint[8] = RandomNumBoth(30, 150);
KLLFXPoint[9] = RandomNumBoth(20, 150);
KLLFXPoint[10] = RandomNumBoth(20, 80);


for (var i = 0; i < KLLFXPoint.length; i++) {
    KLLFXLine.push(KLLFXPoint[i]);
}*/


function loadKlData() {
    //加载年龄阶段分析
    getAgeRage();
    var KLURL = "/app?service=page/app.bigShow&listener=loadKlData&ajax_random=" + Math.floor(Math.random() * 10000 + 10);
    /*$.ajax({
        type: "post",
        url: KLURL,
        data: {hallCode: hallCode},
        dataType: "json",
        success: function (data) {
            if (data[0].ResultCode == 'noLogin') {
                alert(uncode(data[0].ResultInfo));
                window.location.href = '/mapp/login/login.html?redirect_page=%2fapp%3fservice%3dpage%2fapp.publiccontainer%26listener%3dinitPage%26redirect_page%3dmapp%2fbigScreenShow%2fbusinessAnalyze.html';
            } else {
                var resultCode = data[0].QUERY_SUCCESS;
                if (data[0].NO_HALL_INFOR != 0) {
                    var hallName = uncode(data[0].HALL_NAME);
                    hallName = '重庆移动' + hallName + '智慧运营平台';
                    $('#hall_name').html(hallName);

                    $('#two_01').attr('href', '/app?service=page/app.sharecontainer&listener=initPage&redirect_page=mapp/bigScreenShow/businessAnalyze.html');
                    $('#two_03').attr('href', '/app?service=page/app.sharecontainer&listener=initPage&redirect_page=mapp/bigScreenShow/gridAnalyze.html');

                    setInterval(function () {
                        window.location.href = '/app?service=page/app.sharecontainer&listener=initPage&redirect_page=mapp/bigScreenShow/gridAnalyze.html';
                    }, 2 * 60 * 1000);

                    if (resultCode == 0) {

                        var kllList = data[0].KLL_ANALYZE;

                        changeKLLFXLine(kllList);
                        KLLFXChart.setOption({
                            series: [{
                                name: '客流量',
                                data: KLLFXLine
                            }]
                        });

                        var sex = data[0].SEXPRE;

                        for (var s in sex) {
                            if (uncode(sex[s].SEX) == "女士") {
                                $(".rotio-bd-rt span").html(sex[s].SEX_PRO + '%');
                                $(".rotio-bd-rt p").width(sex[s].SEX_PRO + '%');
                            }
                            if (uncode(sex[s].SEX) == "先生") {
                                $(".rotio-bd-lt span").html(sex[s].SEX_PRO + '%');
                                $(".rotio-bd-lt p").width(sex[s].SEX_PRO + '%');
                            }
                        }

                        if (sex == null || sex == 'null' || sex == 'undefind') {

                            $(".rotio-bd-rt span").html(45.5 + '%');
                            $(".rotio-bd-rt p").width(45.5 + '%');
                            $(".rotio-bd-lt span").html(54.5 + '%');
                            $(".rotio-bd-lt p").width(54.5 + '%');

                        }


                    }


                    //加载吞吐量
                    getRealTimeIO('init', 36);

                }
            }

        },
        error: function (data) {
            console.log("系统错误");
        }
    });*/
}

setInterval(function () {
    loadKlData();
}, 5 * 60 * 1000);

function changeKLLFXLine(kllList) {
    var kData = new Date();


    var num = 0;
    for (var k = 0; k < kllList.length; k++) {
        num += parseInt(kllList[k].KLCOUNT);
    }
    $("#today_num").html(num);

    if (kData.getHours() == 8) {
        for (var i = 0; i < 1; i++) {
            KLLFXLine.push(0);
        }
        if (KLLFXLine[0] == '' || KLLFXLine[0] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 8) {
                    KLLFXLine.splice(0, 1, kllList[k].KLCOUNT);
                }
            }
        }
    } else if (kData.getHours() == 9) {
        for (var i = 0; i < 2; i++) {
            KLLFXLine.push(0);
        }

        if (KLLFXLine[0] == '' || KLLFXLine[0] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 8) {
                    KLLFXLine.splice(0, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[1] == '' || KLLFXLine[1] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 9) {
                    KLLFXLine.splice(1, 1, kllList[k].KLCOUNT);
                }
            }
        }

    } else if (kData.getHours() == 10) {
        for (var i = 0; i < 3; i++) {
            KLLFXLine.push(0);
        }

        if (KLLFXLine[0] == '' || KLLFXLine[0] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 8) {
                    KLLFXLine.splice(0, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[1] == '' || KLLFXLine[1] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 9) {
                    KLLFXLine.splice(1, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[2] == '' || KLLFXLine[2] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 10) {
                    KLLFXLine.splice(2, 1, kllList[k].KLCOUNT);
                }
            }
        }

    } else if (kData.getHours() == 11) {
        for (var i = 0; i < 4; i++) {
            KLLFXLine.push(0);
        }

        $("#today_num").html(num);
        if (KLLFXLine[0] == '' || KLLFXLine[0] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 8) {
                    KLLFXLine.splice(0, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[1] == '' || KLLFXLine[1] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 9) {
                    KLLFXLine.splice(1, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[2] == '' || KLLFXLine[2] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 10) {
                    KLLFXLine.splice(2, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[3] == '' || KLLFXLine[3] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 11) {
                    KLLFXLine.splice(3, 1, kllList[k].KLCOUNT);
                }
            }
        }
    } else if (kData.getHours() == 12) {
        for (var i = 0; i < 5; i++) {
            KLLFXLine.push(0);
        }

        if (KLLFXLine[0] == '' || KLLFXLine[0] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 8) {
                    KLLFXLine.splice(0, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[1] == '' || KLLFXLine[1] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 9) {
                    KLLFXLine.splice(1, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[2] == '' || KLLFXLine[2] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 10) {
                    KLLFXLine.splice(2, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[3] == '' || KLLFXLine[3] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 11) {
                    KLLFXLine.splice(3, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[4] == '' || KLLFXLine[4] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 12) {
                    KLLFXLine.splice(4, 1, kllList[k].KLCOUNT);
                }
            }
        }
    } else if (kData.getHours() == 13) {
        for (var i = 0; i < 6; i++) {
            KLLFXLine.push(0);
        }
        if (KLLFXLine[0] == '' || KLLFXLine[0] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 8) {
                    KLLFXLine.splice(0, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[1] == '' || KLLFXLine[1] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 9) {
                    KLLFXLine.splice(1, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[2] == '' || KLLFXLine[2] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 10) {
                    KLLFXLine.splice(2, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[3] == '' || KLLFXLine[3] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 11) {
                    KLLFXLine.splice(3, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[4] == '' || KLLFXLine[4] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 12) {
                    KLLFXLine.splice(4, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[5] == '' || KLLFXLine[5] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(5, 1, kllList[k].KLCOUNT);
                }
            }
        }
    } else if (kData.getHours() == 14) {
        for (var i = 0; i < 7; i++) {
            KLLFXLine.push(0);
        }
        if (KLLFXLine[0] == '' || KLLFXLine[0] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 8) {
                    KLLFXLine.splice(0, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[1] == '' || KLLFXLine[1] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 9) {
                    KLLFXLine.splice(1, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[2] == '' || KLLFXLine[2] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 10) {
                    KLLFXLine.splice(2, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[3] == '' || KLLFXLine[3] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 11) {
                    KLLFXLine.splice(3, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[4] == '' || KLLFXLine[4] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 12) {
                    KLLFXLine.splice(4, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[5] == '' || KLLFXLine[5] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(5, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[6] == '' || KLLFXLine[6] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(6, 1, kllList[k].KLCOUNT);
                }
            }
        }
    } else if (kData.getHours() == 15) {
        for (var i = 0; i < 8; i++) {
            KLLFXLine.push(0);
        }
        if (KLLFXLine[0] == '' || KLLFXLine[0] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 8) {
                    KLLFXLine.splice(0, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[1] == '' || KLLFXLine[1] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 9) {
                    KLLFXLine.splice(1, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[2] == '' || KLLFXLine[2] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 10) {
                    KLLFXLine.splice(2, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[3] == '' || KLLFXLine[3] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 11) {
                    KLLFXLine.splice(3, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[4] == '' || KLLFXLine[4] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 12) {
                    KLLFXLine.splice(4, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[5] == '' || KLLFXLine[5] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(5, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[6] == '' || KLLFXLine[6] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(6, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[7] == '' || KLLFXLine[7] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(7, 1, kllList[k].KLCOUNT);
                }
            }
        }
    } else if (kData.getHours() == 16) {
        for (var i = 0; i < 9; i++) {
            KLLFXLine.push(0);
        }
        if (KLLFXLine[0] == '' || KLLFXLine[0] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 8) {
                    KLLFXLine.splice(0, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[1] == '' || KLLFXLine[1] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 9) {
                    KLLFXLine.splice(1, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[2] == '' || KLLFXLine[2] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 10) {
                    KLLFXLine.splice(2, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[3] == '' || KLLFXLine[3] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 11) {
                    KLLFXLine.splice(3, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[4] == '' || KLLFXLine[4] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 12) {
                    KLLFXLine.splice(4, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[5] == '' || KLLFXLine[5] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(5, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[6] == '' || KLLFXLine[6] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(6, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[7] == '' || KLLFXLine[7] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(7, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[8] == '' || KLLFXLine[8] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(8, 1, kllList[k].KLCOUNT);
                }
            }
        }

    } else if (kData.getHours() == 17) {
        for (var i = 0; i < 10; i++) {
            KLLFXLine.push(0);
        }
        if (KLLFXLine[0] == '' || KLLFXLine[0] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 8) {
                    KLLFXLine.splice(0, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[1] == '' || KLLFXLine[1] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 9) {
                    KLLFXLine.splice(1, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[2] == '' || KLLFXLine[2] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 10) {
                    KLLFXLine.splice(2, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[3] == '' || KLLFXLine[3] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 11) {
                    KLLFXLine.splice(3, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[4] == '' || KLLFXLine[4] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 12) {
                    KLLFXLine.splice(4, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[5] == '' || KLLFXLine[5] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(5, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[6] == '' || KLLFXLine[6] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(6, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[7] == '' || KLLFXLine[7] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(7, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[8] == '' || KLLFXLine[8] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(8, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[9] == '' || KLLFXLine[9] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(9, 1, kllList[k].KLCOUNT);
                }
            }
        }
    } else if (kData.getHours() >= 18) {
        for (var i = 0; i < 11; i++) {
            KLLFXLine.push(0);
        }
        if (KLLFXLine[0] == '' || KLLFXLine[0] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 8) {
                    KLLFXLine.splice(0, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[1] == '' || KLLFXLine[1] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 9) {
                    KLLFXLine.splice(1, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[2] == '' || KLLFXLine[2] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 10) {
                    KLLFXLine.splice(2, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[3] == '' || KLLFXLine[3] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 11) {
                    KLLFXLine.splice(3, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[4] == '' || KLLFXLine[4] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 12) {
                    KLLFXLine.splice(4, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[5] == '' || KLLFXLine[5] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(5, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[6] == '' || KLLFXLine[6] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(6, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[7] == '' || KLLFXLine[7] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(7, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[8] == '' || KLLFXLine[8] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(8, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[9] == '' || KLLFXLine[9] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(9, 1, kllList[k].KLCOUNT);
                }
            }
        }
        if (KLLFXLine[10] == '' || KLLFXLine[10] == null) {
            for (var k in kllList) {
                if (kllList[k].HANDEL_HOURE == 13) {
                    KLLFXLine.splice(10, 1, kllList[k].KLCOUNT);
                }
            }
        }
    }

}

var KLLFXChart = echarts.init(document.getElementById('KLLFX'));

KLLFXChart.setOption({
    backgroundColor: '',

    grid: {
        left: '6%',
        right: '4%',
        bottom: '5%',
        top: '8%',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        showContent: true,
        padding: [5, 10, 5, 10],
        backgroundColor: 'rgba(16,17,24,0.6)',
        formatter: function (params) {
            var da;
            if (params[0].name.indexOf('am') > 0) {
                da = '上午' + params[0].name.substr(0, params[0].name.length - 2) + '点';
            } else {
                da = '下午' + params[0].name.substr(0, params[0].name.length - 2) + '点';
            }
            var fl = '<div><p style="color: #E6E6E6;font-size: 10px">' + da + '</p></div>';
            fl += '<div><p style="color: #E6E6E6;font-size: 10px">在线' + params[0].data + '人</p></div>';
            return fl;
        },
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: '#3B4455',
                type: 'solid'
            }
        }
    },
    xAxis: [{
        axisTick: false,
        data: ['12am', '2am', '4am',  '6am', '8am', '10am', '12pm', '2pm', '4pm',  '6pm', '8pm', '10pm'],
        axisLabel: {
            show: true,
            color: '#E6E6E6',
            fontSize: 13
        },
        axisLine: {
            lineStyle: {
                color: '#344bb4',
                width: 1
            }
        }
    }],
    yAxis: [{
        min: 0,
        boundaryGap: [0, 0.36],
        type: 'value',
        splitLine: {show: false},
        axisTick: false,
        axisLabel: {
            formatter: '{value}',
            color: '#E6E6E6',
            fontSize: 13
        },
        axisLine: {
            lineStyle: {
                color: '#344bb4',
                width: 1
            }
        }
    }],
    series: [{
        name: '客流量',
        type: 'line',
        showSymbol: false,
        smooth: false,
        itemStyle: {
            normal: {
                color: '#7ba66f',
                lineStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#cc8538'},
                            {offset: 0.5, color: '#75A63E'},
                            {offset: 1, color: '#1FBF9E'}
                        ]
                    )
                }
            }
        },
        symbolSize: 1,
        data: []
    }]
});

var kllList = [
    {HANDEL_HOURE:8,KLCOUNT:58},
    {HANDEL_HOURE:9,KLCOUNT:140},
    {HANDEL_HOURE:10,KLCOUNT:144},
    {HANDEL_HOURE:11,KLCOUNT:224},
    {HANDEL_HOURE:12,KLCOUNT:34},
    {HANDEL_HOURE:13,KLCOUNT:128},
    {HANDEL_HOURE:14,KLCOUNT:109},
    {HANDEL_HOURE:15,KLCOUNT:398},
    {HANDEL_HOURE:16,KLCOUNT:11}
]
changeKLLFXLine(kllList);
KLLFXChart.setOption({
    series: [{
        name: '客流量',
        data: KLLFXLine
    }]
});

//五大类

var taocan = echarts.init(document.getElementById('taocan'));
taocan.setOption({
    title: [{
        text: '高消费者',
        textStyle: {
            color: '#ffffff',
            fontSize: 14
        },

        x: '11%',
        y: 120
    }, {
        text: '中高消费者',
        textStyle: {
            color: '#ffffff',
            fontSize: 14
        },

        x: '28%',
        y: 120
    }, {
        text: '中等消费者',
        textStyle: {
            color: '#ffffff',
            fontSize: 14
        },

        x: '45%',
        y: 120
    }, {
        text: '中低消费者',
        textStyle: {
            color: '#ffffff',
            fontSize: 14
        },

        x: '62%',
        y: 120
    }, {
        text: '低消费者',
        textStyle: {
            color: '#ffffff',
            fontSize: 14
        },
        x: '79%',
        y: 120
    }],

    series: [
        {
            type: 'pie',
            radius: ['37%', '40%'],
            center: ['16%', '40%'],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
                    position: 'center',
                    formatter: function (parm) {
                        if (parm.name != 'other')
                            return parm.percent.toFixed(2) + "%";
                        else
                            return ''
                    }
                }
            },
            data: [],
            itemStyle: {
                normal: {
                    color: function (params) {
                        //自定义颜色
                        var colorList = [
                            '#3c445b', '#7dfafb'
                        ];
                        return colorList[params.dataIndex]
                    }
                }
            }
        },
        {
            name: '中高消费者',
            type: 'pie',

            radius: ['37%', '40%'],
            center: ['33%', '40%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
                normal: {
                    show: true,
                    position: 'center',
                    formatter: function (parm) {
                        if (parm.name != 'other')
                            return parm.percent.toFixed(2) + "%";
                        else
                            return ''
                    }
                }
            },
            data: [],
            itemStyle: {
                normal: {
                    color: function (params) {
                        //自定义颜色
                        var colorList = [
                            '#3c445b', '#77f46a'
                        ];
                        return colorList[params.dataIndex]
                    }
                }
            }
        }, {
            name: '中等消费者',
            type: 'pie',
            radius: ['37%', '40%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
                normal: {
                    show: true,
                    position: 'center',
                    formatter: function (parm) {
                        if (parm.name != 'other')
                            return parm.percent.toFixed(2) + "%";
                        else
                            return ''
                    }
                }
            },
            data: [],
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
            name: '中低消费者',
            type: 'pie',
            radius: ['37%', '40%'],
            center: ['67%', '40%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
                normal: {
                    show: true,
                    position: 'center',
                    formatter: function (parm) {
                        if (parm.name != 'other')
                            return parm.percent.toFixed(2) + "%";
                        else
                            return ''
                    }
                }
            },
            data: [],
            itemStyle: {
                normal: {
                    color: function (params) {
                        //自定义颜色
                        var colorList = [
                            '#3c445b', '#db7b38'
                        ];
                        return colorList[params.dataIndex]
                    }
                }
            }
        },
        {
            name: '低消费者',
            type: 'pie',
            radius: ['37%', '40%'],
            center: ['84%', '40%'],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
                    position: 'center',
                    formatter: function (parm) {
                        if (parm.name != 'other')
                            return parm.percent.toFixed(2) + "%";
                        else
                            return ''
                    }
                }
            },
            data: [],
            itemStyle: {
                normal: {
                    color: function (params) {
                        //自定义颜色
                        var colorList = [
                            '#3c445b', '#e53731'
                        ];
                        return colorList[params.dataIndex]
                    }
                }
            }
        }
    ]
});

taocan.showLoading();
var fiveTaocan = [];
var fiveLiuLiang = [];
var fiveYY = [];
var fiveJT = [];
var fiveYL = [];
var fiveURL = "/app?service=page/app.bigShow&listener=loadFiveClass&ajax_random=" + Math.floor(Math.random() * 10000 + 10);
/*$.ajax({
    type: "post",
    url: fiveURL,
    data: {},
    dataType: "json",
    success: function (data) {
        var resultCode = data[0].QUERY_SUCCESS;
        if (resultCode == 0) {*/

            var fiveBusinessList = [
                {PACKAGECLASS:"高消费者",RTION:0.213},
                {PACKAGECLASS:"中高消费者",RTION:0.311},
                {PACKAGECLASS:"中等消费者",RTION:0.360},
                {PACKAGECLASS:"中低消费者",RTION:0.097},
                {PACKAGECLASS:"低消费者",RTION:0.019}
                ];

            for (var h in fiveBusinessList) {
                //类别PACKAGECLASS //百分比RTION
                switch (fiveBusinessList[h].PACKAGECLASS) {
                    case '高消费者':
                        fiveTaocan.push({
                            value: 100 - fiveBusinessList[h].RTION * 100,
                            name: 'other'
                        });
                        fiveTaocan.push({
                            value: fiveBusinessList[h].RTION * 100,
                            name: '高消费者'
                        });
                        break;
                    case '中高消费者':
                        fiveLiuLiang.push({
                            value: 100 - fiveBusinessList[h].RTION * 100,
                            name: 'other'
                        });
                        fiveLiuLiang.push({
                            value: fiveBusinessList[h].RTION * 100,
                            name: '中高消费者'
                        });
                        break;
                    case '中等消费者':
                        fiveYY.push({
                            value: 100 - fiveBusinessList[h].RTION * 100,
                            name: 'other'
                        });
                        fiveYY.push({
                            value: fiveBusinessList[h].RTION * 100,
                            name: '中等消费者'
                        });
                        break;
                    case '中低消费者':
                        fiveJT.push({
                            value: 100 - fiveBusinessList[h].RTION * 100,
                            name: 'other'
                        });
                        fiveJT.push({
                            value: fiveBusinessList[h].RTION * 100,
                            name: '中低消费者'
                        });
                        break;
                    case '低消费者':
                        fiveYL.push({
                            value: 100 - fiveBusinessList[h].RTION * 100,
                            name: 'other'
                        });
                        fiveYL.push({
                            value: fiveBusinessList[h].RTION * 100,
                            name: '低消费者'
                        });
                        break;
                }
            }
            taocan.hideLoading();
            taocan.setOption({
                series: [{
                    name: '高消费者',
                    data: fiveTaocan
                }, {
                    name: '中高消费者',
                    data: fiveLiuLiang
                }, {
                    name: '中等消费者',
                    data: fiveYY
                }, {
                    name: '中低消费者',
                    data: fiveJT
                }, {
                    name: '低消费者',
                    data: fiveYL
                }]

           });

/*        } else {

        }

    },
    error: function (data) {

    }
});*/


//年龄段及性别分析
var liquidAgeChart = echarts.init(document.getElementById('ageChart'));

liquidAgeChart.setOption({
    title: [{
        text: '大学一年级',
        textStyle: {
            color: '#ffffff',
            fontSize: 12
        },
        x: "11%",
        y: 86
    }, {
        text: '大学二年级',
        textStyle: {
            color: '#ffffff',
            fontSize: 12
        },
        x: "29%",
        y: 86
    }, {
        text: '大学三年级',
        textStyle: {
            color: '#ffffff',
            fontSize: 12
        },
        x: "47%",
        y: 86
    }, {
        text: '大学四年级',
        textStyle: {
            color: '#ffffff',
            fontSize: 12
        },
        x: "64%",
        y: 86
    }],
    series: [{
        name: '大学一年级',
        type: 'liquidFill',
        data: [],
        radius: '50%',
        outline: {
            show: false
        },
        center: ['20%', '33%'],
        backgroundStyle: {
            borderColor: '#f1f04e',
            borderWidth: 2,
            shadowColor: '#f1f04e',
            shadowBlur: 10
        },
        label: {
            fontSize: 14,
            color: '#b2b13e'
        }
    }, {
        name: '大学二年级',
        type: 'liquidFill',
        data: [],
        radius: '50%',
        outline: {
            show: false
        },
        center: ['38%', '33%'],
        backgroundStyle: {
            borderColor: '#5ab3e6',
            borderWidth: 2,
            shadowColor: '#5ab3e6',
            shadowBlur: 10
        },
        label: {
            fontSize: 14,
            color: '#437ba4'
        }
    }, {
        name: '大学三年级',
        type: 'liquidFill',
        data: [],
        radius: '50%',
        outline: {
            show: false
        },
        center: ['55%', '33%'],
        backgroundStyle: {
            borderColor: '#7cf9fb',
            borderWidth: 2,
            shadowColor: '#7cf9fb',
            shadowBlur: 10
        },
        label: {
            fontSize: 14,
            color: '#61c0c2'
        }
    }, {
        name: '大学四年级',
        type: 'liquidFill',
        data: [],
        radius: '50%',
        outline: {
            show: false
        },
        center: ['72%', '33%'],
        backgroundStyle: {
            borderColor: '#ea813a',
            borderWidth: 2,
            shadowColor: '#ea813a',
            shadowBlur: 10
        },
        label: {
            fontSize: 14,
            color: '#b05834'
        }
    }
    ]
});


var pathSymbols = {
    image0_1: 'image:// /image/0-1.png',
    image1_1: 'image:// /image/1-1.png',
    image2_1: 'image:// /image/2-1.png',
    image3_1: 'image:///image/3-1.png',
    image4_1: 'image:///image/4-1.png',
    image5_1: 'image:///image/5-1.png',
    image6_1: 'image:///image/6-1.png',
    image7_1: 'image:///image/7-1.png',
    image8_1: 'image:///image/8-1.png',
    image9_1: 'image:///image/9-1.png',
    image10_1: 'image:///image/10-1.png',
    image11_1: 'image:///image/11-1.png',
    image12_1: 'image:///image/12-1.png',
    image13_1: 'image:///image/13-1.png',
    image14_1: 'image:///image/14-1.png'
};
var pathSymbols2 = {
    image0_2: 'image:// /image/0-2.png',
    image1_2: 'image:// /image/1-2.png',
    image2_2: 'image:// /image/2-2.png',
    image3_2: 'image:///image/3-2.png',
    image4_2: 'image:///image/4-2.png',
    image5_2: 'image:///image/5-2.png',
    image6_2: 'image:///image/6-2.png',
    image7_2: 'image:///image/7-2.png',
    image8_2: 'image:///image/8-2.png',
    image9_2: 'image:///image/9-2.png',
    image10_2: 'image:///image/10-2.png',
    image11_2: 'image:///image/11-2.png',
    image12_2: 'image:///image/12-2.png',
    image13_2: 'image:///image/13-2.png',
    image14_2: 'image:///image/14-2.png'
};

//各类业务占比
var allBusinessPrChart = echarts.init(document.getElementById('allbusiness'));
var glyphdata0_1 = [{
    value: 23,
    symbol: pathSymbols.image0_1,
    symbolSize: [100, 140]
}, {
    value: 20,
    symbol: pathSymbols.image1_1,
    symbolSize: [100, 140]
}, {
    value: 25,
    symbol: pathSymbols.image2_1,
    symbolSize: [100, 140]
}, {
    value: 18,
    symbol: pathSymbols.image3_1,
    symbolSize: [100, 140]
}, {
    value: 12,
    symbol: pathSymbols.image4_1,
    symbolSize: [100, 140]
}, {
    value: 1,
    symbol: pathSymbols.image5_1,
    symbolSize: [100, 140]
}, {
    value: 14,
    symbol: pathSymbols.image6_1,
    symbolSize: [100, 140]
}, {
    value: 1,
    symbol: pathSymbols.image7_1,
    symbolSize: [100, 140]
}];
var glyphdata1_1 = [];


allBusinessPrChart.setOption({
    grid: {
        top: '20%',
        left: '10%',
        right: '15%',
        bottom: '-10%',
        containLabel: true
    },
    tooltip: {
        show: false,
        trigger: 'axis',
        axisPointer: {
            type: 'none'
        },
        formatter: function (params) {
            return params[0].name + ': ' + params[0].value;
        }
    },
    xAxis: {
        show: false,
        data: ['1', '1', '1', '1', '1', '1', '1', '1'],
        axisTick: {show: false},
        axisLine: {show: false},
        axisLabel: {
            textStyle: {
                color: '#e54035'
            }
        }
    },
    yAxis: {
        max: 40,
        splitLine: {show: false},
        axisTick: {show: false},
        axisLine: {show: false},
        axisLabel: {show: false}
    },
    color: ['#e54035'],
    series: {
        name: 'glyph',
        type: 'pictorialBar',
        symbolPosition: 'end',
        symbolSize: 10,
        symbolOffset: [50, '-150%'],
        data: []
    }
});
setInterval(function () {
    var random_1 = RandomNumBoth(0, 7);
    var random_2 = RandomNumBoth(0, 5);
    var random_2_0 = random_2 + 8;

    var val = glyphdata0_1[random_1].value;
    var img_val = glyphdata0_1[random_1].symbol;


    var value = RandomNumBoth(1, 22);
    var symbol1;
    var symbol2;


    var i = RandomNumBoth(0, 1);
    if (i == 0) {
        /*glyphdata0_1.splice(random_1,1,{value: val, symbol:'image:///image/'+random_1+'-2.png', symbolSize: [120, 160]});*/
        symbol1 = 'image:///image/' + random_1 + '-2.png';
    } else {
        /*glyphdata1_1.splice(random_2,1,{value: val1, symbol:'image:///image/'+random_2_0+'-2.png', symbolSize: [120, 160]});*/
        symbol1 = 'image:///image/' + random_2_0 + '-2.png';
    }

    var f = RandomNumBoth(0, 7);

    var date = new Date();
    if (date.getHours() >= 8 && date.getHours() < 18) {
        for (var j = 0; j < 8; j++) {

            if (f == j) {
                glyphdata1_1.push({
                    value: value,
                    symbol: symbol1,
                    symbolSize: [120, 160]
                })
            } else {
                glyphdata1_1.push({})
            }

        }

        allBusinessPrChart.setOption({
            series: [{
                name: 'glyph',
                data: glyphdata1_1
            }]
        });

        glyphdata1_1 = [];
        setTimeout(function () {
            allBusinessPrChart.setOption({
                series: {
                    name: 'glyph',
                    data: []
                }
            });
        }, 4000);
    }

}, 10 * 1000);



