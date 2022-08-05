import { IRoute } from '@umijs/types';

const routes: IRoute[] = [
  {
    path: '/',
    component: '@/layout/index',
    routes: [
      {
        path: '/edit-card',
        component: '@/pages/edit-card/index',
        title: 'Edit Card/编辑卡片',
      },
      {
        path: '/preview',
        component: '@/pages/preview/index',
        title: 'Preview/贺卡详情',
      },
      {
        path: '/staff-preview',
        component: '@/pages/staff-preview/index',
        title: 'Anniversary Card/贺卡详情',
      },
      {
        path: '/select-board',
        component: '@/pages/select-board/index',
        title: 'Select Board/选择模板',
      },
      {
        path: '/select-music',
        component: '@/pages/select-music/index',
        title: 'Select Music/选择音乐',
      },
      {
        path: '/bonus',
        component: '@/pages/bonus/index',
        title: 'SOP Bonus Simulator/SOP年奖测算',
      },
      {
        path: '/workbench',
        component: '@/pages/workbench/index',
        title: 'I-People',
      },
      {
        path: '/daily',
        component: '@/pages/daily/index',
        title: 'Daily',
      },
      {
        path: '/test',
        component: '@/pages/index',
      },
    ],
  },
];

export default routes;
