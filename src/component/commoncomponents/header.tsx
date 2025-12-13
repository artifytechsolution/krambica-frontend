"use client";

import React, { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
  IconButton,
  Badge,
  AppBar,
  Toolbar,
  Box,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import { Search, User, Bell, Heart, ShoppingBag } from "lucide-react";
import SearchPopup from "./search";
import NotificationPopup from "./notifications";

interface HeaderProps {
  cartCount?: number;
  wishlistCount?: number;
  notificationCount?: number;
}

export default function Header({
  cartCount = 0,
  wishlistCount = 0,
  notificationCount = 0,
}: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // account menu
  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const accountMenuOpen = Boolean(accountAnchorEl);

  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAccountAnchorEl(null);
  };

  const handleProfile = () => {
    handleAccountClose();
    window.location.href = "/profile"; // or use router.push("/profile")
  };

  const handleLogout = () => {
    handleAccountClose();
    // TODO: call your logout API / clear auth, then redirect
    // await logout();
    window.location.href = "/login";
  };

  return (
    <>
      <AppBar
        position="sticky"
        className="hidden md:block bg-white shadow-sm"
        elevation={0}
      >
        <Box className="bg-white border-b border-gray-100">
          <Container maxWidth="xl">
            {/* Top Section */}
            <Toolbar className="flex justify-between items-center py-6">
              <div className="w-32 lg:w-40"></div>

              {/* Logo */}
              <Link href="/home" className="flex-shrink-0 group">
                <div className="flex items-center justify-center">
                  <div className="relative w-32 h-12 lg:w-56 lg:h-14">
                    <NextImage
                      src="/logo9.png"
                      alt="Krambica®"
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                  </div>
                </div>
              </Link>

              {/* Right Icons */}
              <div className="flex items-center space-x-4">
                <IconButton
                  onClick={() => setSearchOpen(true)}
                  className="hover:bg-gray-100 transition-all"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-black" strokeWidth={2} />
                </IconButton>

                {/* ACCOUNT ICON WITH MENU */}
                <IconButton
                  onClick={handleAccountClick}
                  className="hover:bg-gray-100 transition-all"
                  aria-label="Account"
                  aria-controls={accountMenuOpen ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={accountMenuOpen ? "true" : undefined}
                >
                  <User className="w-5 h-5 text-black" strokeWidth={2} />
                </IconButton>

                <Menu
                  id="account-menu"
                  anchorEl={accountAnchorEl}
                  open={accountMenuOpen}
                  onClose={handleAccountClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>

                <IconButton
                  onClick={() => setNotificationOpen(true)}
                  className="hover:bg-gray-100 transition-all"
                  aria-label="Notifications"
                >
                  <Badge
                    badgeContent={notificationCount}
                    classes={{
                      badge: "bg-black text-white",
                    }}
                  >
                    <Bell className="w-5 h-5 text-black" strokeWidth={2} />
                  </Badge>
                </IconButton>

                <IconButton
                  component={Link}
                  href="/wishlist"
                  className="hover:bg-gray-100 transition-all"
                  aria-label="Wishlist"
                >
                  <Badge
                    badgeContent={wishlistCount}
                    classes={{
                      badge: "bg-black text-white text-[10px]",
                    }}
                  >
                    <Heart className="w-5 h-5 text-black" strokeWidth={2} />
                  </Badge>
                </IconButton>

                <IconButton
                  component={Link}
                  href="/cart"
                  className="hover:bg-gray-100 transition-all"
                  aria-label="Cart"
                >
                  <Badge
                    badgeContent={cartCount}
                    classes={{
                      badge: "bg-black text-white text-[10px]",
                    }}
                  >
                    <ShoppingBag
                      className="w-5 h-5 text-black"
                      strokeWidth={2}
                    />
                  </Badge>
                </IconButton>
              </div>
            </Toolbar>

            {/* Navigation Menu */}
            <Box className="border-t border-gray-100">
              <nav className="flex justify-center items-center space-x-8 lg:space-x-12 py-4">
                {[
                  "Home",
                  "Shop",
                  "Collection",
                  "Offer",
                  "About",
                  "Contact",
                ].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-base lg:text-lg font-semibold text-[#115e59] hover:text-[#134e4a] transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </Box>
          </Container>
        </Box>
      </AppBar>

      {/* Search Popup */}
      <SearchPopup open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Notification Popup */}
      <NotificationPopup
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      />
    </>
  );
}
