import React, { useState } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

import NavSections, { INavItem } from '../config/navItems';
import { IoIosArrowForward } from '../assets/icons';
import { Dot, Logo } from '../assets/svg';
import useAuth from '../hooks/useAuth';
import { hasPermission } from '../utils';
import AccountDetails from './account';

function getActive(path: string, pathname: string) {
  return path ? !!matchPath({ path, end: false }, pathname) : false;
}

interface SidebarProps {
  isSidebarOpen: boolean;
  onCloseSidebar: () => void;
}

// const SIDEBAR_WIDTH = '280px';
// const SIDEBAR_WIDTH_COLLAPSE = '88px';

const isCollapse = false;

const SideBar: React.FC<SidebarProps> = () => (
  // const [isCollapse, setIsCollpase] = React.useState(false);

  // const sliderRef = React.createRef<HTMLDivElement>();

  // const mouseEnterHandler = () => {
  //   if (isCollapse) sliderRef.current?.style.setProperty('width', '280px');
  // };

  // const mouseLeaveHandler = () => {
  //   if (isCollapse) sliderRef.current?.style.setProperty('width', '88px');
  // };

  <div
    // ref={sliderRef}
    className="flex-shrink-0 overflow-y-scroll transition-all"
    // onMouseEnter={mouseEnterHandler}
    // onMouseLeave={mouseLeaveHandler}
    style={{ width: `${isCollapse ? 88 : 280}px` }}>
    {/* User  Account */}
    <div className="flex flex-shrink-0 flex-col px-5 pt-6 pb-4">
      <div className="flex w-full items-center justify-between">
        <Logo />
        {/* <div onClick={() => setIsCollpase(!isCollapse)} className="bg-red-200"> */}
        {/* <CollapseButton /> */}
        {/* </div> */}
      </div>

      {/* Account Details */}
      <AccountDetails />

      {/* Item render */}
      <div>
        {NavSections.map((section, index) => (
          <ul key={index}>
            <li className="pt-6 pl-4 pb-2 uppercase" style={{ color: '#212B36' }}>
              {section.subheader}
            </li>

            {section.items.map((item, indexItem) => (
              <ListItem key={indexItem} item={item} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  </div>
);

const ListItem: React.FC<{ item: INavItem }> = ({ item }) => {
  const { pathname } = useLocation();
  const active = getActive(item.path, pathname);
  const [open, setOpen] = useState(active);
  const { currentUser } = useAuth();

  const show = hasPermission(item.role, currentUser);

  return show ? (
    <>
      <Item item={item} isChildren={false} onClick={() => setOpen(!open)} isOpen={open} />
      {/* children if there is  */}
      {item.children && (
        <div className={`${open ? 'max-h-40' : 'max-h-0'} overflow-hidden transition-all duration-300`}>
          {item.children.map((childrenItem, index) => (
            <Item key={index} item={childrenItem} isChildren />
          ))}
        </div>
      )}
    </>
  ) : null;
};

interface ItemProps {
  item: INavItem;
  isChildren: boolean;
  isOpen?: boolean;
  onClick?: () => void;
}

const Item: React.FC<ItemProps> = ({ item, isChildren, isOpen, onClick }) => {
  const { pathname } = useLocation();
  const isActive = getActive(item.path, pathname);

  const path = item.children ? pathname : item.path;

  let styleClass = '';

  if (isChildren) styleClass = `${isActive ? 'font-bold color-slate-800' : 'color-slate-500'} `;
  else styleClass = `${isActive ? 'font-semibold text-green-500 bg-green-500/10 ' : ''} `;

  return (
    <NavLink
      className={`mb-1 flex h-12 flex-grow cursor-pointer select-none items-center justify-start rounded-lg py-2 pl-4 
      pr-3 align-middle transition-colors duration-150 hover:bg-gray-100 ${styleClass}`}
      to={path}
      onClick={onClick}>
      {item.icon && <item.icon className={`mr-3 w-5 ${isActive ? 'fill-green-500' : 'fill-slate-500'} `} />}
      {isChildren && (
        <div className="mr-4 flex h-6 w-6 items-center justify-center">
          <Dot active={isActive} />
        </div>
      )}
      <p className="capitalize" style={{ flex: '1 1 auto' }}>
        {item.title}
      </p>
      {item.children && <IoIosArrowForward className={`transition ${isOpen ? 'rotate-90' : ''}`} />}
    </NavLink>
  );
};

export default SideBar;
