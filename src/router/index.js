import Login from '@/view/login/index'
import Index from '@/view/home/index'
import HomeComponent from '@/components/menu/HomeComponent'
import DataAnalysisComponent from '@/components/menu/DataAnalysisComponent'
import AdminManagement from '@/components/menu/AdminManagement/index.js'
import UserManagement from '@/components/menu/UserManagement/index.js'
import CheckUserManagement from '@/components/menu/CheckManagement/index.js'
import GoodsManagement from '@/components/menu/GoodsManagement/index.js'
import GoodsClassManagement from '@/components/menu/GoodsClassManagement/index.js'
import ActiveManagement from '@/components/menu/ActiveManagement/index.js'
import ActiveEnterManagement from '@/components/menu/ActiveEnterManagement/index.js'
import OrderManagement from '@/components/menu/OrderManagement/index.js'
import AboutManagement from '@/components/menu/AboutManagement/index.js'
import ComplaintManagement from '@/components/menu/ComplaintManagement/index.js'
import PayManagement from '@/components/menu/PayManagement/index.js'
import NotFoundManagement from '@/components/menu/NotFoundManagement/index.js'
import EorrorManagement from '@/components/menu/EorrorManagement/index.js'

//路由表
export const main = [
    {path: '/', exact: true, name: '首页', Redirect: '/index'},
    {
        path: '/index', name: '首页', component: Index,
        routes: [
            {path: '/index/homePage', name: '首页内容', component: HomeComponent},
            {path: '/index/dataAnalysis', name: '数据分析', component: DataAnalysisComponent},
            {path: '/index/adminManagement', name:'管理员管理', component: AdminManagement},
            {path: '/index/userManagement', name:'用户管理', component: UserManagement},
            {path: '/index/checkUserManagement', name:'审核注册管理', component: CheckUserManagement},
            {path: '/index/goodsManagement', name:'闲置信息', component: GoodsManagement},
            {path: '/index/goodsClassManagement', name:'闲置分类', component: GoodsClassManagement},
            {path: '/index/activeManagement', name:'活动管理', component: ActiveManagement},
            {path: '/index/activeEnterManagement', name:'活动报名', component: ActiveEnterManagement},
            {path: '/index/orderManagement', name:'订单管理', component: OrderManagement},
            {path: '/index/payManagement', name:'支付管理', component: PayManagement},
            {path: '/index/complaintManagement', name:'举报投诉', component: ComplaintManagement},
            {path: '/index/aboutManagement', name:'关于', component: AboutManagement},
            {path: '/index/notFoundManagement', name:'404', component: NotFoundManagement},
            {path: '/index/eorrorManagement', name:'出错啦', component: EorrorManagement},
        ]
    },
    {path: '/login', name: '登录', component: Login}

]

//菜单相关路由
export const menus = [    // 菜单相关路由
]

export const routerConfig = {
    main, menus
}
