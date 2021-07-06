import Topbar from 'app/components/Topbar/Topbar';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Topbar />
      <span>HomePage container</span>
    </>
  );
}
