import React from 'react';
import { Layout } from 'antd';

import Topbar from '../../../Topbar/Topbar';
import Footer from '../../../Footer/Footer';

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export default function PageLayout({ children, style }: Props) {
  return (
    <>
      <Topbar initQuery={''} />
      <Layout style={style}>{children}</Layout>
      <Footer />
    </>
  );
}
