import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import ThemeSwitcher from './ThemeSwitcher.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrambleText from '@components/ScrambleText.tsx';
import Logo from '@icons/logo.svg?react';
import Rabbitit from '@icons/rabbitit.svg?react';

export default function App({ pathname, children }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const links = [{
    label: 'All',
    href: '/'
  }, {
    label: 'Works',
    href: '/works/'
  }, {
    label: 'About',
    href: '/about/'
  }, {
    label: 'Contact',
    href: 'mailto:chinaitlearner@gmail.com'
  }]
  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      // isBlurred={false}
      classNames={{
        menuItem: [
          "text-[#aaa]",
          "data-[active=true]:text-[#333]",
          "dark:data-[active=true]:text-[#eee]",
        ],
        base: [
          "bg-inherit"
        ],
        menu: [
          "bg-inherit"
        ],
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "text-[#aaa]",
          "data-[active=true]:text-[#333]",
          "dark:data-[active=true]:text-[#eee]",
        ],
      }}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="pr-3 sm:hidden" justify="center">
        <NavbarBrand className="sm:text-2xl sm:pr-8 text-xl">
          <Logo className="w-8 h-8 sm:w-12"/>
          &nbsp;
          <Link href='/'>
            Designer
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="pr-3 hidden sm:flex" justify="start">
        <NavbarBrand className="sm:text-2xl sm:pr-8 text-xl">
          <Link href='/'>
            Designer
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="pr-3 hidden sm:flex" justify="center">
        <NavbarBrand className="sm:text-2xl sm:pr-8 text-xl">
          <Logo className="w-12 h-12 sm:w-12"/>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {
          links.map((link, idx) => {
            return (
              <NavbarItem className="hidden sm:flex" data-pathname={link.href} key={`${link.label}`} isActive={link.href === pathname}>
                <Link color="foreground" href={link.href}>
                  <ScrambleText text={link.label.toLocaleUpperCase()}/>
                </Link>
              </NavbarItem>
            )
          })
        }
        <NavbarItem>
          {children}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {links.map((link, index) => (
          <NavbarMenuItem key={`${link.label}-${index}`} isActive={link.href === pathname}>
            <Link
              className="w-full"
              color="warning"
              href={link.href}
              size="lg"
            >
              {link.label.toLocaleUpperCase()}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}


