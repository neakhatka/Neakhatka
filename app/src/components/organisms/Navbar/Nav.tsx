// Nav.tsx
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/legacy/image";
import { useCount } from "../../../contexts/CountContext";
import { action } from '@storybook/addon-actions';

interface MenuItem {
  text: string;
  link: string;
}

export const Nav = ({
  isMenuOpen = false,
  activeLink = "",
  count = 0,
}: {
  isMenuOpen?: boolean;
  activeLink?: string;
  count?: number;
}) => {
  const [menuOpen, setMenuOpen] = useState(isMenuOpen);
  const [currentLink, setCurrentLink] = useState(activeLink);

  useEffect(() => {
    setCurrentLink(window.location.pathname);
  }, []);

  const menuItems: MenuItem[] = [
    { text: "Home", link: "/" },
    { text: "Favorite", link: "/favorite" },
    { text: "Contact Us", link: "/contact-us" },
    { text: "About Us", link: "/about-us" },
    { text: "Sign Up", link: "/role" },
    { text: "Login", link: "/login" },
  ];

  const isActive = (link: string) => currentLink === link;

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    action('Menu Toggled')(!menuOpen);
  };

  return (
    <Navbar
      className="py-1"
      shouldHideOnScroll
      isMenuOpen={menuOpen}
      onMenuOpenChange={handleMenuToggle}
    >
      <NavbarContent>
        <NavbarBrand>
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={45} height={45} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 ml-16" justify="center">
        {menuItems.slice(0, 4).map((item) => (
          <NavbarItem key={item.link}>
            <Link
              size="sm"
              href={item.link}
              className={`${
                isActive(item.link) ? "text-green-500" : "text-gray-800"
              }`}
            >
              {item.text}
              {item.text === "Favorite" && count > 0 && (
                <Badge variant="destructive" className="-mt-3">
                  {count > 9 ? "9+" : count}
                </Badge>
              )}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="ml-16" justify="end">
        <NavbarItem className="hidden sm:flex">
          <Link
            href="/login"
            className={`${
              isActive("/login") ? "text-green-500" : "text-gray-800"
            }`}
          >
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/role">
            <Button className="bg-[#4B9960] hidden sm:flex">Sign Up</Button>
          </Link>
        </NavbarItem>
        <NavbarMenuToggle
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          onClick={handleMenuToggle}
        />
      </NavbarContent>

      <NavbarMenu style={{ background: menuOpen ? "#fff" : "#fff" }}>
        {menuItems.map((item, index) => (
          <NavbarMenuItem className="mt-5" key={`${item}-${index}`}>
            <Link
              color="foreground"
              className={`w-full ${
                isActive(item.link) ? "text-green-500" : "text-gray-800"
              }`}
              href={item.link}
              size="lg"
            >
              {item.text}
              {item.text === "Favorite" && count > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {count > 9 ? "9+" : count}
                </Badge>
              )}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
