"use client";

import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Button,
} from "@mui/material";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  LogIn,
  LogOut,
  ChevronDown,
  ArrowRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import SearchPopup from "./search";

interface HeaderProps {
  cartCount?: number;
  wishlistCount?: number;
  notificationCount?: number;
  isLoggedIn?: boolean;
}

interface DisplayCategory {
  title: string;
  img: string;
  link: string;
}

export default function Header({
  cartCount = 0,
  wishlistCount = 0,
  notificationCount = 0,
  isLoggedIn = false,
}: HeaderProps) {
  // UI States
  const [searchOpen, setSearchOpen] = useState(false);
  const [collectionHovered, setCollectionHovered] = useState(false);
  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(
    null
  );

  // Data States
  const [categories, setCategories] = useState<DisplayCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const accountMenuOpen = Boolean(accountAnchorEl);

  // ==========================================
  // FETCH FUNCTION WITH ERROR HANDLING
  // ==========================================
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null); // Reset error state before fetching

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DUMMY}/api/categories`
      );

      // 1. HTTP Error Handling
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const json = await response.json();

      // 2. Data Structure Validation
      if (
        json.status === "success" &&
        json.data &&
        Array.isArray(json.data.data)
      ) {
        const mappedData = json.data.data.map((item: any) => ({
          title: item.name,
          img: item.cat_img, // Maps 'cat_img' from API to 'img' for UI
          link: `/collections/${item?.category_id}`, // Maps 'slug' to link
        }));
        setCategories(mappedData);
      } else {
        // Handle unexpected JSON structure
        throw new Error("Invalid data format received from server");
      }
    } catch (err: any) {
      console.error("Failed to fetch categories:", err);
      setError(err.message || "Something went wrong while loading categories.");
      setCategories([]); // Clear potentially stale data
    } finally {
      setIsLoading(false);
    }
  };

  // Initial Fetch
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handlers
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
          backgroundColor: "white",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar className="flex justify-between items-center py-5">
            <div className="w-32 lg:w-40"></div>

            {/* Logo */}
            <Link href="/home" className="flex-shrink-0">
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-10 lg:w-48 lg:h-12">
                  <NextImage
                    src="/logo9.png"
                    alt="Krambica®"
                    height={300}
                    width={300}
                    priority
                  />
                </div>
              </div>
            </Link>

            {/* Right Icons */}
            <div className="flex items-center space-x-2">
              <IconButton
                onClick={() => setSearchOpen(true)}
                className="hover:bg-gray-50 transition-all text-gray-600"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </IconButton>

              <IconButton
                onClick={handleAccountClick}
                className="hover:bg-gray-50 transition-all text-gray-600"
              >
                <User className="w-5 h-5" strokeWidth={1.5} />
              </IconButton>

              <IconButton
                component={Link}
                href="/wishlist"
                className="hover:bg-gray-50 transition-all text-gray-600"
              >
                <Badge
                  badgeContent={wishlistCount}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#4b5563",
                      color: "white",
                    },
                  }}
                >
                  <Heart className="w-5 h-5" strokeWidth={1.5} />
                </Badge>
              </IconButton>

              <IconButton
                component={Link}
                href="/cart"
                className="hover:bg-gray-50 transition-all text-gray-600"
              >
                <Badge
                  badgeContent={cartCount}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#4b5563",
                      color: "white",
                    },
                  }}
                >
                  <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                </Badge>
              </IconButton>

              <IconButton
                onClick={handleLogin}
                className="hover:bg-gray-50 transition-all text-gray-600"
              >
                <LogIn className="w-5 h-5" strokeWidth={1.5} />
              </IconButton>
            </div>
          </Toolbar>
        </Container>

        {/* Navigation Menu */}
        <Box
          sx={{
            backgroundColor: "white",
            width: "100%",
            borderTop: "1px solid #f9fafb",
            borderBottom: "1px solid #f3f4f6",
            position: "relative",
          }}
        >
          <Box sx={{ maxWidth: "xl", margin: "0 auto" }}>
            <nav className="flex justify-center items-center space-x-10 px-4 relative">
              {["Home", "Shop", "Collection", "Offer", "About", "Contact"].map(
                (item) => {
                  if (item === "Collection") {
                    return (
                      <div
                        key={item}
                        onMouseEnter={() => setCollectionHovered(true)}
                        onMouseLeave={() => setCollectionHovered(false)}
                        className="py-4"
                      >
                        <Link
                          href="/collection"
                          className={`text-sm font-medium uppercase tracking-[0.2em] transition-colors flex items-center gap-1 cursor-pointer ${
                            collectionHovered
                              ? "text-black"
                              : "text-gray-600 hover:text-black"
                          }`}
                        >
                          {item}
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-300 ${
                              collectionHovered ? "rotate-180" : ""
                            }`}
                          />
                        </Link>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={item}
                      href={`/${item.toLowerCase()}`}
                      className="text-sm font-medium uppercase tracking-[0.2em] text-gray-600 hover:text-black transition-colors py-4"
                    >
                      {item}
                    </Link>
                  );
                }
              )}
            </nav>
          </Box>

          {/* Collection Mega Menu */}
          <div
            onMouseEnter={() => setCollectionHovered(true)}
            onMouseLeave={() => setCollectionHovered(false)}
            className={`absolute left-0 w-full bg-white border-b border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${
              collectionHovered
                ? "max-h-[600px] opacity-100 top-full visible"
                : "max-h-0 opacity-0 top-[90%] invisible"
            }`}
            style={{ zIndex: 50 }}
          >
            <Container maxWidth="xl" className="py-12">
              <div className="grid grid-cols-12 gap-12">
                {/* Left Sidebar */}
                <div className="col-span-3 border-r border-gray-50 pr-8">
                  <h3 className="font-serif text-2xl text-gray-900 mb-8">
                    Browse Category
                  </h3>
                  <ul className="space-y-5">
                    {[
                      "New Arrivals",
                      "Best Sellers",
                      "Cotton Kurtis",
                      "Silk Suits",
                      "Dupattas",
                      "Bottom Wear",
                    ].map((link) => (
                      <li key={link}>
                        <Link
                          href="/shop"
                          className="text-sm text-gray-500 hover:text-gray-900 hover:translate-x-1 transition-all block font-medium"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 pt-8 border-t border-gray-50">
                    <Link
                      href="/shop"
                      className="text-xs font-bold uppercase tracking-widest text-gray-900 flex items-center gap-2 group"
                    >
                      View All Products{" "}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>

                {/* Right Content: Dynamic Categories */}
                <div className="col-span-9 pl-4">
                  {/* 1. LOADING STATE */}
                  {isLoading && (
                    <div className="w-full h-64 flex flex-col items-center justify-center text-gray-400">
                      <CircularProgress color="inherit" size={30} />
                      <span className="mt-4 text-xs font-medium uppercase tracking-widest">
                        Loading Collections...
                      </span>
                    </div>
                  )}

                  {/* 2. ERROR STATE */}
                  {!isLoading && error && (
                    <div className="w-full h-64 flex flex-col items-center justify-center text-red-500">
                      <AlertCircle size={32} className="mb-2" />
                      <p className="text-sm font-medium mb-4">{error}</p>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<RefreshCw size={14} />}
                        onClick={fetchCategories}
                        sx={{ fontSize: "0.75rem" }}
                      >
                        Retry
                      </Button>
                    </div>
                  )}

                  {/* 3. SUCCESS STATE (Display Data) */}
                  {!isLoading && !error && categories.length > 0 && (
                    <div className="grid grid-cols-4 gap-x-8 gap-y-8 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                      {categories.map((col, idx) => (
                        <Link
                          href={col.link}
                          key={idx}
                          className="group block relative"
                        >
                          <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-50 mb-3 relative border border-gray-100">
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10" />
                            <img
                              src={col.img}
                              alt={col.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://via.placeholder.com/300x400?text=No+Image";
                              }}
                            />
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide group-hover:text-gray-600 transition-colors text-center">
                            {col.title}
                          </h4>
                          <div className="w-8 h-[1px] bg-gray-200 mx-auto mt-2 group-hover:w-16 group-hover:bg-gray-400 transition-all duration-300" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* 4. EMPTY STATE */}
                  {!isLoading && !error && categories.length === 0 && (
                    <div className="w-full h-64 flex items-center justify-center text-gray-500">
                      <p>No collections found.</p>
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </div>
        </Box>
      </AppBar>

      <Menu
        id="account-menu"
        anchorEl={accountAnchorEl}
        open={accountMenuOpen}
        onClose={handleAccountClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 180,
            boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
            borderRadius: "8px",
            border: "1px solid #f3f4f6",
          },
        }}
      >
        <MenuItem
          onClick={handleProfile}
          className="text-gray-600 text-sm py-2"
        >
          <User className="w-4 h-4 mr-3" /> Profile
        </MenuItem>
        <MenuItem onClick={handleLogout} className="text-gray-600 text-sm py-2">
          <LogOut className="w-4 h-4 mr-3" /> Logout
        </MenuItem>
      </Menu>

      <SearchPopup open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
