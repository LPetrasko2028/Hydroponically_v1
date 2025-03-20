import React, { useState } from "react";
import Home from "./UI/pages/Home.jsx";
import Header from "./UI/components/Header.jsx";
import Footer from "./UI/components/footer.jsx";
import HeaderSpacer from "./UI/components/HeaderSpacer.jsx";
import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
  Outlet,
  Navigate,
  createRoutesFromElements,
  useRouteError,
} from "react-router-dom";

import { useAuthStore } from "./store/authStore.js";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./UI/components/LoadingSpinner.jsx";

import NetworkDashboard from "./UI/pages/NetworkDashboard.jsx";

const Schedule = React.lazy(() => import("./UI/pages/Schedule.jsx"));
const Monitoring = React.lazy(() => import("./UI/pages/Monitoring.jsx"));
const Data = React.lazy(() => import("./UI/pages/Data.jsx"));

const Alerts = React.lazy(() => import("./UI/pages/Alerts.jsx"));
const Settings = React.lazy(() => import("./UI/pages/Settings.jsx"));
const Profile = React.lazy(() => import("./UI/pages/Profile.jsx"));

const PrivacyPolicy = React.lazy(() => import("./UI/pages/PrivacyPolicy.jsx"));
const TermsOfService = React.lazy(() =>
  import("./UI/pages/TermsOfService.jsx")
);



import Login from "./UI/pages/Login.jsx";
import NotFound from "./UI/pages/NotFound.jsx";
import GlobalSetup from "./UI/components/GlobalSetup.jsx";

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <GlobalSetup />
    <BrowserRouter>
      <React.Suspense fallback={<RootLayout><LoadingSpinner /></RootLayout>}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
          errorElement={<ErrorLayout />}
        >
          
          <Route index element={<Home />} />
          <Route path="monitoring" element={<Monitoring />} />

          <Route path="schedule" element={<Schedule />} />

          <Route path="settings" element={<Settings />} />

          <Route path="profile" element={<Profile />} />

          <Route path="data" element={<Data />} />

          <Route path="network" element={<NetworkDashboard />} />

          <Route path="alerts" element={<Alerts />} />

          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
        </Route>
        <Route
          path="login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </React.Suspense>
    </BrowserRouter>
    <Toaster />
    </div>
  );
}
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/" /> : children;
};
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
        <p className="text-gray-600">
          {error.message || "Something went wrong"}
        </p>
      </div>
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <RootLayout />
        </ProtectedRoute>
      }
      errorElement={<ErrorLayout />}
    >
      <Route index element={<Home />} />
      <Route path="monitoring" element={<Monitoring />} />

      <Route path="schedule" element={<Schedule />} />

      <Route path="settings" element={<Settings />} />

      <Route path="data" element={<Data />} />

      <Route path="network" element={<NetworkDashboard />} />

      <Route path="alerts" element={<Alerts />} />

      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="terms-of-service" element={<TermsOfService />} />
    </Route>
  )
);
export default App;
