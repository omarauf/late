import { ROLE } from '../types/user';

export const isLogin = () =>
  //   const authCookie = Cookies.get()['express:sess'];
  //   return authCookie !== undefined;
  localStorage.getItem('token') !== null;

export const isObjectEmpty = (obj: object) =>
  obj && // 👈 null and undefined check
  Object.keys(obj).length === 0 &&
  Object.getPrototypeOf(obj) === Object.prototype;

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function hasPermission(permission: ROLE | undefined, user?: { isAdmin: boolean }) {
  if (!user && permission === (ROLE.user || ROLE.admin)) {
    return false;
  }
  if (!user?.isAdmin && permission === ROLE.admin) {
    return false;
  }
  return true;
}
