import React, { useEffect } from 'react';
import { getUser, signOut } from '../api';
import { notify } from '../components/ui/toast';
import useAuth from '../hooks/useAuth';
import { IUser } from '../types/user';
import { removeToken } from '../utils/token';

const AccountDetails: React.FC = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = React.useState<IUser>();
  const [show, setShow] = React.useState(false);

  const { setCurrentUser } = useAuth();

  const mouseEnterHandler = () => {
    setShow(true);
  };

  const mouseLeaveHandler = () => {
    setShow(false);
  };

  const signOutHandler = async () => {
    try {
      await signOut();
      removeToken();
      setCurrentUser(undefined);
      notify('Done', 'Signing out');
    } catch (error) {
      notify('Error', error.message, true);
    }
  };

  useEffect(() => {
    if (currentUser?.userId) {
      getUser(currentUser.userId)
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => {
          notify('Error', err.message, true);
        });
    }
  }, []);

  return user ? (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      className="mt-6 rounded-xl px-5"
      style={{ background: 'rgba(145, 158, 171, 0.12)' }}>
      <div className="flex items-center py-4">
        <img
          className="skeleton h-10 w-10 rounded-full"
          src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_5.jpg"
          alt="name of user"
        />
        <div className="ml-4">
          <h6 className="">
            {user.firstName} {user.lastName}
          </h6>
          <p style={{ color: '#637381' }}>{user.isAdmin ? 'Admin' : 'User'}</p>
        </div>
      </div>

      <div
        className={`${
          show ? 'max-h-40' : 'max-h-0'
        } flex flex-col justify-between overflow-hidden transition-all duration-500`}>
        <button
          className="block cursor-pointer bg-gray-100 px-4 py-2 text-sm text-gray-700"
          type="button"
          onClick={signOutHandler}>
          Signout
        </button>
      </div>
    </div>
  ) : null;
};

export default AccountDetails;
