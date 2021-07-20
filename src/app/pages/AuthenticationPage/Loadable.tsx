import { lazyLoad } from 'utils/loadable';

export const LoginPage = lazyLoad(
  () => import('./Login/Login'),
  module => module.default,
);

export const RegisterPage = lazyLoad(
  () => import('./Register/Register'),
  module => module.default,
);

export const EmailVerifiedPage = lazyLoad(
  () => import('./EmailVerified/EmailVerifiedPage'),
  module => module.default,
);
