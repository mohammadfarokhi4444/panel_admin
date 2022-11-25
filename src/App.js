import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/login";
import { useUserState } from "./context/UserContext";
import Dashboard from "./pages/dashboard";
import Resume from "./pages/resume";
import NotFound from "./pages/404";
import Layout from "./components/Layout";
import Car from "./pages/car";
import Book from "./pages/book";
import Admin from "./components/Admin";
import EditAdmin from "./components/Admin/Edit";
import CreateAdmin from "./components/Admin/Create";

const App = () => {
  const { isAuthenticated } = useUserState();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            replace
            to={`/app/dashboard`}
          />
        }
      />
      <Route
        path="app"
        element={<Navigate replace to={`/app/dashboard`} />}
      />
      <Route path={`/app`} element={<PrivateRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="resume" element={<Resume />} />
        <Route path="admin" element={<Admin />} />
        <Route path="admin/edit/:id" element={<EditAdmin />} />
        <Route path="admin/create" element={<CreateAdmin />} />
        <Route path="product" element={<Outlet />}>
          <Route index element={<Car />} />
          <Route path="car" element={<Car />} />
          <Route path="book" element={<Book />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
  function PrivateRoute() {
    return isAuthenticated ? <Layout /> : <Navigate replace to="/login" />;
  }
};
export default App;
