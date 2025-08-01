"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Leaf, Award, Heart } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import Image from 'next/image';

const values = [
  {
    icon: Users,
    title: 'Community First',
    description: 'Supporting local artisans and preserving traditional techniques'
  },
  {
    icon: Leaf,
    title: 'Sustainable Luxury',
    description: 'Ethically sourced materials and eco-friendly production'
  },
  {
    icon: Award,
    title: 'Quality Craftsmanship',
    description: 'Each piece is meticulously crafted with attention to detail'
  },
  {
    icon: Heart,
    title: 'Cultural Heritage',
    description: 'Celebrating African textile traditions in modern designs'
  }
];

export function CraftsmanshipStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:pr-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <Badge variant="outline" className="mb-4">
                Our Story
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold mb-6">
                Crafting{' '}
                <span className="text-gradient">Tomorrow</span>
                <br />
                with{' '}
                <span className="text-gradient">Tradition</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Luffi was born from a vision to bridge the gap between ancient African 
                textile traditions and contemporary fashion. We work directly with skilled 
                artisans across the continent, ensuring that every thread tells a story 
                of heritage, sustainability, and innovation.
              </p>
            </motion.div>

            {/* Values Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-luffi rounded-lg flex items-center justify-center">
                    <value.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Link href="/about">
                <Button className="bg-gradient-luffi hover:opacity-90 text-white group">
                  Learn Our Story
                  <motion.div
                    className="ml-2"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Section with Parallax */}
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image */}
              <div className="col-span-2 relative h-64 rounded-2xl overflow-hidden">
                <Image
                  src="/images/Artboard 1-1.jpg"
                  alt="African artisan working"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Master Weaver</p>
                  <p className="text-xs opacity-90">Kente Tradition</p>
                </div>
              </div>

              {/* Small Images */}
              <div className="relative h-32 rounded-xl overflow-hidden">
                <Image
                  src="/images/Artboard 1.jpg"
                  alt="Traditional textile patterns"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 rounded-xl overflow-hidden">
                <Image
                  src="/images/Artboard 2.jpg"
                  alt="Handwoven fabric"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-6 glassmorphism rounded-2xl p-4 text-center"
            >
              <div className="text-2xl font-bold font-playfair text-gradient">500+</div>
              <div className="text-xs text-muted-foreground">Artisans</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 glassmorphism rounded-2xl p-4 text-center"
            >
              <div className="text-2xl font-bold font-playfair text-gradient">15+</div>
              <div className="text-xs text-muted-foreground">Countries</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}