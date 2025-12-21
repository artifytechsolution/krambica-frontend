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
import {
  Search,
  User,
  Bell,
  Heart,
  ShoppingBag,
  LogIn,
  LogOut,
} from "lucide-react";
import SearchPopup from "./search";
import NotificationPopup from "./notifications";

interface HeaderProps {
  cartCount?: number;
  wishlistCount?: number;
  notificationCount?: number;
  isLoggedIn?: boolean;
}

export default function Header({
  cartCount = 0,
  wishlistCount = 0,
  notificationCount = 0,
  isLoggedIn = false,
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
    window.location.href = "/profile";
  };

  const handleLogout = () => {
    handleAccountClose();
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <>
      <AppBar
        position="sticky"
        className="hidden md:block"
        elevation={0}
        sx={{
          backgroundColor: "white", // White background for logo area
        }}
      >
        <Container maxWidth="xl">
          {/* Top Section - White Background */}
          <Toolbar className="flex justify-between items-center py-6">
            <div className="w-32 lg:w-40"></div>

            {/* Logo */}
            <Link href="/home" className="flex-shrink-0 group">
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-12 lg:w-56 lg:h-14">
                  <NextImage
                    src="/logo9.png"
                    alt="Krambica®"
                    height={300}
                    width={300}
                    className=""
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

              {/* Profile Icon with Menu */}
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

              {/* Account Menu */}
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
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    minWidth: 180,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    borderRadius: "12px",
                  },
                }}
              >
                <MenuItem
                  onClick={handleProfile}
                  className="py-2 px-4 hover:bg-gray-50"
                >
                  <User className="w-4 h-4 mr-3 text-gray-600" />
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  className="py-2 px-4 hover:bg-gray-50"
                >
                  <LogOut className="w-4 h-4 mr-3 text-gray-600" />
                  Logout
                </MenuItem>
              </Menu>

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
                  <ShoppingBag className="w-5 h-5 text-black" strokeWidth={2} />
                </Badge>
              </IconButton>
              <IconButton
                onClick={handleLogin}
                className="hover:bg-gray-100 transition-all"
                aria-label="Login"
              >
                <LogIn className="w-5 h-5 text-black" strokeWidth={2} />
              </IconButton>
            </div>
          </Toolbar>
        </Container>

        {/* Navigation Menu - Colored Background - FULL WIDTH */}
        <Box
          sx={{
            backgroundColor: "#115e59", // Teal background for navigation
            width: "100%",
          }}
        >
          <Box
            sx={{
              maxWidth: "xl",
              margin: "0 auto",
            }}
          >
            <nav className="flex justify-center items-center space-x-8 lg:space-x-12 py-4 px-4">
              {["Home", "Shop", "Collection", "Offer", "About", "Contact"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-base lg:text-lg font-semibold text-white hover:text-gray-200 transition-colors"
                  >
                    {item}
                  </Link>
                )
              )}
            </nav>
          </Box>
        </Box>
      </AppBar>

      {/* Search Popup */}
      <SearchPopup open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Notification Popup */}
      {/* <NotificationPopup
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      /> */}
    </>
  );
}
