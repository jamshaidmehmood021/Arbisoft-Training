import React, { Suspense, lazy } from 'react';
import { Bars } from 'react-loading-icons';

const Home = lazy(() => import('./Pages/Home'));
const SignUp = lazy(() => import('./Pages/SignUp'));
const LogIn = lazy(() => import('./Pages/LogIn'));
const AddItemCustomHookVersion = lazy(() => import('./Pages/AddItemCustomHookVersion'));
const AdminDashboardCustomHookVersion = lazy(() => import('./Pages/AdminDashboardCustomHookVersion'));
const AdminReport = lazy(() => import('./Pages/AdminReport'));
const EditItemCustomHookVersion = lazy(() => import('./Pages/EditItemCustomHookVersion'));
const InviteFriend = lazy(() => import('./Pages/InviteFriend'));

export const LazyHome = () => (
  <Suspense fallback={<div><Bars /></div>}>
    <Home />
  </Suspense>
);

export const LazySignUp = () => (
  <Suspense fallback={<div><Bars /></div>}>
    <SignUp />
  </Suspense>
);

export const LazyLogIn = () => (
  <Suspense fallback={<div><Bars /></div>}>
    <LogIn />
  </Suspense>
);

export const LazyAddItemCustomHookVersion = () => (
  <Suspense fallback={<div><Bars /></div>}>
    <AddItemCustomHookVersion />
  </Suspense>
);

export const LazyAdminDashboardCustomHookVersion = () => (
  <Suspense fallback={<div><Bars /></div>}>
    <AdminDashboardCustomHookVersion />
  </Suspense>
);

export const LazyAdminReport = () => (
  <Suspense fallback={<div><Bars /></div>}>
    <AdminReport />
  </Suspense>
);

export const LazyEditItemCustomHookVersion = () => (
  <Suspense fallback={<div><Bars /></div>}>
    <EditItemCustomHookVersion />
  </Suspense>
);

export const LazyInviteFriend = () => (
  <Suspense fallback={<div><Bars /></div>}>
    <InviteFriend />
  </Suspense>
);
