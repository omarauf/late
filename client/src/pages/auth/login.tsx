import React from 'react';
import { Navigate } from 'react-router-dom';

import { LoginForm } from '../../components/form/loginForm';
import useAuth from '../../hooks/useAuth';

const Login: React.FC = () => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <Navigate to="/dashboard/app" replace />
  ) : (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              className="h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            {/* <p className="mt-2 text-sm text-gray-600">
              Don’t have an account?{' '}
              <NavLink to="/register" className="font-medium text-green-600 hover:text-green-500">
                Register
              </NavLink>
            </p> */}
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
