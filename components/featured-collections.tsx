"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const collections = [
  {
    id: 1,
    title: 'Kente Elegance',
    description: 'Traditional Kente patterns reimagined for contemporary fashion',
    image: '/images/Labi.jpg',
    itemCount: 24,
    featured: true
  },
  {
    id: 2,
    title: 'Ankara Fusion',
    description: 'Bold Ankara prints meet modern silhouettes',
    image: '/images/Ayo.jpg',
    itemCount: 32,
    featured: false
  },
  {
    id: 3,
    title: 'Mudcloth Modern',
    description: 'Authentic Malian mudcloth in contemporary designs',
    image: '/images/Rike.jpg',
    itemCount: 18,
    featured: false
  },
  {
    id: 4,
    title: 'Adinkra Stories',
    description: 'Symbolic Adinkra patterns telling ancient stories',
    image: '/images/Uche.jpg',
    itemCount: 28,
    featured: false
  }
];

export function FeaturedCollections() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold mb-6">
            Featured <span className="text-gradient">Collections</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections that celebrate the rich textile heritage 
            of Africa through contemporary design
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Featured Collection - Large */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:row-span-2"
          >
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
              <CardContent className="p-0 relative h-full min-h-[500px] lg:min-h-[640px]">
                <div className="absolute inset-0">
                  <Image
                    src={collections[0].image}
                    alt={collections[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-white"
                  >
                    <div className="inline-flex items-center px-3 py-1 rounded-full glassmorphism text-xs font-medium mb-4">
                      ✨ Featured Collection
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-playfair font-bold mb-3">
                      {collections[0].title}
                    </h3>
                    <p className="text-white/90 mb-4 text-lg">
                      {collections[0].description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/80">
                        {collections[0].itemCount} items
                      </span>
                      <Button 
                        variant="outline" 
                        className="glassmorphism border-white/30 text-white hover:bg-white/20 group"
                      >
                        Explore
                        <motion.div
                          className="ml-2"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Other Collections - Smaller */}
          <div className="space-y-8">
            {collections.slice(1).map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500">
                  <CardContent className="p-0 relative h-48">
                    <div className="absolute inset-0">
                      <Image
                        src={collection.image}
                        alt={collection.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
                    </div>
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="text-white">
                        <h3 className="text-xl font-playfair font-bold mb-2">
                          {collection.title}
                        </h3>
                        <p className="text-white/90 text-sm mb-3">
                          {collection.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/80">
                            {collection.itemCount} items
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="glassmorphism border-white/30 text-white hover:bg-white/20 group"
                          >
                            View
                            <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/shop">
            <Button 
              size="lg" 
              className="bg-gradient-luffi hover:opacity-90 text-white px-8 py-4 group"
            >
              View All Collections
              <motion.div
                className="ml-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}