'use client'
import React from 'react'
import { Badge, Tooltip } from '@mui/material'
import { useRouter } from 'next/navigation'
import { IconContext, IconType } from 'react-icons'
import { AiFillDashboard } from 'react-icons/ai'
import { FaClipboardUser } from 'react-icons/fa6'
import { RiRefund2Fill } from "react-icons/ri";
import { MdReviews } from 'react-icons/md'
import "./_layout.scss"
import { NavBar } from '@/components'

interface NavLinkType {
  title: string;
  icon: IconType;
  route: string;
  badgeContent: number | string;
}

const navLinks: NavLinkType[] = [
  { title: "Dashboard", icon: AiFillDashboard, route: "/admin/dashboard", badgeContent: '!' },
  { title: "Refunds Management", icon: RiRefund2Fill, route: "/service-professional/refunds", badgeContent: 0 },
  { title: "Order Management", icon: MdReviews, route: "/admin/orders", badgeContent: 0 },
];

interface NavLinkProps extends NavLinkType {
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ title, icon: Icon, route, badgeContent, onClick }) => (
  <Tooltip title={title} arrow>
    <Badge color="primary" badgeContent={badgeContent} onClick={onClick}>
      <IconContext.Provider value={{ className: "portal_navigation_icon" }}>
        <Icon />
      </IconContext.Provider>
    </Badge>
  </Tooltip>
);

interface NavigationMenuProps {
  className: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ className }) => {
  const navigate = useRouter();

  return (
    <section className={className}>
      {navLinks.map((link, index) => (
        <NavLink
          key={index}
          {...link}
          onClick={() => link.route && navigate.push(link.route)}
        />
      ))}
    </section>
  );
};

interface PortalProps {
  children: React.ReactNode;
}

function Portal({ children }: PortalProps) {
  return (
    <>
      <NavBar />
      <main className='portal_wrapper page_container flex_row_center'>
        <NavigationMenu className='portal_navigation_menu' />
        <section className='sub_pages_wrapper'>
          {children}
        </section>
        <NavigationMenu className='portal_navigation_menu_mobile' />
      </main>
    </>
  );
}

export default Portal;