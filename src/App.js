import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';

import DefaultLayout from './layouts/defaultLayout';
import ProtectedRoute from './utils/protectedRoute';
import { publicRoutes } from '~/routes';
import ScrollToTop from './components/scroll';

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {publicRoutes.map(({ path, layout, isPrivate, requiredRole, component: Component }, index) => {
            let Layout = DefaultLayout;
            if (layout) {
              Layout = layout;
            } else if (layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={path}
                element={
                  isPrivate ? (
                    <ProtectedRoute requiredRole={requiredRole}>
                      <Layout>
                        <Component />
                        <ToastContainer />
                      </Layout>
                    </ProtectedRoute>
                  ) : (
                    <Layout>
                      <Component />
                      <ToastContainer />
                    </Layout>
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;
