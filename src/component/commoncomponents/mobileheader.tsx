"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
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
  Collapse,
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
  ChevronDown,
  LogIn,
  ArrowRight,
} from "lucide-react";
import SearchPopup from "./search";
import NotificationPopup from "./notifications";

interface MobileHeaderProps {
  wishlistCount?: number;
  notificationCount?: number;
}

interface Category {
  name: string;
  slug: string;
}

export default function MobileHeader({
  wishlistCount = 0,
  notificationCount = 0,
}: MobileHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // State to toggle the Collection accordion
  const [collectionOpen, setCollectionOpen] = useState(false);

  // State for Dynamic Categories
  const [categories, setCategories] = useState<Category[]>([]);

  const router = useRouter();

  // ==========================================
  // FETCH CATEGORIES
  // ==========================================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DUMMY}/api/categories`
        );
        const json = await response.json();

        // Check structure: { status: "success", data: { data: [...] } }
        if (
          json.status === "success" &&
          json.data &&
          Array.isArray(json.data.data)
        ) {
          const mappedData = json.data.data.map((item: any) => ({
            name: item.name,
            slug: item.slug,
          }));
          setCategories(mappedData);
        }
      } catch (error) {
        console.error("Failed to fetch mobile categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  // Main Menu Items
  const menuItems = [
    { text: "Home", icon: Home, href: "/home" },
    { text: "Shop", icon: Store, href: "/shop" },
    { text: "Collection", icon: Layers, href: "#" }, // Acts as toggle
    { text: "Offer", icon: Tag, href: "/offer" },
    { text: "About", icon: Info, href: "/about" },
    { text: "Contact", icon: Mail, href: "/contact" },
    { text: "My Account", icon: UserCircle, href: "/profile" },
    { text: "Logout", icon: UserCircle, href: null },
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
            <IconButton
              onClick={handleLogin}
              className="hover:bg-gray-100 transition-all"
              aria-label="Login"
            >
              <LogIn className="w-5 h-5 text-black" strokeWidth={2} />
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
          {menuItems.map((item) => {
            const IconComponent = item.icon;

            // 1. LOGOUT Logic
            if (item.text === "Logout") {
              return (
                <React.Fragment key={item.text}>
                  <ListItem
                    disablePadding
                    sx={{ marginBottom: { xs: "2px", sm: "4px" } }}
                  >
                    <ListItemButton
                      onClick={handleLogout}
                      className="text-black hover:bg-gray-100 active:bg-gray-200 transition-all rounded-xl group"
                      sx={{
                        padding: { xs: "12px 16px", sm: "14px 16px" },
                        borderRadius: "12px",
                      }}
                    >
                      <ListItemIcon
                        className="text-black group-hover:text-gray-700 transition-colors"
                        sx={{ minWidth: { xs: "36px", sm: "40px" } }}
                      >
                        <IconComponent
                          style={{ width: "20px", height: "20px" }}
                          strokeWidth={2.5}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          className:
                            "font-semibold text-black group-hover:text-gray-700",
                          sx: { fontSize: "1rem" },
                        }}
                      />
                      <ChevronRight
                        className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ width: "18px", height: "18px" }}
                        strokeWidth={2.5}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider
                    sx={{ marginY: "12px", borderColor: "rgba(0, 0, 0, 0.08)" }}
                  />
                </React.Fragment>
              );
            }

            // 2. COLLECTION LOGIC (Accordion)
            if (item.text === "Collection") {
              return (
                <React.Fragment key={item.text}>
                  <ListItem disablePadding sx={{ marginBottom: "4px" }}>
                    <ListItemButton
                      onClick={() => setCollectionOpen(!collectionOpen)} // Toggle state
                      className={`text-black transition-all rounded-xl group ${
                        collectionOpen ? "bg-gray-50" : "hover:bg-gray-100"
                      }`}
                      sx={{
                        padding: { xs: "12px 16px", sm: "14px 16px" },
                        borderRadius: "12px",
                      }}
                    >
                      <ListItemIcon
                        className="text-black transition-colors"
                        sx={{ minWidth: { xs: "36px", sm: "40px" } }}
                      >
                        <IconComponent
                          style={{ width: "20px", height: "20px" }}
                          strokeWidth={2.5}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          className: "font-semibold text-black",
                          sx: { fontSize: "1rem" },
                        }}
                      />
                      {/* Chevron rotates based on open state */}
                      {collectionOpen ? (
                        <ChevronDown
                          className="text-gray-600"
                          style={{ width: "18px", height: "18px" }}
                          strokeWidth={2.5}
                        />
                      ) : (
                        <ChevronRight
                          className="text-gray-400"
                          style={{ width: "18px", height: "18px" }}
                          strokeWidth={2.5}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>

                  {/* DYNAMIC SUB-MENU ITEMS */}
                  <Collapse in={collectionOpen} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      sx={{ paddingLeft: "16px", marginBottom: "8px" }}
                    >
                      {/* Dynamic Categories Mapping */}
                      {categories.map((cat, idx) => (
                        <ListItemButton
                          key={idx}
                          component={Link}
                          href={`/shop/${cat.slug}`}
                          onClick={() => setDrawerOpen(false)} // Close drawer on click
                          sx={{
                            pl: 4,
                            borderRadius: "10px",
                            marginY: "2px",
                            "&:hover": { backgroundColor: "#f9fafb" },
                          }}
                        >
                          {/* Dot indicator */}
                          <ListItemIcon sx={{ minWidth: "24px" }}>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                          </ListItemIcon>
                          <ListItemText
                            primary={cat.name}
                            primaryTypographyProps={{
                              fontSize: "0.9rem",
                              fontWeight: 500,
                              color: "#4b5563",
                              textTransform: "capitalize",
                            }}
                          />
                        </ListItemButton>
                      ))}

                      {/* Fallback/Empty State */}
                      {categories.length === 0 && (
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText
                            primary="Loading categories..."
                            primaryTypographyProps={{
                              fontSize: "0.8rem",
                              color: "#9ca3af",
                            }}
                          />
                        </ListItemButton>
                      )}

                      {/* "View All" Link at bottom */}
                      <ListItemButton
                        component={Link}
                        href="/shop"
                        onClick={() => setDrawerOpen(false)}
                        sx={{
                          pl: 4,
                          borderRadius: "10px",
                          marginY: "2px",
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: "24px" }}>
                          <ArrowRight size={14} className="text-gray-400" />
                        </ListItemIcon>
                        <ListItemText
                          primary="View All Products"
                          primaryTypographyProps={{
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            color: "#000000",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                          }}
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            }

            // 3. STANDARD LOGIC
            return (
              <React.Fragment key={item.text}>
                <ListItem
                  disablePadding
                  sx={{ marginBottom: { xs: "2px", sm: "4px" } }}
                >
                  <ListItemButton
                    component={Link}
                    href={item.href || "#"}
                    onClick={() => setDrawerOpen(false)}
                    className="text-black hover:bg-gray-100 active:bg-gray-200 transition-all rounded-xl group"
                    sx={{
                      padding: { xs: "12px 16px", sm: "14px 16px" },
                      borderRadius: "12px",
                    }}
                  >
                    <ListItemIcon
                      className="text-black group-hover:text-gray-700 transition-colors"
                      sx={{ minWidth: { xs: "36px", sm: "40px" } }}
                    >
                      <IconComponent
                        style={{ width: "20px", height: "20px" }}
                        strokeWidth={2.5}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        className:
                          "font-semibold text-black group-hover:text-gray-700",
                        sx: { fontSize: "1rem" },
                      }}
                    />
                    <ChevronRight
                      className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ width: "18px", height: "18px" }}
                      strokeWidth={2.5}
                    />
                  </ListItemButton>
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>

        {/* Drawer Footer */}
        <Box
          className="mt-auto border-t border-gray-200 bg-gray-50"
          sx={{
            padding: { xs: "16px", sm: "20px 24px" },
          }}
        >
          <Box className="text-center">
            <p className="text-gray-500" style={{ fontSize: "0.875rem" }}>
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
