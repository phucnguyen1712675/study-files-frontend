import TopbarAdminPage from 'app/components/Topbar/TopbarAdminPage';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function AdminPage() {
  return (
    <>
      <Helmet>
        <title>Admin Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <TopbarAdminPage />
      <span>AdminPage container</span>
    </>
  );
}
