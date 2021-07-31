import React from 'react';
import {
  ExpandMore,
  ExpandLess,
  PersonOutlineOutlined,
  DvrOutlined,
  ViewQuilt,
  VisibilityOff,
} from '@material-ui/icons';

export const SidebarData = [
  {
    title: 'Users',
    path: '/admin/users',
    icon: <PersonOutlineOutlined />,
  },
  {
    title: 'Courses',
    path: '/admin/courses',
    icon: <DvrOutlined />,
  },
  {
    title: 'Categories',
    icon: <ViewQuilt />,
    iconOpened: <ExpandLess />,
    iconClosed: <ExpandMore />,
    subNav: [
      { title: 'Main categories', path: '/admin/mainCategories' },
      { title: 'Sub categories', path: '/admin/subCategories' },
    ],
  },
  {
    title: 'Change password',
    path: '/admin/updatePassword',
    icon: <VisibilityOff />,
  },
];
