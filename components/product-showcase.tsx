"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/cart-context';
import { toast } from 'sonner';

const categories = ['All', 'Dresses', 'Shirts', 'Pants', 'Accessories'];

const products = [
  {
    id: '1',
    name: 'Kente Silk Dress',
    price: 299,
    originalPrice: 399,
    category: 'Dresses',
    image: '/images/Artboard 2.jpg',
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isSale: true
  },
  {
    id: '2',
    name: 'Ankara Print Blazer',
    price: 199,
    category: 'Shirts',
    image: '/images/Artboard 3-1.jpg',
    rating: 4.9,
    reviews: 89,
    isNew: false,
    isSale: false
  },
  {
    id: '3',
    name: 'Mudcloth Wide Pants',
    price: 159,
    category: 'Pants',
    image: '/images/Artboard 3.jpg',
    rating: 4.7,
    reviews: 56,
    isNew: true,
    isSale: false
  },
  {
    id: '4',
    name: 'Adinkra Symbol Necklace',
    price: 79,
    category: 'Accessories',
    image: '/images/Uche.jpg',
    rating: 5.0,
    reviews: 203,
    isNew: false,
    isSale: false
  },
  {
    id: '5',
    name: 'Traditional Wrap Top',
    price: 129,
    originalPrice: 179,
    category: 'Shirts',
    image: '/images/Kemi.jpg',
    rating: 4.6,
    reviews: 78,
    isNew: false,
    isSale: true
  },
  {
    id: '6',
    name: 'Bogolan Maxi Dress',
    price: 249,
    category: 'Dresses',
    image: '/images/Ayo.jpg',
    rating: 4.8,
    reviews: 134,
    isNew: true,
    isSale: false
  }
];

export function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const { addItem } = useCart();

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold mb-6">
            Featured <span className="text-gradient">Products</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover our handpicked selection of contemporary African fashion pieces
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={`transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-gradient-luffi text-white' 
                    : 'hover:bg-muted'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isNew && (
                          <Badge className="bg-tech-blue text-white">New</Badge>
                        )}
                        {product.isSale && (
                          <Badge className="bg-destructive text-white">Sale</Badge>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <AnimatePresence>
                        {hoveredProduct === product.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-black/40 flex items-center justify-center"
                          >
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="glassmorphism border-white/30 text-white hover:bg-white/20"
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleAddToCart(product)}
                                className="bg-gradient-luffi hover:opacity-90 text-white"
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add
                              </Button>
                              <Link href={`/product/${product.id}`}>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="glassmorphism border-white/30 text-white hover:bg-white/20"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                          <span className="text-sm text-muted-foreground ml-1">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/shop">
            <Button size="lg" className="bg-gradient-luffi hover:opacity-90 text-white px-8">
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}