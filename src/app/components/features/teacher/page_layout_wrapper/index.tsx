import React from 'react';

import Topbar from '../../../Topbar/Topbar';
import Footer from '../../../Footer/Footer';

type Props = {
  children: React.ReactNode;
};

export default function PageLayoutWrapper({ children }: Props) {
  return (
    <>
      <Topbar initQuery={''} />
      {children}
      <Footer />
    </>
  );
}
