import { SVGProps } from 'react';
import {
  ShoppingBagIcon,
  UsersIcon,
  AiFillDashboard,
  AiOutlineFontColors,
  AiOutlineLogin,
} from '../assets/icons';
import { ROLE } from '../types/user';

type IconType = (props: SVGProps<SVGSVGElement>) => JSX.Element;

const ICONS = {
  user: UsersIcon,
  product: ShoppingBagIcon,
  app: AiFillDashboard,
  topography: AiOutlineFontColors,
  login: AiOutlineLogin,
};

export interface INavItem {
  title: string;
  path: string;
  icon?: IconType | null;
  role?: ROLE;
  children?: INavItem[];
}

interface ISidebar {
  subheader: string;
  items: INavItem[];
}

const sidebarItems: ISidebar[] = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'App', path: '/dashboard/app', icon: ICONS.app },
      { title: 'Topography', path: '/dashboard/topography', icon: ICONS.topography },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'User',
        path: '/dashboard/user',
        icon: ICONS.user,
        role: ROLE.admin,
        children: [
          { title: 'List', path: '/dashboard/user/list' },
          { title: 'Create', path: '/dashboard/user/create' },
        ],
      },
      {
        title: 'Product',
        path: '/dashboard/product',
        icon: ICONS.product,
        role: ROLE.user,
        children: [
          { title: 'List', path: '/dashboard/product/list' },
          { title: 'Create', path: '/dashboard/product/create' },
        ],
      },
    ],
  },
];

export default sidebarItems;
