export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './Account/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['Manager', 'Normal'],
    routes: [
      // dashboard
      {
        path: '/',
        redirect: '/input',
      },
      {
        path: '/input',
        name: '数据录入',
        component: './Report/Workplace',
        authority: ['Manager', 'Normal'],
      },
      {
        path: '/input/:reportId',
        name: '报表录入',
        component: './Report/ReportInput',
        hideInMenu: true,
        authority: ['Manager', 'Normal'],
      },
      {
        path: '/history',
        name: '报表数据',
        icon: 'database',
        component: './Report/ReportHistory',
        authority: ['Manager', 'Normal'],
      },
      {
        path: '/users',
        name: '用户管理',
        icon: 'team',
        component: './Manager/UserList',
        authority: ['Manager'],
      },
      {
        path: '/depts',
        name: '部门管理',
        icon: 'coffee',
        component: './Manager/DeptList',
        authority: ['Manager'],
      },
      {
        path: '/fields',
        name: '字段管理',
        icon: 'share-alt',
        component: './Manager/FieldList',
        authority: ['Manager'],
      },
      {
        path: '/airports',
        name: '机场管理',
        icon: 'dingding',
        component: './Manager/AirportList',
        authority: ['Manager'],
      },
      {
        path: '/reports',
        name: '报表管理',
        icon: 'table',
        component: './Manager/ReportList',
        authority: ['Manager'],
      },
      {
        path: '/reports/:reportId',
        name: '报表详情',
        component: './Manager/ReportDetail',
        hideInMenu: true,
        authority: ['Manager'],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        hideInMenu: true,
        routes: [
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
