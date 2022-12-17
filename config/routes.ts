export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    name: '分析算法',
    icon: 'table',
    path: '/algo_user/card_list',
    component: './Algorithm/CardList',
  },

  {
    name: '任务提交',
    hideInMenu: true,
    icon: 'table',
    path: '/job/create',
    component: './Job/CreateForm',
  },
  {
    name: '算法管理',
    icon: 'table',
    path: '/algo',
    routes: [
      {
        name: '算法列表',
        icon: 'table',
        path: '/algo/list',
        component: './Algorithm/TableList',
      },
      {
        name: '新建算法',
        hideInMenu: true,
        icon: 'table',
        path: '/algo/create',
        component: './Algorithm/CreateForm',
      },
      {
        name: '算法分类',
        icon: 'table',
        path: '/algo/group',
        component: './Algorithm/Group',
      },
      {
        component: './Algorithm/TableList',
      },
    ],
  },
  {
    name: '文件管理',
    icon: 'table',
    path: '/file/list',
    component: './File',
  },

  {
    path: '/',
    layout: false,
    access: 'guest',
    component: './Home',
    // redirect: '/home',
  },
  {
    component: './404',
  },
];
