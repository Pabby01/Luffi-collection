"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Gift, Star, Users } from 'lucide-react';
import { toast } from 'sonner';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Successfully subscribed to our newsletter!');
    setEmail('');
    setIsLoading(false);
  };

  const benefits = [
    { icon: Gift, text: 'Exclusive offers & early access' },
    { icon: Star, text: 'Style tips & cultural stories' },
    { icon: Users, text: 'Community events & workshops' }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/5 via-background to-primary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="glassmorphism border-0 shadow-2xl">
            <CardContent className="p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className="text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-luffi rounded-full mb-4">
                      <Mail className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-playfair font-bold mb-4">
                      Join the{' '}
                      <span className="text-gradient">Luffi</span>{' '}
                      Community
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      Be the first to discover new collections, get styling tips, 
                      and learn about the artisans behind our beautiful pieces.
                    </p>
                  </motion.div>

                  {/* Benefits */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-3 mb-8"
                  >
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center justify-center lg:justify-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <benefit.icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">{benefit.text}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Newsletter Form */}
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 h-12"
                      required
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="bg-gradient-luffi hover:opacity-90 text-white px-8 h-12"
                    >
                      {isLoading ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                  </motion.form>

                  <p className="text-xs text-muted-foreground mt-3">
                    By subscribing, you agree to our privacy policy. Unsubscribe at any time.
                  </p>
                </div>

                {/* Visual Element */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative hidden lg:block"
                >
                  <div className="relative w-full h-80 rounded-2xl overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('/images/Artboard 1.jpg')`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Floating Stats */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="absolute top-6 right-6 glassmorphism rounded-xl p-3"
                    >
                      <div className="text-center text-white">
                        <div className="text-lg font-bold">10K+</div>
                        <div className="text-xs opacity-90">Subscribers</div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1 }}
                      className="absolute bottom-6 left-6 glassmorphism rounded-xl p-3"
                    >
                      <div className="text-center text-white">
                        <div className="text-lg font-bold">Weekly</div>
                        <div className="text-xs opacity-90">Stories</div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}