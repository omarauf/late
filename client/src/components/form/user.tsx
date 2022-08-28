import React, { useReducer } from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';

interface Action {
  type: ActionKind;
  payload: number | string | boolean;
}

enum ActionKind {
  firstName = 'firstName',
  lastName = 'lastName',
  company = 'company',
  email = 'email',
  phone = 'phone',
  password = 'password',
  confirmPassword = 'confirmPassword',
  isAdmin = 'isAdmin',
  id = 'id',
}

export interface IUserForm {
  [ActionKind.firstName]: string;
  [ActionKind.lastName]: string;
  [ActionKind.company]: string;
  [ActionKind.email]: string;
  [ActionKind.phone]: string;
  [ActionKind.isAdmin]: boolean;
  [ActionKind.id]?: string;
  [ActionKind.password]?: string;
  [ActionKind.confirmPassword]?: string;
}

const formReducer = <T extends object>(state: T, event: Action): T => ({
  ...state,
  [event.type]: event.payload,
});

interface UserFormProps<T> {
  type?: 'NEW' | 'UPDATE';
  initialUser: T;
  onSubmit: (formData: T) => Promise<void>;
}

type Reducer<T> = (state: T, event: Action) => T;

export const UserForm = <T extends IUserForm>(props: UserFormProps<T>) => {
  const { initialUser, onSubmit, type = 'NEW' } = props;

  const isNew = type === 'NEW';

  const [formData, setFormData] = useReducer<Reducer<T>>(formReducer, initialUser);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Input
          value={formData.firstName}
          name={ActionKind.firstName}
          title="First Name"
          placeholder="John"
          onChange={setFormData}
        />
        <Input
          value={formData.lastName}
          name={ActionKind.lastName}
          title="Last name"
          placeholder="Doe"
          onChange={setFormData}
        />
        <Input
          value={formData.company}
          name={ActionKind.company}
          title="Company"
          placeholder="Facebook"
          onChange={setFormData}
        />
        <Input
          value={formData.phone}
          onChange={setFormData}
          name={ActionKind.phone}
          title="Phone number"
          placeholder="531 501 3673"
          type="tel"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
        />
      </div>
      {isNew && (
        <div className="mb-6">
          <Input
            value={formData.email}
            name={ActionKind.email}
            title="Email address"
            placeholder="john.doe@company.com"
            type="email"
            onChange={setFormData}
          />
        </div>
      )}
      {isNew && (
        <>
          <div className="mb-6">
            <Input
              value={formData.password}
              name={ActionKind.password}
              title="Password"
              placeholder="•••••••••"
              type="password"
              onChange={setFormData}
            />
          </div>
          <div className="mb-6">
            <Input
              value={formData.confirmPassword}
              name={ActionKind.confirmPassword}
              title="Confirm password"
              placeholder="•••••••••"
              type="password"
              onChange={setFormData}
            />
          </div>
        </>
      )}
      <Checkbox
        checked={formData.isAdmin}
        name={ActionKind.isAdmin}
        title="Is Admin"
        onChange={setFormData}
      />
      <div className="w-full">
        <Button name="submit" title="Submit" type="submit" />
      </div>
    </form>
  );
};
