'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Dialog,
  Box,
  IconButton,
  Typography,
  Avatar,
  Divider,
  Fade,
  Zoom
} from '@mui/material';
import { X, Package, Tag, Bell, Truck, CheckCircle, Clock } from 'lucide-react';

interface NotificationPopupProps {
  open: boolean;
  onClose: () => void;
}

interface Notification {
  id: string;
  type: 'order' | 'offer' | 'delivery' | 'general';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
  image?: string;
}

export default function NotificationPopup({ open, onClose }: NotificationPopupProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order #12345 has been confirmed and is being processed.',
      time: '5 mins ago',
      read: false,
      link: '/orders/12345'
    },
    {
      id: '2',
      type: 'delivery',
      title: 'Out for Delivery',
      message: 'Your order #12344 is out for delivery. Expected by 6 PM today.',
      time: '2 hours ago',
      read: false,
      link: '/orders/12344',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100'
    },
    {
      id: '3',
      type: 'offer',
      title: 'Flash Sale Alert! 🔥',
      message: 'Get up to 70% off on winter collection. Sale ends tonight!',
      time: '5 hours ago',
      read: true,
      link: '/sale'
    },
    {
      id: '4',
      type: 'general',
      title: 'Order Delivered',
      message: 'Your order #12343 has been delivered successfully.',
      time: '1 day ago',
      read: true,
      link: '/orders/12343'
    },
    {
      id: '5',
      type: 'offer',
      title: 'New Arrivals',
      message: 'Check out our latest collection of premium sneakers.',
      time: '2 days ago',
      read: true,
      link: '/new-arrivals',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100'
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-5 h-5" strokeWidth={2.5} />;
      case 'offer':
        return <Tag className="w-5 h-5" strokeWidth={2.5} />;
      case 'delivery':
        return <Truck className="w-5 h-5" strokeWidth={2.5} />;
      default:
        return <Bell className="w-5 h-5" strokeWidth={2.5} />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Zoom}
      transitionDuration={400}
      PaperProps={{
        className: 'rounded-3xl shadow-2xl m-4 overflow-hidden bg-white'
      }}
      BackdropProps={{
        className: 'backdrop-blur-sm bg-black/40'
      }}
    >
      <Box className="relative">
        {/* Header */}
        <Box className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-5">
          <Box className="flex items-center justify-between mb-3">
            <Box className="flex items-center gap-3">
              <Box className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" strokeWidth={2.5} />
              </Box>
              <Box>
                <Typography variant="h6" className="font-bold text-black">
                  Notifications
                </Typography>
                {unreadCount > 0 && (
                  <Typography className="text-xs text-gray-500">
                    {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                  </Typography>
                )}
              </Box>
            </Box>
            <IconButton
              onClick={onClose}
              className="text-gray-500 hover:text-black hover:bg-gray-100"
              size="small"
            >
              <X className="w-6 h-6" strokeWidth={2.5} />
            </IconButton>
          </Box>

          {/* Action Buttons */}
          {notifications.length > 0 && (
            <Box className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs font-semibold text-black hover:text-gray-600 transition-colors"
                >
                  Mark all as read
                </button>
              )}
              <button
                onClick={clearAll}
                className="text-xs font-semibold text-gray-500 hover:text-black transition-colors ml-auto"
              >
                Clear all
              </button>
            </Box>
          )}
        </Box>

        {/* Notifications List */}
        <Box className="max-h-[70vh] overflow-y-auto px-6 py-4">
          {notifications.length > 0 ? (
            <Box className="space-y-2">
              {notifications.map((notification, index) => (
                <Fade
                  key={notification.id}
                  in
                  timeout={300}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Box>
                    <Link
                      href={notification.link || '#'}
                      onClick={() => {
                        markAsRead(notification.id);
                        if (notification.link) onClose();
                      }}
                      className="block"
                    >
                      <Box className={`group flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer border ${
                        notification.read 
                          ? 'border-transparent hover:border-gray-200 hover:bg-gray-50' 
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}>
                        {/* Icon or Image */}
                        {notification.image ? (
                          <Avatar
                            src={notification.image}
                            alt={notification.title}
                            variant="rounded"
                            className="w-12 h-12 rounded-xl shadow-sm"
                            sx={{ width: 48, height: 48 }}
                          />
                        ) : (
                          <Box className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
                            notification.type === 'delivery' ? 'bg-green-100 text-green-600' :
                            notification.type === 'offer' ? 'bg-orange-100 text-orange-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {getIcon(notification.type)}
                          </Box>
                        )}

                        {/* Content */}
                        <Box className="flex-1 min-w-0">
                          <Box className="flex items-start justify-between gap-2 mb-1">
                            <Typography className={`font-semibold ${
                              notification.read ? 'text-gray-700' : 'text-black'
                            } line-clamp-1`}>
                              {notification.title}
                            </Typography>
                            {!notification.read && (
                              <Box className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-1.5" />
                            )}
                          </Box>
                          <Typography className="text-sm text-gray-500 line-clamp-2 mb-2">
                            {notification.message}
                          </Typography>
                          <Box className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-gray-400" strokeWidth={2.5} />
                            <Typography className="text-xs text-gray-400">
                              {notification.time}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Link>
                    {index < notifications.length - 1 && (
                      <Divider className="my-2" />
                    )}
                  </Box>
                </Fade>
              ))}
            </Box>
          ) : (
            <Fade in timeout={500}>
              <Box className="flex flex-col items-center justify-center py-20 text-center">
                <Box className="w-20 h-20 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-gray-300" strokeWidth={2} />
                </Box>
                <Typography variant="h6" className="font-semibold text-black mb-2">
                  All caught up!
                </Typography>
                <Typography className="text-sm text-gray-500">
                  You have no new notifications
                </Typography>
              </Box>
            </Fade>
          )}
        </Box>

        {/* Footer */}
        {notifications.length > 0 && (
          <Box className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
            <Link href="/notifications" onClick={onClose}>
              <Box className="p-3 rounded-2xl bg-black hover:bg-gray-800 transition-all duration-300 text-center cursor-pointer">
                <Typography className="text-white font-semibold text-sm">
                  View All Notifications
                </Typography>
              </Box>
            </Link>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
