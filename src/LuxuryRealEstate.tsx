import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Calendar,
  Sparkles,
  Search,
  Heart,
  X,
  Phone,
  Mail,
  Check,
  ArrowUpRight,
  Layers,
  CheckCircle2,
  Menu,
  Feather,
  Home,
  TrendingUp,
  Compass,
  Eye,
  Send,
  SlidersHorizontal,
  ChevronRight,
  Shield,
  FileText
} from 'lucide-react';

// --- TYPES ---
export interface Property {
  id: string;
  title: string;
  tagline: string;
  category: 'Coastal Villas' | 'Sky Penthouses' | 'Private Estates' | 'Architectural Landmarks';
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  acres?: number;
  yearBuilt: number;
  architect: string;
  heroImage: string;
  gallery: string[];
  featured: boolean;
  highlights: string[];
  description: string;
  floorPlans: {
    level: string;
    area: string;
    description: string;
  }[];
  agent: {
    name: string;
    title: string;
    phone: string;
    email: string;
    avatar: string;
  };
}

// --- DATA ---
const HERO_SLIDES = [
  {
    id: 'hero-1',
    title: 'The Horizon Residence',
    location: 'Malibu, California',
    price: '$4,250,000',
    tag: 'PRIVATE ESTATES • REAL ESTATE',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80',
    stats: '5 Beds • 6 Baths • 6,400 Sq Ft'
  },
  {
    id: 'hero-2',
    title: 'The Oakwood Estate',
    location: 'Beverly Hills, California',
    price: '$3,850,000',
    tag: 'PRIVATE ESTATES • REAL ESTATE',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    stats: '6 Beds • 7 Baths • 7,200 Sq Ft'
  },
  {
    id: 'hero-3',
    title: 'The Coastal Villa',
    location: 'Miami, Florida',
    price: '$5,100,000',
    tag: 'PRIVATE ESTATES • REAL ESTATE',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80',
    stats: '5 Beds • 6 Baths • 5,800 Sq Ft'
  }
];

const PROPERTIES: Property[] = [
  {
    id: 'demo-1',
    title: 'The Horizon Residence',
    tagline: 'Contemporary ocean-view residence featuring open-concept indoor-outdoor architecture',
    category: 'Coastal Villas',
    location: 'Malibu, California',
    price: 4250000,
    beds: 5,
    baths: 6,
    sqft: 6400,
    acres: 1.2,
    yearBuilt: 2023,
    architect: 'Contemporary Design Studio',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    highlights: ['Infinity Pool & Ocean Deck', 'Automated Multi-Slide Glass Walls', '3-Car Temperature-Controlled Garage', 'Custom Wine Cellar'],
    description: 'A sample listing demonstrating how coastal properties can be showcased with rich photography, detailed architectural specs, and interactive floor plans.',
    floorPlans: [
      { level: 'Main Level', area: '3,800 sq ft', description: 'Great room, chef kitchen, ocean-view dining, guest suite, and pool terrace.' },
      { level: 'Upper Level', area: '2,600 sq ft', description: 'Primary suite with private balcony, spa bathroom, and three en-suite bedrooms.' }
    ],
    agent: {
      name: 'Property Specialist',
      title: 'Real Estate Advisor',
      phone: '+1 (000) 000-0000',
      email: 'hello@example.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
    }
  },
  {
    id: 'demo-2',
    title: 'The Oakwood Estate',
    tagline: 'Timeless architectural sanctuary surrounded by manicured grounds and heritage trees',
    category: 'Private Estates',
    location: 'Beverly Hills, California',
    price: 3850000,
    beds: 6,
    baths: 7,
    sqft: 7200,
    acres: 0.9,
    yearBuilt: 2022,
    architect: 'Heritage Architecture Group',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    highlights: ['Gated Motor Court', 'Custom Library & Study', 'Outdoor Kitchen & Pavilion', 'Smart Home Integration'],
    description: 'An exemplary estate representation showing off-market and featured property layouts with comprehensive room-by-room information.',
    floorPlans: [
      { level: 'First Floor', area: '4,200 sq ft', description: 'Formal entry foyer, formal dining, library, living salon, and family kitchen.' },
      { level: 'Second Floor', area: '3,000 sq ft', description: 'Five bedroom suites, primary retreat with dual closets, and laundry wing.' }
    ],
    agent: {
      name: 'Client Representative',
      title: 'Senior Estate Agent',
      phone: '+1 (000) 000-0000',
      email: 'hello@example.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'
    }
  },
  {
    id: 'demo-3',
    title: 'The Coastal Villa',
    tagline: 'Waterfront tropical modern estate with private boat slip and expansive entertaining terraces',
    category: 'Coastal Villas',
    location: 'Miami, Florida',
    price: 5100000,
    beds: 5,
    baths: 6,
    sqft: 5800,
    acres: 0.6,
    yearBuilt: 2024,
    architect: 'Modern Coastal Atelier',
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    highlights: ['Private Deep-Water Dock', 'Resort-Style Pool & Spa', 'Rooftop Sunset Lounge', 'Floor-to-Ceiling Impact Glass'],
    description: 'Designed to illustrate how water-oriented and luxury residential listings can be presented with compelling visual hierarchy and clean metrics.',
    floorPlans: [
      { level: 'Ground Level', area: '3,400 sq ft', description: 'Open living and dining area, modern kitchen, guest suite, and patio access.' },
      { level: 'Second Level', area: '2,400 sq ft', description: 'Primary master suite with water views, 3 guest suites, and rooftop terrace access.' }
    ],
    agent: {
      name: 'Property Specialist',
      title: 'Real Estate Advisor',
      phone: '+1 (000) 000-0000',
      email: 'hello@example.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
    }
  },
  {
    id: 'demo-4',
    title: 'The Glass Penthouse',
    tagline: 'High-floor panoramic corner residence with 360-degree city views and private terrace',
    category: 'Sky Penthouses',
    location: 'New York, New York',
    price: 6400000,
    beds: 4,
    baths: 5,
    sqft: 4600,
    yearBuilt: 2023,
    architect: 'Urban Tower Architects',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    highlights: ['Private Elevator Entry', 'Wraparound Sunset Terrace', 'Custom Italian Millwork', '24/7 Concierge Building'],
    description: 'An urban penthouse demo showing how multi-story apartments and luxury high-rises can highlight vistas and building amenities.',
    floorPlans: [
      { level: 'Main Penthouse Level', area: '4,600 sq ft', description: 'Grand corner salon, formal dining room, chef kitchen, and master wing.' }
    ],
    agent: {
      name: 'Client Representative',
      title: 'Senior Estate Agent',
      phone: '+1 (000) 000-0000',
      email: 'hello@example.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'
    }
  },
  {
    id: 'demo-5',
    title: 'The Palm Sanctuary',
    tagline: 'Modern architectural villa with tranquil courtyard reflecting pools and lush gardens',
    category: 'Coastal Villas',
    location: 'Palm Beach, Florida',
    price: 5800000,
    beds: 6,
    baths: 7,
    sqft: 6800,
    acres: 0.75,
    yearBuilt: 2024,
    architect: 'Studio Palma Architects',
    heroImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    highlights: ['Courtyard Reflecting Pool', 'Separate Guest House', 'Outdoor Dining Loggia', 'Private Spa Suite'],
    description: 'Demonstrating clean presentation of luxury estates with guest pavilions, outdoor living spaces, and bespoke finishes.',
    floorPlans: [
      { level: 'Main Residence', area: '5,400 sq ft', description: 'Courtyard living room, kitchen, primary suite, and three guest suites.' },
      { level: 'Guest House', area: '1,400 sq ft', description: 'Two guest bedrooms, private kitchenette, and pool-side lounge.' }
    ],
    agent: {
      name: 'Property Specialist',
      title: 'Real Estate Advisor',
      phone: '+1 (000) 000-0000',
      email: 'hello@example.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
    }
  },
  {
    id: 'demo-6',
    title: 'The Mountain Ridge Retreat',
    tagline: 'Modern timber and stone retreat with mountain vistas and expansive hearth room',
    category: 'Architectural Landmarks',
    location: 'Aspen, Colorado',
    price: 4900000,
    beds: 5,
    baths: 6,
    sqft: 5900,
    acres: 2.5,
    yearBuilt: 2023,
    architect: 'Alpine Modern Design',
    heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    highlights: ['Vaulted Cedar Great Room', 'Heated Stone Patio & Spa', 'Mountain View Wine Room', 'Direct Trail Access'],
    description: 'A mountain and resort home template showing how natural landscapes and unique architectural materials can be featured.',
    floorPlans: [
      { level: 'Main Lodge Level', area: '3,500 sq ft', description: 'Great room, open chef kitchen, dining hall, and primary suite.' },
      { level: 'Upper Level', area: '2,400 sq ft', description: 'Four en-suite bedrooms, media room, and view deck.' }
    ],
    agent: {
      name: 'Client Representative',
      title: 'Senior Estate Agent',
      phone: '+1 (000) 000-0000',
      email: 'hello@example.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'
    }
  }
];

const HOTSPOT_DETAILS = [
  {
    id: 'spot-1',
    title: 'Infinity Edge Pool & Sundeck',
    x: '68%',
    y: '48%',
    description: 'Custom zero-edge saline pool seamlessly framing natural vistas with integrated underwater lighting.'
  },
  {
    id: 'spot-2',
    title: 'Floor-to-Ceiling Glass Architecture',
    x: '42%',
    y: '30%',
    description: 'Energy-efficient acoustic low-iron glass panels offering uninterrupted panoramic natural light.'
  },
  {
    id: 'spot-3',
    title: 'Indoor-Outdoor Living Pavilion',
    x: '25%',
    y: '72%',
    description: 'Pocketing automated glass walls that blend interior living salons with exterior entertaining terraces.'
  }
];

const GENERIC_SERVICES = [
  {
    id: 'service-1',
    icon: Building2,
    title: 'Property Sales',
    description: 'Strategic representation for property owners looking to market and sell their real estate assets to qualified buyers.'
  },
  {
    id: 'service-2',
    icon: Sparkles,
    title: 'Property Marketing',
    description: 'High-end photography, cinematic video presentations, digital floor plans, and targeted online property distribution.'
  },
  {
    id: 'service-3',
    icon: Eye,
    title: 'Private Viewings',
    description: 'Discreet and coordinated on-site property walkthroughs and virtual consultations tailored to client schedules.'
  },
  {
    id: 'service-4',
    icon: Compass,
    title: 'Property Search',
    description: 'Personalized buyer advisory to identify, evaluate, and acquire properties matching specific client criteria.'
  },
  {
    id: 'service-5',
    icon: TrendingUp,
    title: 'Market Guidance',
    description: 'Comparative pricing analysis, neighborhood insights, and market trends to support confident real estate decisions.'
  }
];

export default function LuxuryRealEstate() {
  // --- STATE ---
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('All Properties');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<number>(8000000);
  const [selectedBeds, setSelectedBeds] = useState<string>('any');
  const [sortBy, setSortBy] = useState<'featured' | 'price-desc' | 'price-asc'>('featured');
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(['demo-1']);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [activeFloorPlanIndex, setActiveFloorPlanIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<typeof HOTSPOT_DETAILS[0] | null>(HOTSPOT_DETAILS[0]);
  
  // Modals & Drawers
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingProperty, setBookingProperty] = useState<Property | null>(null);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Booking Form State
  const [bookingDate, setBookingDate] = useState('2026-08-20');
  const [bookingType, setBookingType] = useState('Private In-Person Viewing');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientMessage, setClientMessage] = useState('');

  // Contact Section Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactInterest, setContactInterest] = useState('Buying a Property');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Auto rotate hero slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Filter properties
  const filteredProperties = PROPERTIES.filter((p) => {
    const matchesCategory = activeCategory === 'All Properties' || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.architect.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.price <= priceRange;
    const matchesBeds =
      selectedBeds === 'any' ||
      (selectedBeds === '5+' && p.beds >= 5) ||
      (selectedBeds === '6+' && p.beds >= 6);

    return matchesCategory && matchesSearch && matchesPrice && matchesBeds;
  }).sort((a, b) => {
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'price-asc') return a.price - b.price;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const toggleSaveProperty = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedPropertyIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenBooking = (prop?: Property) => {
    setBookingProperty(prop || PROPERTIES[0]);
    setBookingSubmitted(false);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const savedPropertiesList = PROPERTIES.filter((p) => savedPropertyIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#1C1714] text-[#E8DFD4] font-crimson selection:bg-[#C9A962]/30 selection:text-[#E8DFD4] relative">
      {/* Texture & Lighting Overlays */}
      <div className="vignette-overlay" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      {/* ================= HEADER / NAVIGATION ================= */}
      <header className="sticky top-0 z-40 bg-[#1C1714]/95 backdrop-blur-md border-b border-[#4A3F35] shadow-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Main Brand Logo Area */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-[4px] bg-brass p-[1px] shadow-lg shadow-[#1C1714]">
              <div className="w-full h-full bg-[#1C1714] rounded-[3px] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#C9A962] group-hover:scale-105 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-cinzel tracking-[0.2em] uppercase font-bold text-[#E8DFD4] block leading-tight">
                YOUR BRAND NAME
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#C9A962] font-cinzel block uppercase font-medium">
                PRIVATE REAL ESTATE • ESTATES & PROPERTIES
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs tracking-[0.2em] text-[#9C8B7A] font-cinzel uppercase font-semibold">
            <a href="#properties" className="hover:text-[#C9A962] transition-colors">Properties</a>
            <a href="#services" className="hover:text-[#C9A962] transition-colors">Services</a>
            <a href="#about" className="hover:text-[#C9A962] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#C9A962] transition-colors">Contact</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Bookmark Drawer Button */}
            <button
              onClick={() => setIsSavedDrawerOpen(true)}
              className="relative p-2.5 rounded-[4px] bg-[#251E19] border border-[#4A3F35] text-[#C9A962] hover:border-[#C9A962] transition-all"
              aria-label="Saved Properties"
              title="Saved Properties"
            >
              <Heart className="w-5 h-5" />
              {savedPropertyIds.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#8B2635] text-[#E8DFD4] text-[10px] font-cinzel font-bold flex items-center justify-center shadow-md">
                  {savedPropertyIds.length}
                </span>
              )}
            </button>

            {/* Schedule Tour Button */}
            <button
              onClick={() => handleOpenBooking()}
              className="px-5 py-2.5 rounded-[4px] bg-brass text-[#1C1714] text-xs font-cinzel font-bold uppercase tracking-[0.15em] text-engraved transition-all shadow-md hover:brightness-110 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Schedule a Viewing
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#C9A962] hover:text-[#E8DFD4]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#251E19] border-b border-[#4A3F35] px-6 py-6 space-y-4 shadow-2xl"
            >
              <a
                href="#properties"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#E8DFD4] font-cinzel text-xs uppercase tracking-[0.2em] hover:text-[#C9A962] py-2"
              >
                Properties
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#E8DFD4] font-cinzel text-xs uppercase tracking-[0.2em] hover:text-[#C9A962] py-2"
              >
                Services
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#E8DFD4] font-cinzel text-xs uppercase tracking-[0.2em] hover:text-[#C9A962] py-2"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#E8DFD4] font-cinzel text-xs uppercase tracking-[0.2em] hover:text-[#C9A962] py-2"
              >
                Contact
              </a>
              <div className="pt-4 border-t border-[#4A3F35] flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSavedDrawerOpen(true);
                  }}
                  className="flex items-center justify-between w-full py-2 text-[#C9A962] font-cinzel text-xs uppercase"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#8B2635]" /> Saved Demo Properties
                  </span>
                  <span className="bg-[#1C1714] border border-[#4A3F35] text-[#C9A962] px-2.5 py-0.5 rounded-[4px] text-xs font-mono font-bold">
                    {savedPropertyIds.length}
                  </span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenBooking();
                  }}
                  className="w-full py-3 rounded-[4px] bg-brass text-[#1C1714] font-cinzel font-bold uppercase tracking-[0.15em] text-xs shadow-lg"
                >
                  Schedule a Viewing
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16">
        {/* Background Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={HERO_SLIDES[currentHeroSlide].id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 z-0"
          >
            <img
              src={HERO_SLIDES[currentHeroSlide].image}
              alt={HERO_SLIDES[currentHeroSlide].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter sepia-[0.15] contrast-[1.05] brightness-[0.95]"
            />
            {/* Ambient Lighting Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1714] via-[#1C1714]/25 to-[#1C1714]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C1714]/50 via-transparent to-[#1C1714]/50" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="bg-transparent border-0 shadow-none p-4 sm:p-8 md:p-12 rounded-[4px] w-full">
            
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[4px] bg-[#1C1714]/80 backdrop-blur-sm border border-[#C9A962]/60 text-[#C9A962] text-xs font-cinzel tracking-[0.25em] uppercase mb-6 shadow-lg"
            >
              <Feather className="w-3.5 h-3.5 text-[#C9A962]" />
              <span>PRIVATE ESTATES • REAL ESTATE</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-cormorant tracking-tight text-[#E8DFD4] font-normal leading-[1.08] mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]"
            >
              Where Exceptional Properties Meet <span className="text-[#C9A962] italic">Exceptional Living</span>
            </motion.h1>

            {/* Ornate Divider */}
            <div className="w-48 mx-auto ornate-divider ornate-divider-oak mb-6" />

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#F3ECE2] text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            >
              A refined digital experience designed to present properties beautifully and make it easier for buyers to discover their next home.
            </motion.p>

            {/* Action Buttons: Explore Properties & Schedule Viewing */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <a
                href="#properties"
                className="w-full sm:w-auto px-8 py-3.5 rounded-[4px] bg-brass text-[#1C1714] text-xs font-cinzel font-bold uppercase tracking-[0.2em] text-engraved shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>EXPLORE PROPERTIES</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => handleOpenBooking()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-[4px] bg-[#1C1714]/80 backdrop-blur-md border border-[#C9A962] text-[#C9A962] hover:bg-[#C9A962] hover:text-[#1C1714] text-xs font-cinzel font-bold uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>SCHEDULE A VIEWING</span>
              </button>
            </motion.div>

            {/* Active Slide Info Badge */}
            <div className="inline-flex items-center gap-3 sm:gap-4 mb-8 bg-[#1C1714]/80 backdrop-blur-md border border-[#C9A962]/50 px-5 py-2.5 rounded-[4px] text-xs text-[#E8DFD4] shadow-lg">
              <span className="text-[#C9A962] font-cinzel font-semibold uppercase tracking-widest">
                {HERO_SLIDES[currentHeroSlide].location}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C9A962]/60" />
              <span className="font-cormorant text-base text-[#E8DFD4] font-medium">
                {HERO_SLIDES[currentHeroSlide].title}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C9A962]/60" />
              <span className="font-cinzel text-[#C9A962] font-bold">
                {HERO_SLIDES[currentHeroSlide].price}
              </span>
              <span className="hidden md:inline-block text-[10px] uppercase font-cinzel tracking-wider px-2 py-0.5 bg-[#C9A962]/20 border border-[#C9A962]/40 text-[#C9A962] rounded-[2px]">
                DEMO PROPERTY
              </span>
            </div>

            {/* Slide Pagination Dots */}
            <div className="flex items-center justify-center gap-3">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentHeroSlide(idx)}
                  className={`h-2 transition-all ${
                    currentHeroSlide === idx
                      ? 'w-10 bg-[#C9A962] shadow-[0_0_8px_#C9A962]'
                      : 'w-3 bg-[#4A3F35] hover:bg-[#9C8B7A]'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Quick Property Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-4xl bg-[#1C1714]/75 backdrop-blur-md border border-[#C9A962]/40 rounded-[4px] p-6 shadow-2xl mt-4 text-left"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Keyword Search */}
              <div>
                <label className="block text-[11px] font-cinzel uppercase tracking-[0.2em] text-[#C9A962] mb-1.5 font-bold">
                  Location or Name
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-[#9C8B7A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Malibu, Beverly Hills"
                    className="w-full bg-[#1C1714] border border-[#4A3F35] rounded-[4px] pl-9 pr-3 py-2 text-sm text-[#E8DFD4] placeholder-[#9C8B7A] italic focus:outline-none focus:border-[#C9A962] transition-all font-crimson"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-[11px] font-cinzel uppercase tracking-[0.2em] text-[#C9A962] mb-1.5 font-bold">
                  Property Category
                </label>
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full bg-[#1C1714] border border-[#4A3F35] rounded-[4px] px-3 py-2 text-sm text-[#E8DFD4] focus:outline-none focus:border-[#C9A962] transition-all font-crimson"
                >
                  <option value="All Properties">All Categories</option>
                  <option value="Coastal Villas">Coastal Villas</option>
                  <option value="Sky Penthouses">Sky Penthouses</option>
                  <option value="Private Estates">Private Estates</option>
                  <option value="Architectural Landmarks">Architectural Landmarks</option>
                </select>
              </div>

              {/* Max Valuation */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-cinzel uppercase tracking-[0.2em] text-[#C9A962] font-bold">
                    Max Price
                  </label>
                  <span className="text-xs text-[#C9A962] font-cinzel font-bold">
                    ${(priceRange / 1000000).toFixed(1)}M
                  </span>
                </div>
                <input
                  type="range"
                  min={3000000}
                  max={8000000}
                  step={250000}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#C9A962] bg-[#1C1714] h-2 rounded-lg cursor-pointer mt-2"
                />
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-[11px] font-cinzel uppercase tracking-[0.2em] text-[#C9A962] mb-1.5 font-bold">
                  Bedrooms
                </label>
                <div className="grid grid-cols-3 gap-1 bg-[#1C1714] p-1 rounded-[4px] border border-[#4A3F35]">
                  {['any', '5+', '6+'].map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBeds(b)}
                      className={`py-1 text-xs font-cinzel uppercase tracking-wider rounded-[3px] transition-all ${
                        selectedBeds === b
                          ? 'bg-brass text-[#1C1714] font-bold shadow-xs'
                          : 'text-[#9C8B7A] hover:text-[#E8DFD4]'
                      }`}
                    >
                      {b === 'any' ? 'Any' : b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ornate Section Divider */}
      <div className="max-w-7xl mx-auto px-4 my-8">
        <div className="ornate-divider" />
      </div>

      {/* ================= SECTION: PROPERTY SHOWCASE ================= */}
      <section id="properties" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-[#4A3F35] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[#C9A962] text-xs font-cinzel uppercase tracking-[0.25em] mb-2 font-bold">
              <Sparkles className="w-4 h-4 text-[#C9A962]" />
              <span>DEMO PROPERTY COLLECTION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-cormorant text-[#E8DFD4] font-normal tracking-tight">
              Featured Sample Properties
            </h2>
            <p className="text-[#9C8B7A] text-sm mt-1 italic">
              Example property listings designed to demonstrate premium presentation and details.
            </p>
          </div>

          {/* Sort & Counter */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-cinzel uppercase text-[#9C8B7A] tracking-wider">
              Showing: <strong className="text-[#C9A962]">{filteredProperties.length}</strong> Sample Listings
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#251E19] border border-[#4A3F35] rounded-[4px] px-3 py-2 text-xs text-[#E8DFD4] font-cinzel focus:outline-none focus:border-[#C9A962]"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-[#4A3F35]">
          {[
            'All Properties',
            'Coastal Villas',
            'Sky Penthouses',
            'Private Estates',
            'Architectural Landmarks'
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-[4px] text-xs font-cinzel uppercase tracking-[0.15em] whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-brass text-[#1C1714] font-bold shadow-md'
                  : 'bg-[#251E19] border border-[#4A3F35] text-[#9C8B7A] hover:text-[#E8DFD4] hover:border-[#C9A962]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-[#251E19] border border-[#4A3F35] rounded-[4px] shadow-xl">
            <Building2 className="w-12 h-12 text-[#9C8B7A] mx-auto mb-4" />
            <h3 className="text-2xl font-cormorant text-[#E8DFD4] mb-2">No Matching Sample Properties</h3>
            <p className="text-[#9C8B7A] text-sm max-w-md mx-auto mb-6">
              Adjust your search keywords or price filters to view all available demo properties.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All Properties');
                setSearchQuery('');
                setPriceRange(8000000);
                setSelectedBeds('any');
              }}
              className="px-5 py-2 rounded-[4px] bg-brass text-[#1C1714] text-xs font-cinzel font-bold uppercase tracking-[0.15em] hover:brightness-110 transition-colors"
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, idx) => {
              const isSaved = savedPropertyIds.includes(property.id);
              return (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group bg-[#251E19] border border-[#4A3F35] rounded-[4px] overflow-hidden hover:border-[#C9A962] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative"
                >
                  {/* Subtle DEMO PROPERTY Pill */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-2.5 py-1 rounded-[3px] bg-[#1C1714]/90 border border-[#C9A962]/50 text-[#C9A962] text-[9px] font-cinzel font-bold uppercase tracking-[0.2em] shadow-md">
                      DEMO PROPERTY
                    </span>
                  </div>

                  {/* Arch-Top Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#1C1714] arch-top p-2 m-3 border border-[#4A3F35]">
                    <img
                      src={property.heroImage}
                      alt={property.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover arch-top filter sepia-[0.35] contrast-95 hover:sepia-0 hover:contrast-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1714]/80 via-transparent to-transparent pointer-events-none" />

                    {/* Top Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-[3px] bg-[#1C1714]/90 border border-[#4A3F35] text-[#C9A962] text-[10px] font-cinzel font-bold uppercase tracking-[0.2em]">
                        {property.category}
                      </span>
                    </div>

                    {/* Bookmark Toggle */}
                    <button
                      onClick={(e) => toggleSaveProperty(property.id, e)}
                      className={`absolute bottom-4 right-4 p-2 rounded-full border transition-all ${
                        isSaved
                          ? 'bg-[#8B2635] text-[#E8DFD4] border-[#8B2635]'
                          : 'bg-[#1C1714]/80 text-[#9C8B7A] border-[#4A3F35] hover:text-rose-400'
                      }`}
                      aria-label="Save Property"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#E8DFD4]' : ''}`} />
                    </button>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-4 left-4">
                      <p className="text-2xl font-cormorant text-[#E8DFD4] font-bold drop-shadow-md">
                        ${(property.price).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-cinzel text-[#C9A962] mb-2 uppercase tracking-widest font-bold">
                        <MapPin className="w-3.5 h-3.5 text-[#C9A962]" />
                        <span>{property.location}</span>
                      </div>
                      <h3 className="text-2xl font-cormorant text-[#E8DFD4] group-hover:text-[#C9A962] transition-colors mb-2 line-clamp-1 font-normal">
                        {property.title}
                      </h3>
                      <p className="text-[#9C8B7A] text-sm line-clamp-2 italic mb-6 font-normal">
                        "{property.tagline}"
                      </p>
                    </div>

                    {/* Specifications */}
                    <div className="pt-4 border-t border-[#4A3F35]">
                      <div className="grid grid-cols-3 gap-2 text-[#E8DFD4] text-xs font-cinzel uppercase mb-6">
                        <div className="flex items-center gap-1.5">
                          <Bed className="w-3.5 h-3.5 text-[#C9A962]" />
                          <span>{property.beds} Beds</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bath className="w-3.5 h-3.5 text-[#C9A962]" />
                          <span>{property.baths} Baths</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5 text-[#C9A962]" />
                          <span>{property.sqft.toLocaleString()} sqft</span>
                        </div>
                      </div>

                      {/* Explore Button */}
                      <button
                        onClick={() => {
                          setSelectedProperty(property);
                          setActiveGalleryIndex(0);
                        }}
                        className="w-full py-3 rounded-[4px] bg-[#1C1714] border border-[#C9A962] text-[#C9A962] hover:bg-brass hover:text-[#1C1714] text-xs font-cinzel font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 group/btn shadow-sm"
                      >
                        <span>Examine Property Details</span>
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Ornate Section Divider */}
      <div className="max-w-7xl mx-auto px-4 my-8">
        <div className="ornate-divider" />
      </div>

      {/* ================= SECTION: INTERACTIVE FEATURE SPOTLIGHT ================= */}
      <section className="py-24 bg-[#251E19]/80 border-t border-[#4A3F35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C9A962] text-xs font-cinzel uppercase tracking-[0.25em] block mb-2 font-bold">
              INTERACTIVE DEMO • ARCHITECTURAL SPOTLIGHT
            </span>
            <h2 className="text-3xl sm:text-5xl font-cormorant text-[#E8DFD4] font-normal tracking-tight mb-4">
              Interactive Property Exploration
            </h2>
            <p className="text-[#9C8B7A] text-base italic">
              Example interactive hotspot canvas demonstrating how fine architectural details, finishes, and design features can be explored.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hotspot Canvas Container */}
            <div className="lg:col-span-8 relative rounded-[4px] overflow-hidden border border-[#4A3F35] shadow-2xl bg-[#1C1714] aspect-[16/10] ornate-frame p-2">
              <img
                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80"
                alt="Sample Architectural Canvas"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter sepia-[0.3] contrast-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1714]/80 via-transparent to-transparent pointer-events-none" />

              {/* Hotspots */}
              {HOTSPOT_DETAILS.map((spot) => {
                const isSelected = activeHotspot?.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot)}
                    style={{ left: spot.x, top: spot.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
                    aria-label={spot.title}
                  >
                    <span className="relative flex h-8 w-8 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A962] opacity-75" />
                      <span className={`relative inline-flex rounded-full h-7 w-7 items-center justify-center text-xs font-bold font-cinzel transition-transform ${
                        isSelected
                          ? 'bg-brass text-[#1C1714] scale-125 shadow-xl'
                          : 'bg-[#1C1714] text-[#C9A962] border border-[#C9A962]'
                      }`}>
                        +
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Hotspot Specification Panel */}
            <div className="lg:col-span-4 bg-[#1C1714] border border-[#4A3F35] rounded-[4px] p-8 space-y-6 shadow-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-cinzel text-[#C9A962] font-bold uppercase tracking-[0.2em]">
                <Layers className="w-4 h-4 text-[#C9A962]" />
                <span>Feature Callout</span>
              </div>

              {activeHotspot ? (
                <motion.div
                  key={activeHotspot.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-cormorant text-[#E8DFD4] font-normal">
                    {activeHotspot.title}
                  </h3>
                  <p className="text-[#9C8B7A] text-sm leading-relaxed font-normal">
                    {activeHotspot.description}
                  </p>

                  <div className="pt-4 border-t border-[#4A3F35] flex items-center justify-between text-xs text-[#9C8B7A] font-cinzel uppercase">
                    <span>Feature Detail</span>
                    <span className="text-[#C9A962] font-bold">Interactive Demo</span>
                  </div>
                </motion.div>
              ) : (
                <p className="text-[#9C8B7A] text-sm italic">
                  Select any pin on the canvas to inspect architectural specifications.
                </p>
              )}

              <button
                onClick={() => handleOpenBooking(PROPERTIES[0])}
                className="w-full py-3 rounded-[4px] bg-brass text-[#1C1714] text-xs font-cinzel font-bold uppercase tracking-[0.15em] hover:brightness-110 transition-all shadow-md"
              >
                Schedule a Property Viewing
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ornate Section Divider */}
      <div className="max-w-7xl mx-auto px-4 my-8">
        <div className="ornate-divider" />
      </div>

      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#C9A962] text-xs font-cinzel uppercase tracking-[0.25em] block mb-2 font-bold">
            SERVICES & EXPERTISE
          </span>
          <h2 className="text-3xl sm:text-5xl font-cormorant text-[#E8DFD4] font-normal tracking-tight mb-4">
            Comprehensive Real Estate Services
          </h2>
          <p className="text-[#9C8B7A] text-base italic">
            Example service modules demonstrating how agency offerings can be highlighted with refined visual hierarchy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GENERIC_SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="bg-[#251E19] border border-[#4A3F35] p-8 rounded-[4px] hover:border-[#C9A962] transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="w-12 h-12 rounded-[4px] bg-[#1C1714] border border-[#4A3F35] flex items-center justify-center mb-6 group-hover:border-[#C9A962] transition-colors">
                    <Icon className="w-6 h-6 text-[#C9A962]" />
                  </div>
                  <h3 className="text-2xl font-cormorant text-[#E8DFD4] mb-3 group-hover:text-[#C9A962] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-[#9C8B7A] text-sm leading-relaxed">
                    {srv.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#4A3F35]/60 flex items-center justify-between text-xs font-cinzel text-[#C9A962] uppercase tracking-wider">
                  <span>Example Service</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
          {/* Quick Inquiry Card */}
          <div className="bg-[#1C1714] border border-[#C9A962]/60 p-8 rounded-[4px] flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-[4px] bg-brass/20 border border-[#C9A962] flex items-center justify-center mb-6">
                <Send className="w-6 h-6 text-[#C9A962]" />
              </div>
              <h3 className="text-2xl font-cormorant text-[#E8DFD4] mb-3">
                Tailored Advisory
              </h3>
              <p className="text-[#9C8B7A] text-sm leading-relaxed">
                Connect with our team to discuss customized real estate requirements or explore listing opportunities.
              </p>
            </div>
            <a
              href="#contact"
              className="mt-6 w-full py-3 rounded-[4px] bg-brass text-[#1C1714] text-xs font-cinzel font-bold uppercase tracking-[0.15em] hover:brightness-110 transition-all text-center"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* Ornate Section Divider */}
      <div className="max-w-7xl mx-auto px-4 my-8">
        <div className="ornate-divider" />
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#251E19]/90 border border-[#4A3F35] p-8 sm:p-12 md:p-16 rounded-[4px] ornate-frame shadow-2xl relative">
          <span className="text-[#C9A962] text-xs font-cinzel uppercase tracking-[0.3em] block mb-3 font-bold">
            ABOUT THIS CONCEPT
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-cormorant text-[#E8DFD4] font-normal leading-tight mb-6">
            A Better Way to Present Real Estate
          </h2>

          <div className="w-32 mx-auto ornate-divider ornate-divider-oak mb-8" />

          {/* Body Text with Classical Drop Cap */}
          <div className="text-[#E8DFD4] text-base sm:text-lg leading-relaxed text-left font-crimson space-y-6 max-w-3xl mx-auto">
            <p className="drop-cap">
              A modern website concept designed for real estate businesses that want a polished, easy-to-navigate online experience for buyers and sellers.
            </p>
            <p className="text-[#9C8B7A] leading-relaxed">
              Every detail—from typography and interactive property filters to high-resolution gallery viewports and seamless inquiry modals—has been architected to showcase properties with timeless elegance and digital clarity.
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-[#4A3F35] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-cinzel text-[#C9A962] uppercase tracking-[0.15em]">
            <div className="flex items-center justify-center gap-2 p-3 bg-[#1C1714] border border-[#4A3F35] rounded-[4px]">
              <Sparkles className="w-4 h-4 text-[#C9A962]" />
              <span>Intuitive Discovery</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 bg-[#1C1714] border border-[#4A3F35] rounded-[4px]">
              <Eye className="w-4 h-4 text-[#C9A962]" />
              <span>Visual Excellence</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 bg-[#1C1714] border border-[#4A3F35] rounded-[4px]">
              <CheckCircle2 className="w-4 h-4 text-[#C9A962]" />
              <span>Seamless Inquiries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ornate Section Divider */}
      <div className="max-w-7xl mx-auto px-4 my-8">
        <div className="ornate-divider" />
      </div>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#251E19] border border-[#C9A962]/40 rounded-[4px] p-8 sm:p-14 relative shadow-2xl ornate-frame">
          <span className="text-[#C9A962] text-xs font-cinzel uppercase tracking-[0.25em] block mb-2 font-bold">
            NEXT STEPS
          </span>
          <h2 className="text-3xl sm:text-5xl font-cormorant text-[#E8DFD4] font-normal leading-tight mb-4">
            Ready to See Your Next Property?
          </h2>
          <p className="text-[#9C8B7A] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Explore a more refined way to present properties, connect with visitors, and turn interest into inquiries.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-[4px] bg-brass text-[#1C1714] text-xs font-cinzel font-bold uppercase tracking-[0.2em] shadow-xl hover:brightness-110 transition-all"
            >
              GET IN TOUCH
            </a>
            <button
              onClick={() => handleOpenBooking()}
              className="px-8 py-3.5 rounded-[4px] bg-[#1C1714] border border-[#C9A962] text-[#C9A962] hover:bg-[#C9A962] hover:text-[#1C1714] text-xs font-cinzel font-bold uppercase tracking-[0.2em] transition-all"
            >
              SCHEDULE A VIEWING
            </button>
          </div>
        </div>
      </section>

      {/* Ornate Section Divider */}
      <div className="max-w-7xl mx-auto px-4 my-8">
        <div className="ornate-divider" />
      </div>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#251E19] border border-[#4A3F35] rounded-[4px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl ornate-frame">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#C9A962] text-xs font-cinzel font-bold uppercase tracking-[0.2em]">
                <Mail className="w-4 h-4 text-[#C9A962]" />
                <span>INQUIRIES & CONTACT</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-cormorant text-[#E8DFD4] font-normal leading-tight">
                Connect With Us
              </h2>
              <p className="text-[#9C8B7A] text-base leading-relaxed">
                Reach out to discuss real estate opportunities, schedule a private viewing, or inquire about property marketing.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#4A3F35] text-sm text-[#E8DFD4]">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#C9A962] shrink-0" />
                  <div>
                    <p className="text-xs text-[#9C8B7A] font-cinzel uppercase">Email Address</p>
                    <p className="font-cinzel text-sm text-[#E8DFD4]">hello@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C9A962] shrink-0" />
                  <div>
                    <p className="text-xs text-[#9C8B7A] font-cinzel uppercase">Phone Number</p>
                    <p className="font-cinzel text-sm text-[#E8DFD4]">+1 (000) 000-0000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#C9A962] shrink-0" />
                  <div>
                    <p className="text-xs text-[#9C8B7A] font-cinzel uppercase">Office Location</p>
                    <p className="font-cinzel text-sm text-[#E8DFD4]">100 Example Avenue, Suite 500</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-[#1C1714] border border-[#4A3F35] p-8 rounded-[4px] shadow-xl">
              <h3 className="text-2xl font-cormorant text-[#E8DFD4] mb-2 font-normal">
                Send an Inquiry
              </h3>
              <p className="text-[#9C8B7A] text-xs font-cinzel uppercase tracking-widest mb-6">
                Example Contact & Inquiry Form
              </p>

              {contactSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-12 h-12 bg-brass/20 text-[#C9A962] rounded-full flex items-center justify-center mx-auto border border-[#C9A962]">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-cormorant text-[#E8DFD4]">Inquiry Received</h4>
                  <p className="text-sm text-[#9C8B7A] font-crimson max-w-sm mx-auto">
                    Thank you for your message. In a live application, this submission will be routed directly to your team.
                  </p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-[4px] bg-brass text-[#1C1714] text-xs font-cinzel font-bold uppercase tracking-widest"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-cinzel uppercase text-[#C9A962] mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full bg-[#251E19] border border-[#4A3F35] rounded-[4px] p-2.5 text-xs text-[#E8DFD4] placeholder-[#9C8B7A] italic focus:outline-none focus:border-[#C9A962]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-cinzel uppercase text-[#C9A962] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-[#251E19] border border-[#4A3F35] rounded-[4px] p-2.5 text-xs text-[#E8DFD4] placeholder-[#9C8B7A] italic focus:outline-none focus:border-[#C9A962]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-cinzel uppercase text-[#C9A962] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+1 (000) 000-0000"
                        className="w-full bg-[#251E19] border border-[#4A3F35] rounded-[4px] p-2.5 text-xs text-[#E8DFD4] placeholder-[#9C8B7A] italic focus:outline-none focus:border-[#C9A962]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-cinzel uppercase text-[#C9A962] mb-1">
                        Interest
                      </label>
                      <select
                        value={contactInterest}
                        onChange={(e) => setContactInterest(e.target.value)}
                        className="w-full bg-[#251E19] border border-[#4A3F35] rounded-[4px] p-2.5 text-xs text-[#E8DFD4] font-cinzel focus:outline-none focus:border-[#C9A962]"
                      >
                        <option>Buying a Property</option>
                        <option>Selling a Property</option>
                        <option>Scheduling a Viewing</option>
                        <option>General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel uppercase text-[#C9A962] mb-1">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="How can we assist you?"
                      className="w-full bg-[#251E19] border border-[#4A3F35] rounded-[4px] p-2.5 text-xs text-[#E8DFD4] placeholder-[#9C8B7A] italic focus:outline-none focus:border-[#C9A962]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-[4px] bg-brass text-[#1C1714] text-xs font-cinzel font-bold uppercase tracking-[0.15em] hover:brightness-110 transition-all shadow-md"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Ornate Section Divider */}
      <div className="max-w-7xl mx-auto px-4 my-8">
        <div className="ornate-divider" />
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#1C1714] border-t border-[#4A3F35] pt-16 pb-12 relative text-[#9C8B7A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Newsletter Box */}
          <div className="bg-[#251E19] border border-[#4A3F35] rounded-[4px] p-8 mb-16 max-w-4xl mx-auto text-center ornate-frame">
            <span className="text-[#C9A962] text-xs font-cinzel uppercase tracking-[0.25em] block mb-2 font-bold">
              PROPERTY UPDATES
            </span>
            <h3 className="text-2xl sm:text-3xl font-cormorant text-[#E8DFD4] mb-3">
              Receive New Listing Notifications
            </h3>
            <p className="text-[#9C8B7A] text-sm max-w-lg mx-auto mb-6 italic">
              Subscribe to receive updates when new properties and featured collections are added.
            </p>

            {newsletterSubscribed ? (
              <div className="p-4 bg-[#1C1714] border border-[#C9A962] rounded-[4px] text-[#C9A962] text-xs font-cinzel uppercase tracking-widest inline-flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Subscription Confirmed</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail) setNewsletterSubscribed(true);
                }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address..."
                  className="flex-1 bg-[#1C1714] border border-[#4A3F35] rounded-[4px] px-4 py-3 text-xs text-[#E8DFD4] placeholder-[#9C8B7A] italic focus:outline-none focus:border-[#C9A962]"
                />
                <button
                  type="submit"
                  className="py-3 px-6 rounded-[4px] bg-brass text-[#1C1714] text-xs font-cinzel font-bold uppercase tracking-[0.15em] hover:brightness-110 transition-all whitespace-nowrap shadow-md"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#4A3F35]">
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <span className="text-xl font-cinzel tracking-[0.2em] uppercase font-bold text-[#E8DFD4] block">
                YOUR BRAND NAME
              </span>
              <p className="text-xs text-[#C9A962] font-cinzel uppercase tracking-widest font-semibold">
                PRIVATE REAL ESTATE • PROPERTY • LIFESTYLE
              </p>
              <p className="text-xs leading-relaxed italic text-[#9C8B7A]">
                A refined website concept for luxury real estate agencies and property professionals.
              </p>
            </div>

            {/* Column 2: Global Reach */}
            <div className="space-y-4">
              <h4 className="text-xs font-cinzel uppercase tracking-[0.2em] text-[#C9A962] font-bold">
                GLOBAL REACH
              </h4>
              <ul className="space-y-2.5 text-xs font-cinzel text-[#E8DFD4]">
                <li className="hover:text-[#C9A962] transition-colors cursor-pointer">BEVERLY HILLS • WILSHIRE BLVD</li>
                <li className="hover:text-[#C9A962] transition-colors cursor-pointer">NEW YORK • FIFTH AVENUE</li>
                <li className="hover:text-[#C9A962] transition-colors cursor-pointer">MONACO • BOULEVARD DE SUISSE</li>
                <li className="hover:text-[#C9A962] transition-colors cursor-pointer">LONDON • MAYFAIR SQUARE</li>
              </ul>
            </div>

            {/* Column 3: Real Estate Services */}
            <div className="space-y-4">
              <h4 className="text-xs font-cinzel uppercase tracking-[0.2em] text-[#C9A962] font-bold">
                REAL ESTATE SERVICES
              </h4>
              <ul className="space-y-2.5 text-xs font-cinzel text-[#E8DFD4]">
                <li><a href="#services" className="hover:text-[#C9A962] transition-colors">PROPERTY SALES</a></li>
                <li><a href="#services" className="hover:text-[#C9A962] transition-colors">PROPERTY MARKETING</a></li>
                <li><a href="#services" className="hover:text-[#C9A962] transition-colors">PRIVATE VIEWINGS</a></li>
                <li><a href="#services" className="hover:text-[#C9A962] transition-colors">MARKET GUIDANCE</a></li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="space-y-4">
              <h4 className="text-xs font-cinzel uppercase tracking-[0.2em] text-[#C9A962] font-bold">
                CONTACT
              </h4>
              <div className="space-y-2 text-xs font-cinzel">
                <p className="text-[#E8DFD4] font-bold hover:text-[#C9A962] transition-colors">
                  <a href="mailto:HELLO@EXAMPLE.COM">HELLO@EXAMPLE.COM</a>
                </p>
                <p className="text-[#C9A962] font-bold">
                  +1 (000) 000-0000
                </p>
                <p className="text-[#9C8B7A] pt-1">
                  100 Example Avenue, Suite 500
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Footer Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-cinzel text-[#9C8B7A] gap-4">
            <p>© 2026 YOUR BRAND NAME. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-6 text-[10px] tracking-widest uppercase">
              <a href="#about" className="hover:text-[#C9A962] transition-colors">CONFIDENTIALITY POLICY</a>
              <span>•</span>
              <a href="#about" className="hover:text-[#C9A962] transition-colors">TERMS OF SERVICE</a>
              <span>•</span>
              <a href="#about" className="hover:text-[#C9A962] transition-colors">PRIVACY</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= MODAL 1: PROPERTY DETAIL DOSSIER ================= */}
      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProperty(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#251E19] border border-[#4A3F35] rounded-[4px] shadow-2xl overflow-y-auto z-10 text-[#E8DFD4] ornate-frame"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#1C1714] border border-[#4A3F35] text-[#C9A962] hover:text-[#E8DFD4]"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Gallery Header */}
              <div className="relative aspect-[16/9] bg-[#1C1714]">
                <img
                  src={selectedProperty.gallery[activeGalleryIndex] || selectedProperty.heroImage}
                  alt={selectedProperty.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter sepia-[0.3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#251E19] via-transparent to-black/40" />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-3 py-1 rounded-[3px] bg-[#1C1714] text-[#C9A962] font-cinzel text-xs font-bold uppercase tracking-widest border border-[#4A3F35]">
                        {selectedProperty.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-[3px] bg-[#C9A962]/20 text-[#C9A962] font-cinzel text-[10px] font-bold uppercase tracking-widest border border-[#C9A962]/40">
                        DEMO PROPERTY
                      </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-cormorant text-white font-normal mt-2 drop-shadow-md">
                      {selectedProperty.title}
                    </h2>
                    <p className="text-xs font-cinzel text-[#C9A962] uppercase tracking-widest">
                      {selectedProperty.location}
                    </p>
                  </div>
                  <p className="text-3xl font-cormorant text-[#C9A962] font-bold">
                    ${selectedProperty.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div className="p-4 bg-[#1C1714] border-b border-[#4A3F35] flex items-center gap-3 overflow-x-auto">
                {selectedProperty.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={`relative w-20 h-14 rounded-[3px] overflow-hidden shrink-0 border transition-all ${
                      activeGalleryIndex === idx
                        ? 'border-[#C9A962] scale-105'
                        : 'border-[#4A3F35] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Dossier Content */}
              <div className="p-8 space-y-8">
                {/* Highlights Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#1C1714] p-4 rounded-[4px] border border-[#4A3F35] text-center font-cinzel text-xs uppercase">
                  <div>
                    <p className="text-[#9C8B7A]">Beds / Baths</p>
                    <p className="text-[#E8DFD4] font-bold mt-1">{selectedProperty.beds} Beds • {selectedProperty.baths} Baths</p>
                  </div>
                  <div>
                    <p className="text-[#9C8B7A]">Area</p>
                    <p className="text-[#E8DFD4] font-bold mt-1">{selectedProperty.sqft.toLocaleString()} Sq Ft</p>
                  </div>
                  <div>
                    <p className="text-[#9C8B7A]">Year Built</p>
                    <p className="text-[#E8DFD4] font-bold mt-1">{selectedProperty.yearBuilt}</p>
                  </div>
                  <div>
                    <p className="text-[#9C8B7A]">Architect / Design</p>
                    <p className="text-[#C9A962] font-bold mt-1">{selectedProperty.architect}</p>
                  </div>
                </div>

                {/* Narrative Description */}
                <div>
                  <h3 className="text-xl font-cormorant text-[#C9A962] mb-3">Property Overview</h3>
                  <p className="text-[#E8DFD4] leading-relaxed text-base font-crimson">
                    {selectedProperty.description}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-xl font-cormorant text-[#C9A962] mb-3">Key Features & Amenities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProperty.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-cinzel text-[#E8DFD4]">
                        <Check className="w-4 h-4 text-[#C9A962]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floor Plans Section */}
                <div>
                  <h3 className="text-xl font-cormorant text-[#C9A962] mb-3">Floor Plan Layout</h3>
                  <div className="flex gap-2 mb-4 border-b border-[#4A3F35]">
                    {selectedProperty.floorPlans.map((fp, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveFloorPlanIndex(i)}
                        className={`py-2 px-4 text-xs font-cinzel uppercase transition-all ${
                          activeFloorPlanIndex === i
                            ? 'border-b-2 border-[#C9A962] text-[#C9A962] font-bold'
                            : 'text-[#9C8B7A] hover:text-[#E8DFD4]'
                        }`}
                      >
                        {fp.level}
                      </button>
                    ))}
                  </div>
                  <div className="bg-[#1C1714] border border-[#4A3F35] p-6 rounded-[4px]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-cormorant text-[#E8DFD4] font-bold">
                        {selectedProperty.floorPlans[activeFloorPlanIndex]?.level}
                      </span>
                      <span className="text-xs font-cinzel text-[#C9A962]">
                        {selectedProperty.floorPlans[activeFloorPlanIndex]?.area}
                      </span>
                    </div>
                    <p className="text-xs text-[#9C8B7A] font-crimson">
                      {selectedProperty.floorPlans[activeFloorPlanIndex]?.description}
                    </p>
                  </div>
                </div>

                {/* Assigned Representative & CTA */}
                <div className="pt-6 border-t border-[#4A3F35] flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedProperty.agent.avatar}
                      alt={selectedProperty.agent.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full border border-[#C9A962] object-cover"
                    />
                    <div>
                      <p className="text-sm font-cormorant text-[#E8DFD4] font-bold">{selectedProperty.agent.name}</p>
                      <p className="text-xs font-cinzel text-[#9C8B7A]">{selectedProperty.agent.title}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const p = selectedProperty;
                      setSelectedProperty(null);
                      handleOpenBooking(p);
                    }}
                    className="py-3 px-8 rounded-[4px] bg-brass text-[#1C1714] text-xs font-cinzel font-bold uppercase tracking-[0.15em] hover:brightness-110 transition-all shadow-md"
                  >
                    Schedule a Viewing
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL 2: BOOKING / VIEWING RESERVATION ================= */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-[#251E19] border border-[#4A3F35] rounded-[4px] p-8 shadow-2xl z-10 text-[#E8DFD4] ornate-frame"
            >
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="absolute top-4 right-4 text-[#9C8B7A] hover:text-[#E8DFD4]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="text-[#C9A962] text-xs font-cinzel uppercase tracking-[0.2em] font-bold">
                  Schedule a Viewing
                </span>
                <h3 className="text-2xl font-cormorant text-[#E8DFD4] font-normal mt-1">
                  {bookingProperty?.title || 'Property Viewing Request'}
                </h3>
              </div>

              {bookingSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 bg-brass/20 text-[#C9A962] rounded-full flex items-center justify-center mx-auto border border-[#C9A962]">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-cormorant text-[#E8DFD4]">Request Submitted</h4>
                  <p className="text-xs text-[#9C8B7A] font-crimson max-w-sm mx-auto">
                    Your viewing request has been recorded. In a live production environment, a property specialist will follow up to confirm the appointment.
                  </p>
                  <button
                    onClick={() => setIsBookingModalOpen(false)}
                    className="mt-4 px-6 py-2.5 rounded-[4px] bg-brass text-[#1C1714] text-xs font-cinzel font-bold uppercase tracking-widest"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-cinzel uppercase text-[#C9A962] mb-1">
                      Viewing Format
                    </label>
                    <select
                      value={bookingType}
                      onChange={(e) => setBookingType(e.target.value)}
                      className="w-full bg-[#1C1714] border border-[#4A3F35] rounded-[4px] p-2.5 text-xs text-[#E8DFD4] font-cinzel focus:outline-none focus:border-[#C9A962]"
                    >
                      <option>Private In-Person Viewing</option>
                      <option>Guided Digital Walkthrough</option>
                      <option>Architectural Consultation</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-cinzel uppercase text-[#C9A962] mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-[#1C1714] border border-[#4A3F35] rounded-[4px] p-2.5 text-xs text-[#E8DFD4] font-cinzel focus:outline-none focus:border-[#C9A962]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-cinzel uppercase text-[#C9A962] mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full bg-[#1C1714] border border-[#4A3F35] rounded-[4px] p-2.5 text-xs text-[#E8DFD4] placeholder-[#9C8B7A] italic focus:outline-none focus:border-[#C9A962]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-cinzel uppercase text-[#C9A962] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-[#1C1714] border border-[#4A3F35] rounded-[4px] p-2.5 text-xs text-[#E8DFD4] placeholder-[#9C8B7A] italic focus:outline-none focus:border-[#C9A962]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-cinzel uppercase text-[#C9A962] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+1 (000) 000-0000"
                        className="w-full bg-[#1C1714] border border-[#4A3F35] rounded-[4px] p-2.5 text-xs text-[#E8DFD4] placeholder-[#9C8B7A] italic focus:outline-none focus:border-[#C9A962]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel uppercase text-[#C9A962] mb-1">
                      Notes / Questions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={clientMessage}
                      onChange={(e) => setClientMessage(e.target.value)}
                      placeholder="Any specific questions or preferences for your viewing?"
                      className="w-full bg-[#1C1714] border border-[#4A3F35] rounded-[4px] p-2.5 text-xs text-[#E8DFD4] placeholder-[#9C8B7A] italic focus:outline-none focus:border-[#C9A962]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-4 rounded-[4px] bg-brass text-[#1C1714] text-xs font-cinzel font-bold uppercase tracking-[0.15em] hover:brightness-110 transition-all shadow-md"
                  >
                    Confirm Viewing Request
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= DRAWER: SAVED PROPERTIES ================= */}
      <AnimatePresence>
        {isSavedDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSavedDrawerOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 right-0 max-w-full flex pl-10"
            >
              <div className="w-screen max-w-md bg-[#251E19] border-l border-[#4A3F35] p-6 shadow-2xl flex flex-col justify-between text-[#E8DFD4]">
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-[#4A3F35]">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-[#8B2635]" />
                      <h3 className="text-xl font-cormorant text-[#E8DFD4]">Saved Demo Properties</h3>
                    </div>
                    <button
                      onClick={() => setIsSavedDrawerOpen(false)}
                      className="text-[#9C8B7A] hover:text-[#E8DFD4]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="py-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    {savedPropertiesList.length === 0 ? (
                      <div className="text-center py-12 text-[#9C8B7A]">
                        <Heart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-xs font-cinzel uppercase">No Saved Properties</p>
                        <p className="text-xs font-crimson mt-1">Bookmark properties to review them here.</p>
                      </div>
                    ) : (
                      savedPropertiesList.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center gap-4 bg-[#1C1714] border border-[#4A3F35] p-3 rounded-[4px]"
                        >
                          <img
                            src={p.heroImage}
                            alt={p.title}
                            referrerPolicy="no-referrer"
                            className="w-16 h-12 object-cover rounded-[3px] filter sepia-[0.3]"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-cormorant text-[#E8DFD4] truncate">{p.title}</h4>
                            <p className="text-[11px] font-cinzel text-[#C9A962]">${p.price.toLocaleString()}</p>
                          </div>
                          <button
                            onClick={() => toggleSaveProperty(p.id)}
                            className="text-[#9C8B7A] hover:text-rose-400 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {savedPropertiesList.length > 0 && (
                  <button
                    onClick={() => {
                      setIsSavedDrawerOpen(false);
                      handleOpenBooking(savedPropertiesList[0]);
                    }}
                    className="w-full py-3 rounded-[4px] bg-brass text-[#1C1714] text-xs font-cinzel font-bold uppercase tracking-[0.15em] shadow-md"
                  >
                    Inquire About Saved Properties
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
