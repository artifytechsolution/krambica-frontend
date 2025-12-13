"use client";

import React, { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import {
  Search,
  Bell,
  Heart,
  Menu,
  X,
  Home,
  Store,
  Layers,
  Tag,
  Info,
  Mail,
  UserCircle,
  ChevronRight,
} from "lucide-react";
import SearchPopup from "./search";
import NotificationPopup from "./notifications";

interface MobileHeaderProps {
  wishlistCount?: number;
  notificationCount?: number;
}

export default function MobileHeader({
  wishlistCount = 0,
  notificationCount = 0,
}: MobileHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const menuItems = [
    { text: "Home", icon: Home, href: "/home" },
    { text: "Shop", icon: Store, href: "/shop" },
    { text: "Collection", icon: Layers, href: "/collection" },
    { text: "Offer", icon: Tag, href: "/offer" },
    { text: "About", icon: Info, href: "/about" },
    { text: "Contact", icon: Mail, href: "/contact" },
    { text: "My Account", icon: UserCircle, href: "/profile" },
    { text: "Logout", icon: UserCircle, href: "/logout" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        className="md:hidden bg-white"
        elevation={0}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 2,
          borderBottom: "1px solid",
          borderColor: "rgba(0, 0, 0, 0.08)",
          backgroundColor: "#ffffff",
        }}
      >
        <Toolbar
          className="flex items-center justify-between px-3 sm:px-4"
          sx={{
            minHeight: { xs: "56px", sm: "64px" },
            height: { xs: "56px", sm: "64px" },
            paddingLeft: { xs: "12px", sm: "16px" },
            paddingRight: { xs: "12px", sm: "16px" },
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 group active:opacity-70 transition-opacity"
          >
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
          <Box
            className="flex items-center"
            sx={{
              gap: { xs: "4px", sm: "6px" },
            }}
          >
            {/* Search Icon */}
            <IconButton
              onClick={() => setSearchOpen(true)}
              className="text-black hover:bg-gray-100 active:scale-95 transition-all"
              size="small"
              sx={{
                width: { xs: "36px", sm: "40px" },
                height: { xs: "36px", sm: "40px" },
                padding: "8px",
              }}
              aria-label="Search"
            >
              <Search
                style={{
                  width: "clamp(16px, 4vw, 20px)",
                  height: "clamp(16px, 4vw, 20px)",
                }}
                strokeWidth={2.5}
              />
            </IconButton>

            {/* Notification Icon */}
            <IconButton
              onClick={() => setNotificationOpen(true)}
              className="text-black hover:bg-gray-100 active:scale-95 transition-all"
              size="small"
              sx={{
                width: { xs: "36px", sm: "40px" },
                height: { xs: "36px", sm: "40px" },
                padding: "8px",
              }}
              aria-label="Notifications"
            >
              <Badge
                badgeContent={notificationCount}
                max={99}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    fontSize: { xs: "0.625rem", sm: "0.75rem" },
                    minWidth: { xs: "16px", sm: "18px" },
                    height: { xs: "16px", sm: "18px" },
                    fontWeight: "bold",
                    padding: { xs: "0 4px", sm: "0 5px" },
                  },
                }}
              >
                <Bell
                  style={{
                    width: "clamp(16px, 4vw, 20px)",
                    height: "clamp(16px, 4vw, 20px)",
                  }}
                  strokeWidth={2.5}
                />
              </Badge>
            </IconButton>

            {/* Wishlist Icon */}
            <IconButton
              component={Link}
              href="/wishlist"
              className="text-black hover:bg-gray-100 active:scale-95 transition-all"
              size="small"
              sx={{
                width: { xs: "36px", sm: "40px" },
                height: { xs: "36px", sm: "40px" },
                padding: "8px",
              }}
              aria-label="Wishlist"
            >
              <Badge
                badgeContent={wishlistCount}
                max={99}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    fontSize: { xs: "0.625rem", sm: "0.75rem" },
                    minWidth: { xs: "16px", sm: "18px" },
                    height: { xs: "16px", sm: "18px" },
                    fontWeight: "bold",
                    padding: { xs: "0 4px", sm: "0 5px" },
                  },
                }}
              >
                <Heart
                  style={{
                    width: "clamp(16px, 4vw, 20px)",
                    height: "clamp(16px, 4vw, 20px)",
                  }}
                  strokeWidth={2.5}
                />
              </Badge>
            </IconButton>

            {/* Menu Icon */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              className="text-black hover:bg-gray-100 active:scale-95 transition-all"
              size="small"
              sx={{
                width: { xs: "36px", sm: "40px" },
                height: { xs: "36px", sm: "40px" },
                padding: "8px",
              }}
              aria-label="Menu"
            >
              <Menu
                style={{
                  width: "clamp(18px, 4.5vw, 22px)",
                  height: "clamp(18px, 4.5vw, 22px)",
                }}
                strokeWidth={2.5}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className="md:hidden"
        PaperProps={{
          sx: {
            width: { xs: "85vw", sm: "320px" },
            maxWidth: "85vw",
            backgroundColor: "#ffffff",
          },
        }}
        transitionDuration={300}
      >
        {/* Drawer Header */}
        <Box
          className="sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between z-10"
          sx={{
            padding: { xs: "12px 16px", sm: "16px 20px" },
          }}
        >
          <h2
            className="font-bold text-black"
            style={{
              fontSize: "clamp(1.125rem, 4vw, 1.25rem)",
            }}
          >
            Menu
          </h2>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            className="hover:bg-gray-100 active:scale-95 transition-all"
            size="small"
            sx={{
              width: { xs: "32px", sm: "36px" },
              height: { xs: "32px", sm: "36px" },
            }}
            aria-label="Close menu"
          >
            <X
              style={{
                width: "clamp(18px, 4vw, 20px)",
                height: "clamp(18px, 4vw, 20px)",
              }}
              strokeWidth={2.5}
            />
          </IconButton>
        </Box>

        {/* Menu Items */}
        <List
          sx={{
            padding: { xs: "16px", sm: "20px 24px" },
            display: "flex",
            flexDirection: "column",
            gap: { xs: "4px", sm: "8px" },
          }}
        >
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <React.Fragment key={item.text}>
                <ListItem
                  disablePadding
                  sx={{
                    marginBottom: { xs: "2px", sm: "4px" },
                  }}
                >
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="text-black hover:bg-gray-100 active:bg-gray-200 transition-all rounded-xl group"
                    sx={{
                      padding: { xs: "12px 16px", sm: "14px 16px" },
                      borderRadius: "12px",
                      "&:active": {
                        transform: "scale(0.98)",
                      },
                    }}
                  >
                    <ListItemIcon
                      className="text-black group-hover:text-gray-700 transition-colors"
                      sx={{
                        minWidth: { xs: "36px", sm: "40px" },
                      }}
                    >
                      <IconComponent
                        style={{
                          width: "clamp(18px, 4vw, 20px)",
                          height: "clamp(18px, 4vw, 20px)",
                        }}
                        strokeWidth={2.5}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        className:
                          "font-semibold text-black group-hover:text-gray-700",
                        sx: {
                          fontSize: { xs: "0.9375rem", sm: "1rem" },
                        },
                      }}
                    />
                    <ChevronRight
                      className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        width: "clamp(16px, 3.5vw, 18px)",
                        height: "clamp(16px, 3.5vw, 18px)",
                      }}
                      strokeWidth={2.5}
                    />
                  </ListItemButton>
                </ListItem>
                {index === 3 && (
                  <Divider
                    sx={{
                      marginY: { xs: "8px", sm: "12px" },
                      borderColor: "rgba(0, 0, 0, 0.08)",
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </List>

        {/* Drawer Footer (Optional) */}
        <Box
          className="mt-auto border-t border-gray-200 bg-gray-50"
          sx={{
            padding: { xs: "16px", sm: "20px 24px" },
          }}
        >
          <Box className="text-center">
            <p
              className="text-gray-500"
              style={{
                fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
              }}
            >
              © 2025 Krambica. All rights reserved.
            </p>
          </Box>
        </Box>
      </Drawer>

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
