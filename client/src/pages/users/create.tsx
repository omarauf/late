import React from 'react';
import { createUser } from '../../api';
import { UserForm, IUserForm } from '../../components/form/user';
import { notify } from '../../components/ui/toast';

const initialCounterState: IUserForm = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  password: '',
  confirmPassword: '',
  isAdmin: false,
};

const CreateUser: React.FC = () => {
  const onSubmitHandler = async (formData: IUserForm) => {
    if (formData.password === formData.confirmPassword) {
      try {
        const { data } = await createUser(formData);
        notify('Done', `${data.firstName} ${data.lastName} has been created successfully`);
      } catch (error) {
        notify('Error', `${error.message}`, true);
      }
    } else {
      notify('Error', `Passwords are not matched`, true);
    }
  };

  return (
    <>
      <h1 className="mb-6">Create a New User</h1>
      <div className="rounded bg-white p-8 shadow">
        <UserForm<IUserForm> onSubmit={onSubmitHandler} initialUser={initialCounterState} />
      </div>
    </>
  );
};

export default CreateUser;
