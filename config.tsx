import { usePathname } from 'next/navigation';

import { CheckCircle, ClipboardList, Home, Settings, Users } from 'lucide-react';

export const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  return [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={20} />,
      active: isNavItemActive(pathname, '/dashboard'),
      position: 'top',
    },
    {
      name: 'Attendance',
      href: '/attendance',
      icon: <CheckCircle size={20} />,
      active: isNavItemActive(pathname, '/attendance'),
      position: 'top',
    },
    {
      name: 'Tasks',
      href: '/tasks',
      icon: <ClipboardList size={20} />,
      active: isNavItemActive(pathname, '/tasks'),
      position: 'top',
    },
    {
      name: 'Employees',
      href: '/employees',
      icon: <Users size={20} />,
      active: isNavItemActive(pathname, '/employees'),
      position: 'top',
    },
    // {
    //   name: 'Settings',
    //   href: '/settings',
    //   icon: <Settings size={20} />,
    //   active: isNavItemActive(pathname, '/settings'),
    //   position: 'top',
    // },
  ];
};