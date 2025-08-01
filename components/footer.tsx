"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from 'lucide-react';

const footerSections = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', href: '/shop?filter=new' },
      { label: 'Women', href: '/shop?category=women' },
      { label: 'Men', href: '/shop?category=men' },
      { label: 'Accessories', href: '/shop?category=accessories' },
      { label: 'Sale', href: '/shop?filter=sale' },
    ]
  },
  {
    title: 'About',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Artisans', href: '/artisans' },
      { label: 'Materials', href: '/materials' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Press', href: '/press' },
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Size Guide', href: '/size-guide' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'FAQ', href: '/faq' },
    ]
  }
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <Link href="/" className="inline-block mb-6">
                <span className="text-3xl font-playfair font-bold text-gradient">
                  Luffi
                </span>
              </Link>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Contemporary African fashion that celebrates heritage, 
                craftsmanship, and sustainable luxury for the modern world.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>hello@luffi.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Abeokuta, Nigeria</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="sm"
                    className="w-10 h-10 p-0 hover:bg-primary hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <Link href={social.href} aria-label={social.label}>
                      <social.icon className="h-4 w-4" />
                    </Link>
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-lg mb-6">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Luffi. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <Link 
                href="/privacy" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}