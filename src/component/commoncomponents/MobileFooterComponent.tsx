"use client";

import React from "react";
import Link from "next/link";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, Store, ShoppingCart, Layers, UserCircle } from "lucide-react";

interface MobileBottomNavProps {
  currentPath?: string;
}

export default function MobileBottomNav({
  currentPath = "/",
}: MobileBottomNavProps) {
  const [value, setValue] = React.useState(currentPath);

  const navItems = [
    { label: "Home", value: "/home", Icon: Home },
    { label: "Shop", value: "/shop", Icon: Store },
    { label: "Cart", value: "/cart", Icon: ShoppingCart },
    { label: "Offers", value: "/offer", Icon: Layers },
    { label: "Profile", value: "/profile", Icon: UserCircle },
  ];

  return (
    <Paper
      component="nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t-2 border-gray-200 shadow-lg safe-area-bottom"
      elevation={8}
      sx={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        borderRadius: 0,
        backgroundColor: "#ffffff",
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        showLabels
        className="bg-white py-2"
        sx={{
          height: "auto",
          "& .MuiBottomNavigationAction-root": {
            minWidth: "60px",
            padding: "4px 8px",
          },
        }}
      >
        {navItems.map((item) => {
          const IconComponent = item.Icon;
          const isActive = value === item.value;

          return (
            <BottomNavigationAction
              key={item.value}
              label={item.label}
              value={item.value}
              icon={
                <IconComponent
                  className={`w-6 h-6 ${
                    isActive ? "text-[#2E6A64]" : "text-gray-600"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              }
              component={Link}
              href={item.value}
              className={`min-w-[60px] transition-all duration-300 ${
                isActive ? "text-[#2E6A64]" : "text-gray-600"
              }`}
              sx={{
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "10px",
                  fontWeight: 600,
                  marginTop: "4px",
                  color: isActive ? "#2E6A64" : "#6b7280",
                },
                "&.Mui-selected": {
                  color: "#2E6A64",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
            />
          );
        })}
      </BottomNavigation>
    </Paper>
  );
}
