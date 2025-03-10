import React, { useState } from 'react'
import Home from './UI/pages/Home.jsx'
import Header from './UI/components/Header.jsx'
import Footer from './UI/components/footer.jsx'
import HeaderSpacer from './UI/components/HeaderSpacer.jsx'
import { 
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  useLocation,
  useNavigate,
  Outlet,
  Navigate,
  createRoutesFromElements,
  useRouteError,


} from 'react-router-dom'
import NetworkDashboard from './UI/pages/NetworkDashboard.jsx'

const Schedule = React.lazy(() => import('./UI/pages/Schedule.jsx'));
const Monitoring = React.lazy(() => import('./UI/pages/Monitoring.jsx'));
const Data = React.lazy(() => import('./UI/pages/Data.jsx'));
const Alerts = React.lazy(() => import('./UI/pages/Alerts.jsx'));
const Settings = React.lazy(() => import('./UI/pages/Settings.jsx'));


const PrivacyPolicy = React.lazy(() => import('./UI/pages/PrivacyPolicy.jsx'));
const TermsOfService = React.lazy(() => import('./UI/pages/TermsOfService.jsx'));

function App() {

  return (
    <>
      <RouterProvider 
        future={{
          v7_startTransition: true,
        }}
        router={router}
      />
    </>

  )
}
const RootLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeaderSpacer />
      <Outlet />
      <Footer />
    </div>
  );
};
const ErrorLayout = () => {
  const error = useRouteError();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops!</h1>
        <p className="text-gray-600">{error.message || 'Something went wrong'}</p>
      </div>
    </div>
  )
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />} errorElement={<ErrorLayout />}>
      <Route index element={<Home />} />
      <Route path='monitoring' element={<Monitoring />} />

      <Route path='schedule' element={<Schedule />} />

      <Route path='settings' element={<Settings />} />

      <Route path='data' element={<Data />} />

      <Route path='network' element={<NetworkDashboard />} />

      <Route path='alerts' element={<Alerts />} />
      <Route path='privacy-policy' element={<PrivacyPolicy />} />
      <Route path='terms-of-service' element={<TermsOfService />} />
    </Route>
  )
)
export default App
