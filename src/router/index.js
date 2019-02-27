import Login from '@/view/login/index'
import Index from '@/view/home/index'
import HomeComponent from '@/components/menu/HomeComponent'
import DataAnalysisComponent from '@/components/menu/DataAnalysisComponent'



//路由表
export const main = [
    {path: '/', exact: true, name: '首页', Redirect: '/index'},
    {
        path: '/index', name: '首页', component: Index,
        routes: [
            {path: '/index/homePage', name: '首页内容', component: HomeComponent},
            {path: '/index/dataAnalysis', name: '数据分析', component: DataAnalysisComponent}
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
