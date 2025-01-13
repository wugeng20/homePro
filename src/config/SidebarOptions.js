import {
  Compass,
  Connection,
  House,
  Position,
  SwitchFilled
} from '@element-plus/icons-vue';

export const SidebarOptions = [
  {
    label: '主页',
    value: 'home',
    icon: House,
  },
  {
    label: '导航',
    value: 'website',
    icon: Compass,
  },
  {
    label: '游戏',
    value: 'game',
    icon: SwitchFilled,
  },
  {
    label: '友邻',
    value: 'links',
    icon: Connection,
  },
  {
    label: '关于',
    value: 'about',
    icon: Position,
  }
]