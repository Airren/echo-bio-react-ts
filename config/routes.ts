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
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '分析算法',
    icon: 'table',
    path: '/algo/card_list',
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
    path: '/algo/list',
    component: './Algorithm/TableList',
  },
  {
    name: '新建算法',
    icon: 'table',
    path: '/algo/create',
    component: './Algorithm/CreateForm',
  },
  {
    name: '算法分类',
    icon: 'table',
    path: '/algo/group`',
    component: './Algorithm/Group',
  },

  //   {
  //     name: '任务提交',
  //     icon: 'job',
  //     path: '/job',
  //     routes: [
  //       {
  //         path: '/job/job_form',
  //         name: '提交任务',
  //         icon: 'smile',
  //         component: './Job/JobForm',
  //       },
  //       {
  //         component: './404',
  //       },
  //     ],
  //   },

  //   {
  //     name: '分析算法',
  //     icon: 'tool',
  //     path: '/cloud_analysis',
  //     component: './Algorithm',
  //   },
  //     {
  //       name: '云分析',
  //       icon: 'tool',
  //       path: '/cloud_analysis',
  //       component: './Algorithm'
  // //       redirect: '/cloud_analysis/algorithm',
  //     },
  //     {
  //       name: '分析算法',
  //       icon: 'tool',
  //       path: '/cloud_analysis',
  //       routes: [
  //         {
  //           path: '/cloud_analysis',
  //           redirect: '/cloud_analysis/algorithm',
  //         },
  //         {
  //           name: "分析算法",
  //           path: '/cloud_analysis/algorithm',
  //           component: './Algorithms',
  //         },
  //         {
  //           path: '/cloud_analysis/algorithm_form',
  //           component: './Algorithms/AlgorithmForm',
  //         },
  //       ],
  //     },

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
