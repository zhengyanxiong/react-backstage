import Login from '@/view/login/index'
import Index from '@/view/home/index'
import HomeComponent from '@/components/menu/HomeComponent'
import DataAnalysisComponent from '@/components/menu/DataAnalysisComponent'
import AdminManagement from '@/components/menu/AdminManagement/index.js'
import UserManagement from '@/components/menu/UserManagement/index.js'
import CheckUserManagement from '@/components/menu/CheckManagement/index.js'
import GoodsManagement from '@/components/menu/GoodsManagement/index.js'
import ActiveManagement from '@/components/menu/ActiveManagement/index.js'

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
            {path: '/index/goodsManagement', name:'闲置管理', component: GoodsManagement},
            {path: '/index/activeManagement', name:'闲置管理', component: ActiveManagement}
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
