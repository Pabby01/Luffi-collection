"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  
  const { login, register } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(loginData.email, loginData.password);
      if (success) {
        toast.success('Welcome back!');
        router.push('/');
      } else {
        toast.error('Invalid credentials. Try admin@luffi.com / admin123');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(registerData.email, registerData.password, registerData.name);
      if (success) {
        toast.success('Account created successfully!');
        router.push('/');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Background */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-muted/30 via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-5" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl sm:text-4xl font-playfair font-bold mb-4">
                Welcome to{' '}
                <span className="text-gradient">Luffi</span>
              </h1>
              <p className="text-muted-foreground">
                Join our community of fashion enthusiasts who appreciate authentic African craftsmanship
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="glassmorphism shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-center">Get Started</CardTitle>
                  <CardDescription className="text-center">
                    Sign in to your account or create a new one
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Sign In</TabsTrigger>
                      <TabsTrigger value="register">Sign Up</TabsTrigger>
                    </TabsList>

                    {/* Login Tab */}
                    <TabsContent value="login" className="space-y-4 mt-6">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="login-email"
                              type="email"
                              placeholder="your@email.com"
                              value={loginData.email}
                              onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="login-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="login-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              value={loginData.password}
                              onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                              className="pl-10 pr-10"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-luffi hover:opacity-90 text-white"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Signing In...' : 'Sign In'}
                        </Button>
                      </form>

                      <div className="text-center">
                        <Button variant="link" className="text-sm text-muted-foreground">
                          Forgot your password?
                        </Button>
                      </div>

                     
                    </TabsContent>

                    {/* Register Tab */}
                    <TabsContent value="register" className="space-y-4 mt-6">
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="register-name"
                              type="text"
                              placeholder="Your full name"
                              value={registerData.name}
                              onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="register-email"
                              type="email"
                              placeholder="your@email.com"
                              value={registerData.email}
                              onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="register-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a password"
                              value={registerData.password}
                              onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                              className="pl-10 pr-10"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-confirm-password">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="register-confirm-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              value={registerData.confirmPassword}
                              onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-luffi hover:opacity-90 text-white"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                      </form>

                      <p className="text-xs text-center text-muted-foreground">
                        By creating an account, you agree to our{' '}
                        <Button variant="link" className="p-0 h-auto text-xs">
                          Terms of Service
                        </Button>{' '}
                        and{' '}
                        <Button variant="link" className="p-0 h-auto text-xs">
                          Privacy Policy
                        </Button>
                      </p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}