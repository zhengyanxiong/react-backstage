/* eslint-disable no-undef */
function RandomNumBoth(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}

//汉字解码
function uncode(str) {
    return str.replace(/&#(x)?([^&]{1,5});?/g, function (a, b, c) {
        return String.fromCharCode(parseInt(c, b ? 16 : 10));
    });
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


//数字变化
var sum0;
var sum1;
var sum2;
var sum3;
var sum4;

$(function () {
    var url = "/app?service=page/app.bigShow&listener=initPage&ajax_random=" + Math.floor(Math.random() * 10000 + 1);

    /* $.ajax({
         type: "post",
         url: url,
         data: {flag: 'first_inint'},
         dataType: "json",
         success: function (data) {
             if(data[0].ResultCode == 'noLogin' || data[0].ResultCode == 'noFind'){
                 alert(uncode(data[0].ResultInfo));
                 window.location.href = '/mapp/login/login.html?redirect_page=%2fapp%3fservice%3dpage%2fapp.publiccontainer%26listener%3dinitPage%26redirect_page%3dmapp%2fbigScreenShow%2fbusinessAnalyze.html';
             } else {
                 var resultCode = data[0].QUERY_SUCCESS;
                 if (resultCode == 0) {

                     var hallName = uncode(data[0].HALL_NAME);
                     hallName = '重庆移动' + hallName + '智慧运营平台';
                     $('#hall_name').html(hallName);
                     $('#one_02').attr('href', '/app?service=page/app.sharecontainer&listener=initPage&redirect_page=mapp/bigScreenShow/businessManagement.html');
                     $('#one_03').attr('href', '/app?service=page/app.sharecontainer&listener=initPage&redirect_page=mapp/bigScreenShow/gridAnalyze.html');

                     //查询成功后页面定时
                     setInterval(function () {
                         window.location.href = '/app?service=page/app.sharecontainer&listener=initPage&redirect_page=mapp/bigScreenShow/businessManagement.html';
                     }, 2 * 60 * 1000);
 */
    var phoneBusinessList = [
        {PHONE_NAME: '小米', PERCENTAGE: 23},
        {PHONE_NAME: '华为', PERCENTAGE: 13},
        {PHONE_NAME: 'OPPO', PERCENTAGE: 33},
        {PHONE_NAME: 'Vivo', PERCENTAGE: 26},
        {PHONE_NAME: '苹果', PERCENTAGE: 33}
    ];
    for (var h in phoneBusinessList) {
        lagend.push(phoneBusinessList[h].PHONE_NAME);
        phoneData.push({
            value: phoneBusinessList[h].PERCENTAGE,
            name: uncode(phoneBusinessList[h].PHONE_NAME)
        });
    }
    businessHandleRatioChart.hideLoading();
    businessHandleRatioChart.setOption({
        legend: {
            data: lagend
        },
        series: [{
            name: '资源占比',

            data: phoneData

        }]

    });


    var importantBusinessList = [
        {ANALYSISNUMBER: RandomNumBoth(10, 23)},
        {ANALYSISNUMBER: RandomNumBoth(7, 33)},
        {ANALYSISNUMBER: RandomNumBoth(14, 21)},
        {ANALYSISNUMBER: RandomNumBoth(10, 43)},
        {ANALYSISNUMBER: RandomNumBoth(1, 23)}
    ];

    sum0 = importantBusinessList[0].ANALYSISNUMBER;
    sum1 = importantBusinessList[1].ANALYSISNUMBER;
    sum2 = importantBusinessList[2].ANALYSISNUMBER;
    sum3 = importantBusinessList[3].ANALYSISNUMBER;
    sum4 = importantBusinessList[4].ANALYSISNUMBER;

    setTimeout(function () {
        show_num1(0, sum0);
        show_num1(1, sum1);
        show_num1(2, sum2);
        show_num1(3, sum3);
        show_num1(4, sum4);
    }, 1000);

    setInterval(function () {
        show_num1(0, sum0);
        show_num1(1, sum1);
        show_num1(2, sum2);
        show_num1(3, sum3);
        show_num1(4, sum4);
        getImportBusinessInfo();
    }, 15 * 1000);

    var data_list = {
        "IMPORTANT_BUSINESS_LIST": [
            {"PACKAGECLASS": "闲置热卖", "ANALYSISNUMBER": 203},
            {"PACKAGECLASS": "电影票", "ANALYSISNUMBER": 23},
            {"PACKAGECLASS": "演唱会门票", "ANALYSISNUMBER": 23},
            {"PACKAGECLASS": "手工艺品", "ANALYSISNUMBER": 23},
            {"PACKAGECLASS": "文学小说", "ANALYSISNUMBER": 23}
        ]
    }


    $(".load_importantBusiness").html(template("importantBusiness", {infos: data_list}));

    var showHandleBusinessList = [
        {GOODS_NAME: '人间失格 x1', RETURNTIME: '12:32', PHNOENUM: 'swallow'},
        {GOODS_NAME: '冬装棉服 x1', RETURNTIME: '13:00', PHNOENUM: 'bear'},
        {GOODS_NAME: '被丢失的一角 x1', RETURNTIME: '13:12', PHNOENUM: 'swallow'},
        {GOODS_NAME: '暖宝宝 x1', RETURNTIME: '13:48', PHNOENUM: '刘婷婷'},
        {GOODS_NAME: '架构的艺术 x1', RETURNTIME: '13:49', PHNOENUM: '郑彦雄'},
        {GOODS_NAME: '机械革命笔记本 x1', RETURNTIME: '14:02', PHNOENUM: '余海强'},
        {GOODS_NAME: '雷神笔记本 x1', RETURNTIME: '14:11', PHNOENUM: '郑彦雄'},
        {GOODS_NAME: '复联4电影票 x2', RETURNTIME: '14:30', PHNOENUM: '会说话的小橘子'},
        {GOODS_NAME: '赵雷演唱会门票 x1', RETURNTIME: '15:08', PHNOENUM: '西班牙没有牙'},
    ];

    if (showHandleBusinessList.length > 0) {
        $(".load_handleBusiness").html(template("handleBusiness", {infos: showHandleBusinessList}));


        for (var s = 4; s < 8; s++) {
            if ((showHandleBusinessList[s].GOODS_NAME).length <= 130) {
                $(".load_handleBusiness li").eq(s - 4).find('.div-second').html('<span id="time">' + showHandleBusinessList[s].RETURNTIME + '</span>\n' +
                    '                                        <span id="tel">' + showHandleBusinessList[s].PHNOENUM + '</span>\n' +
                    '                                        <span id="item">' + showHandleBusinessList[s].GOODS_NAME + '</span>');
            } else {
                $(".load_handleBusiness li").eq(s - 4).find('.div-second').html('<span id="time">' + showHandleBusinessList[s].RETURNTIME + '</span>\n' +
                    '                                        <span id="tel">' + showHandleBusinessList[s].PHNOENUM + '</span>\n' +
                    '                                        <span id="item" style="font-size: 8px">' + showHandleBusinessList[s].GOODS_NAME + '</span>');
            }

        }

        var changeTime1 = RandomNumBoth(5000, 8500);
        var changeTime2 = 2 * changeTime1;
        var changeTime3 = 3 * changeTime1;
        var changeTime4 = 4 * changeTime1;

        setTimeout(function () {
            autoPlay('first', 0)
        }, changeTime1);
        setTimeout(function () {
            autoPlay('first', 1)
        }, changeTime2);
        setTimeout(function () {
            autoPlay('first', 2)
        }, changeTime3);
        setTimeout(function () {
            autoPlay('first', 3)
        }, changeTime4);

        //定时请求后台
        setInterval(function () {
            refreshHandleBusiness();
        }, changeTime4 + 2000);


    }

    //var hotSaleBusinessList = data[0].hoteSaleBusiness;
    //if(hotSaleBusinessList == null || hotSaleBusinessList == '' || hotSaleBusinessList == 'undefind'){
    $('#hotBusinessHandleRatio1').jqbar({
        label: '文学小说类--计算机英语',
        value: 45011,
        barColor: '#3a89c9'
    });
    $('#hotBusinessHandleRatio2').jqbar({
        label: '科技科普类--万物论',
        value: 32156,
        barColor: '#9072c9'
    });
    $('#hotBusinessHandleRatio3').jqbar({
        label: '二手杂包类',
        value: 25921,
        barColor: 'rgb(57, 145, 105)'
    });
    $('#hotBusinessHandleRatio4').jqbar({
        label: '乐器类--吉他',
        value: 20015,
        barColor: '#c9b75d'
    });
    $('#hotBusinessHandleRatio5').jqbar({
        label: '个人洗护类--洗衣液',
        value: '12568',
        barColor: '#c97746'
    });
    /*} else {
        $('#hotBusinessHandleRatio1').jqbar({
            label: uncode(hotSaleBusinessList[4].BUSINESS_NAME),
            value: hotSaleBusinessList[4].NUM,
            barColor: '#3a89c9'
        });
        $('#hotBusinessHandleRatio2').jqbar({
            label: uncode(hotSaleBusinessList[3].BUSINESS_NAME),
            value: hotSaleBusinessList[3].NUM,
            barColor: '#9072c9'
        });
        $('#hotBusinessHandleRatio3').jqbar({
            label: uncode(hotSaleBusinessList[2].BUSINESS_NAME),
            value: hotSaleBusinessList[2].NUM,
            barColor: 'rgb(57, 145, 105)'
        });
        $('#hotBusinessHandleRatio4').jqbar({
            label: uncode(hotSaleBusinessList[1].BUSINESS_NAME),
            value: hotSaleBusinessList[1].NUM,
            barColor: '#c9b75d'
        });
        $('#hotBusinessHandleRatio5').jqbar({
            label: uncode(hotSaleBusinessList[0].BUSINESS_NAME),
            value: hotSaleBusinessList[0].NUM,
            barColor: '#c97746'
        });
    }*/


    /*      }
     }


 /*},
 error: ction (data) {

 }
});*/
});

function autoPlay(flag, i) {

    /*var child = $(".load_handleBusiness li").eq(12).clone(true);
    $(".load_handleBusiness li").eq(12).remove();
    $(child).hide();
    child.fadeIn(3000);
    $(".load_handleBusiness").prepend(child);
    $(".load_handleBusiness li").eq('0').show();*/
    if (flag == 'first') {
        $(".load_handleBusiness li").eq(i).find('.cardscon').addClass('showback');
    } else {
        $(".load_handleBusiness li").eq(i).find('.cardscon').removeClass('showback');
    }
}

//获得实时数据
function getImportBusinessInfo() {
    var imurl = "/app?service=page/app.bigShow&listener=getImportBusinessInfo&ajax_random=" + Math.floor(Math.random() * 10000 + 1);
    /*$.ajax({
        type: "post",
        url: imurl,
        data: {flag: 'scond'},
        dataType: "json",
        success: function (data) {
            var resultCode = data[0].QUERY_SUCCESS;

            if (resultCode == 0) {*/

    var data_list = {
        "IMPORTANT_BUSINESS_LIST": [
            {"PACKAGECLASS": "闲置热卖", "ANALYSISNUMBER": RandomNumBoth(20, 23)},
            {"PACKAGECLASS": "电影票", "ANALYSISNUMBER": RandomNumBoth(12, 23)},
            {"PACKAGECLASS": "演唱会门票", "ANALYSISNUMBER": RandomNumBoth(21, 23)},
            {"PACKAGECLASS": "手工艺品", "ANALYSISNUMBER": RandomNumBoth(5, 23)},
            {"PACKAGECLASS": "文学小说", "ANALYSISNUMBER": RandomNumBoth(10, 43)}
        ]
    }
    var importantBusinessList = data_list.IMPORTANT_BUSINESS_LIST;

    sum0 = parseInt(importantBusinessList[0].ANALYSISNUMBER);
    sum1 = parseInt(importantBusinessList[1].ANALYSISNUMBER);
    sum2 = parseInt(importantBusinessList[2].ANALYSISNUMBER);
    sum3 = parseInt(importantBusinessList[3].ANALYSISNUMBER);
    sum4 = parseInt(importantBusinessList[4].ANALYSISNUMBER);

    setTimeout(function () {
        show_num1(0, RandomNumBoth(20, 23));
        show_num1(1, RandomNumBoth(12, 23));
        show_num1(2, RandomNumBoth(21, 23));
        show_num1(3, RandomNumBoth(5, 23));
        show_num1(4, RandomNumBoth(10, 43));
    }, 500);

    $(".load_importantBusiness").html(template("importantBusiness", {infos: data_list}));
    /*}

},
error: function (data) {

}
});*/
}

//定时刷新页面1情况数据
function refreshHandleBusiness(obj) {

}



//自动滚动
function autoScroll(obj) {
    $(obj).find("ul").animate({
        marginTop: "-49px"
    }, 1500, function () {
        $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
    })
}


/*$(function() {
    for(var i=0;i<5;i++){
        var index_num = $('#lis'+i).html();
        alert(index_num)
        setTimeout(function () {

        },4000)

    }
});*/


function show_num1(index, n) {
    if (index == 0) {
        sum0 += RandomNumBoth(0, 3);
        var it = $(".t_num0 i");
        var len = String(n).length;
        for (var i = 0; i < len; i++) {
            if (it.length <= i) {
                $(".t_num0").append("<i></i>");
            }
            var num = String(n).charAt(i);
            //根据数字图片的高度设置相应的值
            var y = -parseInt(num) * 40;
            var obj = $(".t_num0 i").eq(i);
            obj.animate({
                backgroundPosition: '(0 ' + String(y) + 'px)'
            }, 'slow', 'swing', function () {
            });
        }
        $("#cur_num").val(n);
    } else if (index == 1) {
        sum1 += RandomNumBoth(0, 3);
        var it = $(".t_num1 i");
        var len = String(n).length;
        for (var i = 0; i < len; i++) {
            if (it.length <= i) {
                $(".t_num1").append("<i></i>");
            }
            var num = String(n).charAt(i);
            //根据数字图片的高度设置相应的值
            var y = -parseInt(num) * 40;
            var obj = $(".t_num1 i").eq(i);
            obj.animate({
                backgroundPosition: '(0 ' + String(y) + 'px)'
            }, 'slow', 'swing', function () {
            });
        }
        $("#cur_num").val(n);
    } else if (index == 2) {
        sum2 += RandomNumBoth(0, 3);
        var it = $(".t_num2 i");
        var len = String(n).length;
        for (var i = 0; i < len; i++) {
            if (it.length <= i) {
                $(".t_num2").append("<i></i>");
            }
            var num = String(n).charAt(i);
            //根据数字图片的高度设置相应的值
            var y = -parseInt(num) * 40;
            var obj = $(".t_num2 i").eq(i);
            obj.animate({
                backgroundPosition: '(0 ' + String(y) + 'px)'
            }, 'slow', 'swing', function () {
            });
        }
        $("#cur_num").val(n);
    } else if (index == 3) {
        sum3 += RandomNumBoth(0, 3);
        var it = $(".t_num3 i");
        var len = String(n).length;
        for (var i = 0; i < len; i++) {
            if (it.length <= i) {
                $(".t_num3").append("<i></i>");
            }
            var num = String(n).charAt(i);
            //根据数字图片的高度设置相应的值
            var y = -parseInt(num) * 40;
            var obj = $(".t_num3 i").eq(i);
            obj.animate({
                backgroundPosition: '(0 ' + String(y) + 'px)'
            }, 'slow', 'swing', function () {
            });
        }
        $("#cur_num").val(n);
    } else if (index == 4) {
        sum4 += RandomNumBoth(0, 3);
        var it = $(".t_num4 i");
        var len = String(n).length;
        for (var i = 0; i < len; i++) {
            if (it.length <= i) {
                $(".t_num4").append("<i></i>");
            }
            var num = String(n).charAt(i);
            //根据数字图片的高度设置相应的值
            var y = -parseInt(num) * 40;
            var obj = $(".t_num4 i").eq(i);
            obj.animate({
                backgroundPosition: '(0 ' + String(y) + 'px)'
            }, 'slow', 'swing', function () {
            });
        }
        $("#cur_num").val(n);
    }

}


//效率分析
var firstLine = [];
var sencondLine = [];

var y_port1 = RandomNumBoth(36, 70);
var y_port2 = RandomNumBoth(60, 90);
var y_port4 = RandomNumBoth(39, 80);
var y_port5 = RandomNumBoth(16, 40);
var y_port3 = 300 - y_port1 - y_port2 - y_port4 - y_port5;
var y_port = new Array();
y_port[0] = y_port1;
y_port[1] = y_port2;
y_port[2] = y_port3;
y_port[3] = y_port4;
y_port[4] = y_port5;

var y1_port1 = RandomNumBoth(36, 70);
var y1_port2 = RandomNumBoth(60, 87);
var y1_port4 = RandomNumBoth(39, 67);
var y1_port5 = RandomNumBoth(16, 40);
var y1_port3 = 300 - y1_port1 - y1_port2 - y1_port4 - y1_port5;
var y1_port = new Array();
y1_port[0] = y1_port1;
y1_port[1] = y1_port2;
y1_port[2] = y1_port3;
y1_port[3] = y1_port4;
y1_port[4] = y1_port5;


for (var i = 0; i < y_port.length; i++) {
    firstLine.push(y_port[i]);
    sencondLine.push(y1_port[i]);
}


function changeData(shift) {

    /*   firstLine.push(Math.floor((Math.random()-0.5)*10+firstLine[firstLine.length-1]));*/
    sencondLine.push(RandomNumBoth(0, 200));

    if (shift) {
        /*for (var i=0;i<firstLine.length;i++){
            var flag = firstLine[i]+Math.floor((Math.random()-0.5)*10+firstLine[firstLine.length-1]);*/
        y_port1 = RandomNumBoth(80, 70);
        y_port2 = RandomNumBoth(30, 79);
        y_port4 = RandomNumBoth(60, 90);
        y_port5 = RandomNumBoth(10, 40);
        y_port3 = 300 - y_port1 - y_port2 - y_port4 - y_port5;
        firstLine.splice(0, 1, y_port1);
        firstLine.splice(1, 1, y_port2);
        firstLine.splice(2, 1, y_port3);
        firstLine.splice(3, 1, y_port4);
        firstLine.splice(4, 1, y_port5);

        y1_port1 = RandomNumBoth(36, 70);
        y1_port2 = RandomNumBoth(60, 87);
        y1_port4 = RandomNumBoth(39, 67);
        y1_port5 = RandomNumBoth(16, 40);
        y1_port3 = 300 - y1_port1 - y1_port2 - y1_port4 - y1_port5;
        sencondLine.splice(0, 1, y1_port1);
        sencondLine.splice(1, 1, y1_port2);
        sencondLine.splice(2, 1, y1_port3);
        sencondLine.splice(3, 1, y1_port4);
        sencondLine.splice(4, 1, y1_port5);

    }
}


var businessAnalyzeChart = echarts.init(document.getElementById('businessAnalyze'));

businessAnalyzeChart.setOption({
    backgroundColor: '',
    grid: {
        x: 60,
        y: 25,
        x2: 25,
        y2: 38
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'none'
        }
    },
    legend: {
        show: false,
        orient: 'horizontal',

        data: ['下单人数', '销售总数'],
        x: 510,
        top: 0,
        textStyle: {
            color: '#E6E6E6'
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: true,
        data: ['10分钟以内', '15分钟以内', '20分钟以内', '30分钟以内', '30分钟以上'],
        scale: true,
        splitLine: {
            show: true,
            lineStyle: {
                color: '#3B4455',
                type: 'solid'
            }
        },
        axisTick: {
            alignWithLabel: true,
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#3B4455',
                width: 1
            }
        },
        axisLabel: {
            color: '#E6E6E6',
            fontSize: 13
        }
    },
    yAxis: {
        min: 0,
        max: 200,
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
                color: '#3B4455',
                type: 'solid'
            }
        },
        show: true,
        axisLabel: {
            formatter: '{value} ',
            color: '#E6E6E6',
            fontSize: 14
        },
        axisTick: {
            alignWithLabel: true,
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#3B4455',
                width: 1
            }

        }
    },
    series: [
        {
            name: '下单人数',
            type: 'line',
            data: firstLine,
            markLine: {
                smooth: true,
                effect: {
                    show: true,
                    scaleSize: 1,
                    period: 30,
                    color: '#fff',
                    shadowBlur: 10
                },
                itemStyle: {
                    normal: {
                        label: {show: false},
                        borderWidth: 1,
                        lineStyle: {
                            type: 'solid',
                            shadowBlur: 10
                        }
                    }
                },
                data: []
            },
            symbol: 'none',
            symbolSize: 10,
            itemStyle: {
                normal: {
                    color: '#01adfd',
                    lineStyle: {
                        color: '#01adfd',
                        width: 1
                    }
                }
            }
        },
        {
            name: '销售总数',
            type: 'line',
            symbol: 'circle',
            color: '#00ffff',
            symbolSize: 10,
            data: sencondLine,
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: '#00ffff',
                        width: 1
                    }
                }
            }
        }
    ]
});
setInterval(function () {
    changeData(true);
    //alert(firstLine[0])
    businessAnalyzeChart.setOption({
        series: [{
            name: '下单人数',
            data: firstLine,
            markLine: {
                data: [
                    //{y:firstLine[0]}
                ]
            }
        }, {
            name: '销售总数',
            data: sencondLine
        }
        ]
    });
}, 10000);

/******************************************************************************************/


var businessHandleRatioChart = echarts.init(document.getElementById('businessHandleRatio'), 'dark');
businessHandleRatioChart.setOption({
    backgroundColor: '',
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: '76%',
        y: '10%',
        itemHeight: 10,
        itemWidth: 20,
        itemGap: 4,
        textStyle: {
            fontSize: 11
        },
        data: []
    },
    calculable: true,
    series: [
        {
            name: '业务占比',
            type: 'pie',
            radius: [10, 50],
            center: [220, 80],
            roseType: 'area',
            label: {
                normal: {
                    show: true,
                    formatter: '{d}%',
                    textStyle: {
                        align: 'center',
                        baseline: 'middle',
                        fontSize: 14
                    }
                }
            },
            data: []
        }
    ]
});
//自动滚动
function autoScroll(obj){
    $(obj).find("ul").animate({
        marginTop : "-48px"
    },1000,function(){
        $(this).css({marginTop : "0px"}).find("li:first").appendTo(this);
    })
}
setInterval('autoScroll(".tablelist")',3000);

var lagend = [];
var phoneData = [];
businessHandleRatioChart.showLoading();

setInterval(function () {
    refreshEcharsData();
},4000)
//定时刷新业务办理统计、手机终端业务办理情况、热卖业务
function refreshEcharsData() {
    var phoneBusinessList = [
        {PHONE_NAME: '小米', PERCENTAGE: RandomNumBoth(10,42)},
        {PHONE_NAME: '华为', PERCENTAGE: RandomNumBoth(10,42)},
        {PHONE_NAME: 'OPPO', PERCENTAGE: RandomNumBoth(10,42)},
        {PHONE_NAME: 'Vivo', PERCENTAGE: RandomNumBoth(10,42)},
        {PHONE_NAME: '苹果', PERCENTAGE: RandomNumBoth(10,42)}
    ];
    lagend =[];
    phoneData = [];
    for (var h in phoneBusinessList) {
        lagend.push(phoneBusinessList[h].PHONE_NAME);
        phoneData.push({
            value: phoneBusinessList[h].PERCENTAGE,
            name: uncode(phoneBusinessList[h].PHONE_NAME)
        });
    }
    businessHandleRatioChart.hideLoading();
    businessHandleRatioChart.setOption({
        legend: {
            data: lagend
        },
        series: [{
            name: '业务占比',

            data: phoneData

        }]

    });
}

/*****************************************************************/

//热卖业务

/*
var hotBusinessHandleRatioChart = echarts.init(document.getElementById('hotBusinessHandleRatio'), 'dark');

hotBusinessHandleRatioChart.setOption({
    backgroundColor: '',

    grid: {
        top: -6,
        left: '0%',
        right: '15%',
        bottom: 10,
        containLabel: true
    },
    xAxis: {
        name: '数量',
        type: 'value',
        min: 0,
        max: 100,
        interval: 40,
        show: false
    },
    yAxis: {
        type: 'category',
        data: [],
        axisTick: {
            alignWithLabel: false,
            show: false
        },
        axisLine: {
            lineStyle: {
                show: false,
                width: 0
            }
        }
    },
    series: [
        {
            name: '比例',
            type: 'bar',
            barWidth: 14,
            label: {
                show: true,
                color: '#FFFFFF',
                padding: [0, 10, 0, 300],
                formatter: '{c} '
            },
            itemStyle: {
                emphasis: {
                    barBorderRadius: 7
                },
                normal: {
                    barBorderRadius: 7,
                    color: function (params) {
                        // build a color map as your need.
                        var colorList = [
                            '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ];
                        return colorList[params.dataIndex]
                    }
                }
            },
            data: []
        }
    ]
});
hotBusinessHandleRatioChart.showLoading();
//热卖业务x,y轴
var hot_Y = [];
var hot_X = [];
var hot_lable = [];


hotBusinessHandleRatioChart.setOption(hotBusinessHandleRatioChartOption, true);*/
