import { Helmet } from 'react-helmet-async';

import { APP_BASE_URL } from '../../../../../constants/strings';

export default function PageHelmet(props: { title: string }) {
  const { title } = props;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={APP_BASE_URL} />
    </Helmet>
  );
}
