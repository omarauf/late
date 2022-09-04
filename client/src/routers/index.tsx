import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/main';

// Guards
import { RequiredAuth } from '../guards/requiredAuth';

// User Pages
import UserList from '../pages/users/list';
import UserCreate from '../pages/users/create';

// Product Pages
import ProductList from '../pages/products/list';
import ProductCreate from '../pages/products/create';
import ProductImport from '../pages/products/import';

// Pages
import Login from '../pages/auth/login';
import NotFound from '../pages/404';
import Dashboard from '../pages/dashboard';
import Topography from '../pages/theme/topography';

const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard/app" replace />} />

    <Route path="login" element={<Login />} />

    <Route path="/dashboard" element={<MainLayout />}>
      {/* Unprotected */}
      <Route index element={<Navigate to="/dashboard/app" replace />} />
      <Route path="app" element={<Dashboard />} />
      <Route path="topography" element={<Topography />} />

      {/* Admin */}
      <Route path="user" element={<RequiredAuth adminOnly />}>
        <Route index element={<Navigate to="/dashboard/user/list" replace />} />
        <Route path="list" element={<UserList />} />
        <Route path="create" element={<UserCreate />} />
      </Route>

      {/* User */}
      <Route path="product" element={<RequiredAuth />}>
        <Route index element={<Navigate to="/dashboard/product/list" replace />} />
        <Route path="list" element={<ProductList />} />
        <Route path="create" element={<ProductCreate />} />
        <Route path="import" element={<ProductImport />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/404" replace />} />
    <Route path="404" element={<NotFound />} />
  </Routes>
);

export default Router;
