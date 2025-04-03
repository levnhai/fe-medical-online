import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

import DefaultLayout from './layouts/defaultLayout';
import ProtectedRoute from './utils/protectedRoute';
import { publicRoutes } from '~/routes';
import ScrollToTop from './components/scroll';

const socket = io(process.env.REACT_APP_BACKEND_URL);

function App() {
  const userId = useSelector((state) => state.auth?.user?.payload?.userData?._id);

  useEffect(() => {
    socket.emit('user_online', userId);

    window.addEventListener('beforeunload', () => {
      socket.emit('user_offline', userId);
    });

    return () => {
      socket.emit('user_offline', userId);
    };
  }, []);
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
