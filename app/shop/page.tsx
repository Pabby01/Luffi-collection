"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  Filter, 
  Search, 
  Grid3x3, 
  List, 
  Heart, 
  ShoppingCart, 
  Eye, 
  Star,
  SlidersHorizontal
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/cart-context';
import { toast } from 'sonner';

// Mock product data
const products = [
  {
    id: '1',
    name: 'Kente Silk Dress',
    price: 299,
    originalPrice: 399,
    category: 'Dresses',
    material: 'Kente Silk',
    size: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Red', 'Blue', 'Gold'],
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isSale: true,
    description: 'Beautiful handwoven Kente silk dress with traditional patterns'
  },
  {
    id: '2',
    name: 'Ankara Print Blazer',
    price: 199,
    category: 'Outerwear',
    material: 'Ankara Cotton',
    size: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Orange', 'Purple', 'Green'],
    image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/7679668/pexels-photo-7679668.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.9,
    reviews: 89,
    isNew: false,
    isSale: false,
    description: 'Contemporary blazer featuring vibrant Ankara prints'
  },
  // Add more products...
  {
    id: '3',
    name: 'Mudcloth Wide Pants',
    price: 159,
    category: 'Pants',
    material: 'Mudcloth',
    size: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Brown', 'Black', 'Cream'],
    image: 'https://images.pexels.com/photos/7679668/pexels-photo-7679668.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/7679668/pexels-photo-7679668.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.7,
    reviews: 56,
    isNew: true,
    isSale: false,
    description: 'Comfortable wide-leg pants made from authentic mudcloth'
  },
  {
    id: '4',
    name: 'Adinkra Symbol Necklace',
    price: 79,
    category: 'Accessories',
    material: 'Brass',
    size: ['One Size'],
    colors: ['Gold', 'Silver'],
    image: 'https://images.pexels.com/photos/8849298/pexels-photo-8849298.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/8849298/pexels-photo-8849298.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 5.0,
    reviews: 203,
    isNew: false,
    isSale: false,
    description: 'Handcrafted necklace featuring traditional Adinkra symbols'
  }
];

const categories = ['All', 'Dresses', 'Outerwear', 'Pants', 'Accessories'];
const materials = ['All', 'Kente Silk', 'Ankara Cotton', 'Mudcloth', 'Brass'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' }
];

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('featured');
  const [showOnSale, setShowOnSale] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const { addItem } = useCart();

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesMaterial = selectedMaterial === 'All' || product.material === selectedMaterial;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSale = !showOnSale || product.isSale;
      const matchesNew = !showNew || product.isNew;

      return matchesSearch && matchesCategory && matchesMaterial && matchesPrice && matchesSale && matchesNew;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order for featured
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedMaterial, priceRange, sortBy, showOnSale, showNew]);

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

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="w-full justify-start"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div>
        <h3 className="font-semibold mb-3">Materials</h3>
        <div className="space-y-2">
          {materials.map(material => (
            <Button
              key={material}
              variant={selectedMaterial === material ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedMaterial(material)}
              className="w-full justify-start"
            >
              {material}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={500}
            min={0}
            step={10}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div>
        <h3 className="font-semibold mb-3">Filters</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="on-sale"
              checked={showOnSale}
              onCheckedChange={setShowOnSale}
            />
            <label htmlFor="on-sale" className="text-sm">On Sale</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="new-arrivals"
              checked={showNew}
              onCheckedChange={setShowNew}
            />
            <label htmlFor="new-arrivals" className="text-sm">New Arrivals</label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-r from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold mb-4">
              Shop <span className="text-gradient">Collection</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated selection of contemporary African fashion
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <Card className="p-6">
              <h2 className="font-semibold text-lg mb-6">Filters</h2>
              <FilterContent />
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex gap-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredAndSortedProducts.length} of {products.length} products
              </p>
            </div>

            {/* Products Grid */}
            <AnimatePresence mode="popLayout">
              <motion.div 
                layout
                className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}
              >
                {filteredAndSortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onHoverStart={() => setHoveredProduct(product.id)}
                    onHoverEnd={() => setHoveredProduct(null)}
                    className="group"
                  >
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500">
                      <CardContent className="p-0">
                        {viewMode === 'grid' ? (
                          <>
                            {/* Grid View */}
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
                              
                              <p className="text-sm text-muted-foreground mb-3">
                                {product.description}
                              </p>
                              
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-bold">${product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-muted-foreground line-through">
                                    ${product.originalPrice}
                                  </span>
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* List View */}
                            <div className="flex gap-6 p-6">
                              <div className="relative w-32 h-32 shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                                {/* Badges */}
                                <div className="absolute top-2 left-2 flex flex-col gap-1">
                                  {product.isNew && (
                                    <Badge className="bg-tech-blue text-white text-xs">New</Badge>
                                  )}
                                  {product.isSale && (
                                    <Badge className="bg-destructive text-white text-xs">Sale</Badge>
                                  )}
                                </div>
                              </div>

                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                    <div className="flex items-center gap-1 mb-2">
                                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                                      <span className="text-sm text-muted-foreground">
                                        {product.rating} ({product.reviews})
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-xl font-bold">${product.price}</span>
                                      {product.originalPrice && (
                                        <span className="text-muted-foreground line-through">
                                          ${product.originalPrice}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                <p className="text-muted-foreground mb-4">
                                  {product.description}
                                </p>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>Material: {product.material}</span>
                                    <span>•</span>
                                    <span>{product.colors.length} colors</span>
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                    >
                                      <Heart className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      onClick={() => handleAddToCart(product)}
                                      className="bg-gradient-luffi hover:opacity-90 text-white"
                                    >
                                      <ShoppingCart className="h-4 w-4 mr-2" />
                                      Add to Cart
                                    </Button>
                                    <Link href={`/product/${product.id}`}>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                      >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* No Results */}
            {filteredAndSortedProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedMaterial('All');
                    setShowOnSale(false);
                    setShowNew(false);
                    setPriceRange([0, 500]);
                  }}
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}