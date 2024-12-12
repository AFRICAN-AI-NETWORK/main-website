import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { storageHandler } from '@/lib/localStorage';
import HomePage from '@/pages/HomePage';

const AboutPage = lazy(() => import('@/pages/AboutPage'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const SignupPage = lazy(() => import('@/pages/auth/SignupPage'));
const AiToolsPage = lazy(() => import('@/pages/AiToolsPage'));
const AiToolPage = lazy(() => import('@/pages/AiToolPage'));
const AiToolCategoryPage = lazy(() => import('@/pages/AiToolCategoryPage'));
const ResourcePage = lazy(() => import('@/pages/ResourcePage'));
const CountriesPage = lazy(() => import('@/pages/CountriesPage'));
const CountryPage = lazy(() => import('@/pages/CountryPage'));
const CoursesPage = lazy(() => import('@/pages/CoursesPage'));
const EventsPage = lazy(() => import('@/pages/EventsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Authentication Check
const isAuthenticated = !!storageHandler.getToken();

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const RedirectIfAuthenticated: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (isAuthenticated) {
    // Redirect to home if already authenticated
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/auth/*"
            element={
              <RedirectIfAuthenticated>
                <Routes>
                  <Route path="login" element={<LoginPage />} />
                  <Route path="signup" element={<SignupPage />} />
                </Routes>
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/ai-tools"
            element={
              <RequireAuth>
                <AiToolsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/ai-tools/:slug"
            element={
              <RequireAuth>
                <AiToolPage />
              </RequireAuth>
            }
          />
          <Route
            path="/ai-tool-categories/:title"
            element={
              <RequireAuth>
                <AiToolCategoryPage />
              </RequireAuth>
            }
          />
          <Route
            path="/resources/:slug"
            element={
              <RequireAuth>
                <ResourcePage />
              </RequireAuth>
            }
          />
          <Route
            path="/countries"
            element={
              <RequireAuth>
                <CountriesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/countries/:name"
            element={
              <RequireAuth>
                <CountryPage />
              </RequireAuth>
            }
          />
          <Route
            path="/courses"
            element={
              <RequireAuth>
                <CoursesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/events"
            element={
              <RequireAuth>
                <EventsPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
