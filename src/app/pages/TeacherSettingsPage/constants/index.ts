import { nanoid } from 'nanoid';

import ProfileContent from '../components/profile_content';
import AccountSecurityContent from '../components/account_security_content';
import EmailContent from '../components/email_content';

export const SIDER_MENU_ITEMS = [
  {
    id: nanoid(),
    path: 'profile',
    title: 'Profile',
    component: ProfileContent,
  },
  {
    id: nanoid(),
    path: 'security',
    title: 'Account security',
    component: AccountSecurityContent,
  },
  {
    id: nanoid(),
    path: 'email',
    title: 'Email',
    component: EmailContent,
  },
];

export const FORM_ITEM_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
