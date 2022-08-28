import React, { useReducer, useState } from 'react';
import { Path, useLocation, useNavigate } from 'react-router-dom';
import { signIn } from '../../api';

import useAuth from '../../hooks/useAuth';
import { setToken } from '../../utils/token';
import { Alert } from '../ui/alert';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

// import api from '../../api';
enum ActionKind {
  email = 'email',
  password = 'password',
}

type Action = {
  type: ActionKind;
  payload: number | string;
};

interface IFormState {
  [ActionKind.email]: string;
  [ActionKind.password]: string;
}

const initialCounterState: IFormState = {
  email: '',
  password: '',
};

const formReducer = (state: IFormState, event: Action): IFormState => ({
  ...state,
  [event.type]: event.payload,
});

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useReducer(formReducer, initialCounterState);
  const [errors, setErrors] = useState<string[]>([]);

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from: Path })?.from?.pathname || '/';

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await signIn(formData);
      setToken(data.accessToken);
      setCurrentUser({ userId: data.user.id, isAdmin: data.user.isAdmin, accessToken: data.accessToken });
      navigate(from, { replace: true });
    } catch (error) {
      setErrors([error.data.error]);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <Input name={ActionKind.email} title="Email" placeholder="example@gmail.com" onChange={setFormData} />

      <Input
        name={ActionKind.password}
        title="Password"
        placeholder="•••••••••"
        type="password"
        onChange={setFormData}
      />

      <div className="flex items-center justify-between">
        {/* <div className="flex items-center">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe || ''}
            onChange={handleChange}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div> */}

        {/* <div className="text-sm">
          <a href="#" className="font-medium text-green-600 hover:text-green-500">
            Forgot your password?
          </a>
        </div> */}
      </div>

      {errors.length !== 0 && <Alert errors={errors} title="Failed to login" />}

      <Button name="submit" title="Sign in" type="submit" />
    </form>
  );
};
