"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Minus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import Link from 'next/link';
import Image from 'next/image';

interface CartSheetProps {
  children: React.ReactNode;
}

export function CartSheet({ children }: CartSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { state, removeItem, updateQuantity } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart
            {state.itemCount > 0 && (
              <Badge variant="secondary">{state.itemCount}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <ScrollArea className="flex-1 -mx-6 px-6">
            <AnimatePresence mode="popLayout">
              {state.items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center h-64 text-center"
                >
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-muted-foreground mb-2">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Discover our beautiful collection
                  </p>
                  <Link href="/shop" onClick={() => setIsOpen(false)}>
                    <Button>Start Shopping</Button>
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-4 py-4">
                  {state.items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      layout
                      className="flex gap-4 py-4 border-b last:border-b-0"
                    >
                      <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                            {(item.size || item.color) && (
                              <p className="text-xs text-muted-foreground">
                                {item.size && `Size: ${item.size}`}
                                {item.size && item.color && ' • '}
                                {item.color && `Color: ${item.color}`}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>

          {state.items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t pt-4 space-y-4"
            >
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gradient-luffi hover:opacity-90">
                    Checkout
                  </Button>
                </Link>
                <Link href="/cart" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    View Cart
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}