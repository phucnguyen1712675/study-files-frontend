import { lazyLoad } from 'utils/loadable';

export const StudyPage = lazyLoad(
  () => import('./StudyPage'),
  module => module.StudyPage,
);
