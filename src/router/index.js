import Login from '@/views/login/index'


//view页面路由表
export const main = [
    /*{path: '/', exact: true, name: '首页', Redirect: '/index'},
    {
        path: '/index', name: '首页', component: Index,
        routes: [{path: '/index/myCard', name: '我的卡片', component: Fetch},
            {path: '/index/myForm', name: '我的表单', component: Form},
            {path: '/index/myTable', name: '我的表格', component: Table},
            {path: '/index/myAnimate', name: '我的关注', component: Animate}]
    },*/
    {path: '/login', name: '登录', component: Login},
    //{path: '/index/myCard', name: '我的卡片', component: Fetch}

]

//菜单相关路由
export const menus = [    // 菜单相关路由
]

export const routerConfig = {
    main, menus
}
