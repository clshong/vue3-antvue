
import { ContentMenus } from './content';
import { DemoMenus } from './demo';
import { SystemMenus } from './system';

// 菜单
export const defaultMenus = [
  {
    label: '仪表盘',
    key: 'dashboard',
    icon: 'la:tachometer-alt',
    children: [
      {
        label: '数据总览',
        key: '/dashboard',
        rule: '/dashboard',
      }
    ]
  },
  ...DemoMenus,
  ...SystemMenus,
  ...ContentMenus
];