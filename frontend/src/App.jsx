import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import "./App.css";
import PublicLayout from "./layout/PublicLayout";
import RoutesList from "./routes";
import AdminLayout from "./layout/AdminLayout";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { isLogin } from "./utils/functions";
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((state) => state.authReducer);

  const [isAdmin, setIsAdmin] = useState(user.role === "admin" || false);
  const [isLoggedIn, setIsLoggedIn] = useState(isLogin());
  const location = useLocation();

  useEffect(() => {
    if (user) {
      setIsAdmin(user.role === "admin");
    }
    setIsLoggedIn(isLogin());
  }, [user]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location]);

  const renderRoutes = () => {
    const renderRoute = (Component, layout) => {
      if (Component) {
        switch (layout) {
          case "admin":
            return isAdmin ? (
              <AdminLayout>
                <Component />
              </AdminLayout>
            ) : isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Navigate to="/login" />
            );
          case "private":
            return isLoggedIn ? (
              <PublicLayout>
                <Component />
              </PublicLayout>
            ) : (
              <Navigate to="/login" />
            );
          case "none":
            return <Component />;
          case "public":
          default:
            return (
              <PublicLayout>
                <Component />
              </PublicLayout>
            );
        }
      }
      return null;
    };

    const routes = isAdmin
      ? RoutesList.filter((route) => route.layout === "admin")
      : RoutesList.filter((route) => route.layout !== "admin");

    return routes.map((route) => (
      <Route
        key={route.name}
        path={route.path}
        element={renderRoute(route.component, route.layout)}
      />
    ));
  };

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {renderRoutes()}
        <Route path="*" element={<Navigate to={isAdmin ? "/admin/movie" : "/"} />} />
      </Routes>
    </div>
  );
};

export default App;
