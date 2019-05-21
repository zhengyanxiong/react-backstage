/* eslint-disable no-undef */
var map = new BMap.Map("hotMap");          // 创建地图实例
var point = new BMap.Point(106.577572,29.49464);
map.centerAndZoom(point, 17);             // 初始化地图，设置中心点坐标和地图级别
map.enableScrollWheelZoom(); // 允许滚轮缩放
var points =[
    {"lng":106.577503,"lat":29.492281,"count":49},
    {"lng":106.575437,"lat":29.493413,"count":49},
    {"lng":106.575464,"lat":29.493649,"count":15},
    {"lng":106.575576,"lat":29.493963,"count":40},
    {"lng":106.575365,"lat":29.493429,"count":100},
    {"lng":106.575437,"lat":29.493476,"count":6},
    {"lng":106.575563,"lat":29.493366,"count":18},

    {"lng":106.577611,"lat":29.49203,"count":80},
    {"lng":106.577736,"lat":29.492486,"count":11},
    {"lng":106.577377,"lat":29.492234,"count":7},
    {"lng":106.577413,"lat":29.492423,"count":57},
    {"lng":106.577323,"lat":29.492423,"count":4},
    {"lng":106.577287,"lat":29.492155,"count":27},
    {"lng":106.576515,"lat":29.49335,"count":23},
    {"lng":106.577826,"lat":29.492266,"count":60},
    {"lng":106.57691,"lat":29.491165,"count":8},

    {"lng":106.575832,"lat":29.492344,"count":15},
    {"lng":106.575209,"lat":29.492328,"count":25},
    {"lng":106.576587,"lat":29.491495,"count":21},
    {"lng":106.576335,"lat":29.491338,"count":1},
    {"lng":106.57673,"lat":29.492234,"count":49},
    {"lng":106.577857,"lat":29.49237,"count":7},
    {"lng":106.575832,"lat":29.492314,"count":11},
    {"lng":106.57513,"lat":29.492311,"count":35},
    {"lng":106.578733,"lat":29.491037,"count":22},

    {"lng":106.57673,"lat":29.494576,"count":4},
    {"lng":106.576658,"lat":29.49434,"count":5},
    {"lng":106.576784,"lat":29.494985,"count":3},
    {"lng":106.576928,"lat":29.494419,"count":95},
    {"lng":106.576623,"lat":29.494246,"count":87},
    {"lng":106.57691,"lat":29.495252,"count":87},


    {"lng":106.578725,"lat":29.494049,"count":32},
    {"lng":106.575801,"lat":29.494854,"count":44},
    {"lng":106.575129,"lat":29.498227,"count":21},
    {"lng":106.577576,"lat":29.492286,"count":80},
    {"lng":106.579597,"lat":29.49548,"count":32},
    {"lng":106.579895,"lat":29.495777,"count":26},
    {"lng":106.579573,"lat":29.495197,"count":17},
    {"lng":106.577982,"lat":29.498547,"count":17},
    {"lng":106.576126,"lat":29.495498,"count":25},
    {"lng":106.57726,"lat":29.495282,"count":100},
    {"lng":106.574929,"lat":29.492759,"count":29},
    {"lng":106.577185,"lat":29.492923,"count":11},
    {"lng":106.575237,"lat":29.497498,"count":9},
    {"lng":106.575784,"lat":29.495754,"count":47},
    {"lng":106.575149,"lat":29.497061,"count":52},
    {"lng":106.577735,"lat":29.495719,"count":100},
    {"lng":106.577495,"lat":29.495958,"count":46},
    {"lng":106.576249,"lat":29.491066,"count":9},
    {"lng":106.579496,"lat":29.494055,"count":8},
    {"lng":106.57789,"lat":29.491308,"count":11},
    {"lng":106.575765,"lat":29.494976,"count":3},
    {"lng":106.578232,"lat":29.493348,"count":49},
    {"lng":106.575554,"lat":29.492491,"count":15},
    {"lng":106.578578,"lat":29.492161,"count":23},
    {"lng":106.578461,"lat":29.492306,"count":3},
    {"lng":106.57832,"lat":29.49551,"count":13},
    {"lng":106.5774,"lat":29.498616,"count":6},
    {"lng":106.578679,"lat":29.495499,"count":21},
    {"lng":106.57771,"lat":29.495738,"count":29},
    {"lng":106.577836,"lat":29.496998,"count":99},
    {"lng":106.577755,"lat":29.498001,"count":10},
    {"lng":106.579077,"lat":29.490655,"count":14},
    {"lng":106.579049,"lat":29.492995,"count":16},
    {"lng":106.57935,"lat":29.491054,"count":15},
    {"lng":106.579022,"lat":29.491895,"count":13},
    {"lng":106.577549,"lat":29.449373,"count":17},
    {"lng":106.578149,"lat":29.496572,"count":1},
    {"lng":106.579612,"lat":29.497119,"count":9},
    {"lng":106.578237,"lat":29.492337,"count":54},
    {"lng":106.577776,"lat":29.494499,"count":26},
    {"lng":106.577694,"lat":29.49536,"count":17},
    {"lng":106.577377,"lat":29.495737,"count":19},
    {"lng":106.577434,"lat":29.495794,"count":43},
    {"lng":106.57788,"lat":29.492622,"count":27},
    {"lng":106.577345,"lat":29.493467,"count":8},
    {"lng":106.576883,"lat":29.492171,"count":3},
    {"lng":106.577877,"lat":29.492659,"count":34},
    {"lng":106.577712,"lat":29.492713,"count":14},
    {"lng":106.578869,"lat":29.492576,"count":12},
    {"lng":106.579957,"lat":29.492377,"count":11},
    {"lng":106.57966,"lat":29.494317,"count":38},
    {"lng":106.579244,"lat":29.490215,"count":49},
    {"lng":106.575699,"lat":29.492308,"count":54},
    {"lng":106.575106,"lat":29.492358,"count":21},
    {"lng":106.5773,"lat":29.492315,"count":15},
    {"lng":106.579969,"lat":29.449327,"count":3},
    {"lng":106.578496,"lat":29.492354,"count":24},
    {"lng":106.57905,"lat":29.492317,"count":12},
    {"lng":106.579579,"lat":29.492387,"count":57},
    {"lng":106.57776,"lat":29.492349,"count":70},
    {"lng":106.577867,"lat":29.492389,"count":8}];

if(!isSupportCanvas()){
    alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
}
//详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
//参数说明如下:
/* visible 热力图是否显示,默认为true
 * opacity 热力的透明度,1-100
 * radius 势力图的每个点的半径大小
 * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
 *	{
        .2:'rgb(0, 255, 255)',
        .5:'rgb(0, 110, 255)',
        .8:'rgb(100, 0, 255)'
    }
    其中 key 表示插值的位置, 0~1.
        value 为颜色值.
 */
heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":38});
map.addOverlay(heatmapOverlay);
heatmapOverlay.setDataSet({data:points,max:100});
//是否显示热力图

    heatmapOverlay.show();

function closeHeatmap(){
    heatmapOverlay.hide();
}

function setGradient(){
    /*格式如下所示:
   {
         0:'rgb(102, 255, 0)',
         .5:'rgb(255, 170, 0)',
         1:'rgb(255, 0, 0)'
   }*/
    var gradient = {};
    var colors = document.querySelectorAll("input[type='color']");
    colors = [].slice.call(colors,0);
    colors.forEach(function(ele){
        gradient[ele.getAttribute("data-key")] = ele.value;
    });
    heatmapOverlay.setOptions({"gradient":gradient});
}
//判断浏览区是否支持canvas
function isSupportCanvas(){
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}