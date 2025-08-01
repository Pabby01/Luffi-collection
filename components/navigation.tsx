/* eslint-disable react/jsx-no-undef */
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  ShoppingCart, 
  User, 
  Search,
  Heart,
  LogOut
} from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { CartSheet } from '@/components/cart-sheet';

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state: cartState } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glassmorphism border-b backdrop-blur-md' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-sm"
            >
              <Image
                src="/images/logo.jpg" 
                alt="Luffi Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative group"
              >
                <motion.span
                  className="text-foreground hover:text-primary transition-colors duration-200"
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                </motion.span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-luffi group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <CartSheet>
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <AnimatePresence>
                  {cartState.itemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Badge variant="destructive" className="h-5 w-5 text-xs p-0 flex items-center justify-center">
                        {cartState.itemCount}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </CartSheet>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="hidden sm:block text-sm">Hello, {user.name}</span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:ml-2 sm:block">Sign In</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-6">
                  <Link href="/" className="text-2xl font-playfair font-bold text-gradient">
                    Luffi
                  </Link>
                  
                  <div className="flex flex-col space-y-4">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="flex flex-col space-y-4 pt-6 border-t">
                    <Button variant="ghost" className="justify-start">
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <Heart className="h-5 w-5 mr-2" />
                      Wishlist
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}