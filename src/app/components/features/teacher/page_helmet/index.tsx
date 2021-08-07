import { Helmet } from 'react-helmet-async';

import { APP_BASE_URL } from '../../../../../constants/strings';

type Props = { title: string };

export default function PageHelmet({ title }: Props) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={APP_BASE_URL} />
    </Helmet>
  );
}
