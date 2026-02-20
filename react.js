import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, Mail, MapPin, 
  Facebook, Instagram, Twitter, ArrowRight, 
  Sprout, Fish, Bird, Wheat, ShoppingBag, 
  GraduationCap, Users, Award 
} from 'lucide-react';

// --- DATA & ASSETS ---

const images = {
  hero: [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920", // General Farm
    "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=1920", // Poultry
    "https://images.unsplash.com/photo-1526315682697-7d7286161836?auto=format&fit=crop&q=80&w=1920", // Hydroponics
    "https://images.unsplash.com/photo-1524244243615-d41f71a0695a?auto=format&fit=crop&q=80&w=1920", // Fish
    "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=1920", // Youth/Training
  ],
  services: {
    poultry: "https://images.unsplash.com/photo-1563205093-64906059d480?auto=format&fit=crop&q=80&w=800",
    fishery: "https://images.unsplash.com/photo-1592661580971-557375232756?auto=format&fit=crop&q=80&w=800",
    crops: "https://images.unsplash.com/photo-1627920769843-2244f2ccf46f?auto=format&fit=crop&q=80&w=800",
    processing: "https://images.unsplash.com/photo-1605218457335-5a5879a5b32c?auto=format&fit=crop&q=80&w=800", // Cassava/Processing
    merchandise: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800",
  },
  gallery: [
    "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1600155593883-7d72223722a4?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1582559091913-c35496464521?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1588616050518-e3c79c855b74?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1599320668971-897368d4a36b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=600",
  ],
  founder: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800" // Placeholder for Ali
};

const navigation = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Services', id: 'services' },
  { name: 'Products', id: 'products' },
  { name: 'Training', id: 'training' },
  { name: 'Projects', id: 'projects' },
  { name: 'Blog', id: 'blog' },
  { name: 'Contact', id: 'contact' },
];

const testimonials = [
  { name: "John Doe", role: "Student Trainee", text: "The NeGAP program changed my perspective on agriculture. I now run my own poultry farm." },
  { name: "Sarah Aminu", role: "Wholesale Buyer", text: "I.B Smart Farms supplies the best catfish in the region. Always fresh and consistent." },
  { name: "Emmanuel O.", role: "Agripreneur", text: "Ali's mentorship helped me secure my first grant. Highly recommended!" },
];

// --- COMPONENTS ---

const SectionTitle = ({ title, subtitle, align = "center" }) => (
  <div className={`mb-12 text-${align}`}>
    <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">{title}</h2>
    {subtitle && <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mb-4"></div>}
    {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const Card = ({ title, description, icon: Icon, image, onClick }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group flex flex-col h-full">
    {image && (
      <div className="h-48 overflow-hidden shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
    )}
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center gap-3 mb-3">
        {Icon && <div className="p-2 bg-green-100 rounded-lg text-green-700"><Icon size={24} /></div>}
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">{description}</p>
      {onClick && (
        <button onClick={onClick} className="text-green-700 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto pt-4">
          Learn More <ArrowRight size={16} />
        </button>
      )}
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  // Auto-scroll hero
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % images.hero.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navigateTo = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    scrollToTop();
  };

  // --- PAGES CONTENT ---

  const renderHome = () => (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative h-[80vh] md:h-[90vh] bg-gray-900 overflow-hidden">
        {images.hero.map((img, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === heroIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={img} alt="Farm Hero" className="w-full h-full object-cover opacity-50" />
          </div>
        ))}
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-20 z-10">
          <div className="animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-yellow-500 text-black font-bold text-sm mb-6 tracking-wide uppercase">
              Welcome to I.B SMART FARMS
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Building Sustainable Agriculture <br className="hidden md:block"/>
              Through <span className="text-green-400">Innovation</span> & <span className="text-yellow-400">Empowerment</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Poultry • Fisheries • Crop Production • Agro Processing • Youth Empowerment
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button onClick={() => navigateTo('contact')} className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105 hover:bg-green-500">
                Partner With Us
              </button>
              <button onClick={() => navigateTo('training')} className="px-8 py-4 bg-white hover:bg-gray-100 text-green-800 font-bold rounded-lg shadow-lg transition-all transform hover:scale-105">
                Join Our Training
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-20">
          {images.hero.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setHeroIndex(idx)}
              className={`h-3 rounded-full transition-all duration-300 ${idx === heroIndex ? 'bg-yellow-500 w-8' : 'bg-white/50 w-3 hover:bg-white'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-green-700 font-bold tracking-wider uppercase mb-2">Who We Are</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Redefining Agriculture in Nigeria</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                I.B SMART FARMS is an innovation-driven agricultural enterprise committed to modern, sustainable, and profitable farming systems. We combine practical production with capacity building to create opportunities across the agricultural value chain.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                From poultry and fish production to crop cultivation, garri processing, agro merchandise supply, and mentorship programs, we operate as a complete agribusiness ecosystem.
              </p>
              <button onClick={() => navigateTo('about')} className="text-green-700 font-bold border-b-2 border-green-700 pb-1 hover:text-green-800">
                Read Our Full Story
              </button>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <img src={images.services.poultry} className="rounded-2xl shadow-lg w-full h-64 object-cover hover:shadow-xl transition" alt="Poultry" />
              <img src={images.services.fishery} className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8 hover:shadow-xl transition" alt="Fishery" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Operations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle title="Our Core Operations" subtitle="Diversified excellence across the agricultural value chain." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              title="Poultry Production" 
              image={images.services.poultry}
              icon={Bird}
              description="High-quality poultry products using efficient management practices for healthy birds and premium output." 
            />
            <Card 
              title="Fisheries & Aquaculture" 
              image={images.services.fishery}
              icon={Fish}
              description="Responsible aquaculture practices focusing on catfish and fingerling production with consistent supply." 
            />
            <Card 
              title="Crop & Nursery" 
              image={images.services.crops}
              icon={Sprout}
              description="Cultivating vegetables and crops using conventional and soilless farming techniques." 
            />
            <Card 
              title="Agro Processing" 
              image={images.services.processing}
              icon={Wheat}
              description="Adding value to produce, specializing in premium Garri processing and other food products." 
            />
            <Card 
              title="Merchandise & Inputs" 
              image={images.services.merchandise}
              icon={ShoppingBag}
              description="Supplying high-quality agricultural inputs, tools, and farm-related products." 
            />
            <Card 
              title="Training & Empowerment" 
              image={images.hero[4]}
              icon={GraduationCap}
              description="Mentorship, hydroponics training, and empowerment programs for youth and women." 
              onClick={() => navigateTo('training')}
            />
          </div>
        </div>
      </section>

      {/* Stats/Impact */}
      <section className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "100+", label: "Students Trained" },
              { num: "50+", label: "Farmers Mentored" },
              { num: "10+", label: "Hectares Cultivated" },
              { num: "1000+", label: "Tons Produced" }
            ].map((stat, idx) => (
              <div key={idx} className="p-4 hover:bg-green-800 rounded-lg transition">
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">{stat.num}</div>
                <div className="text-green-200 uppercase tracking-wide text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle title="Success Stories" subtitle="Hear from our partners, students, and customers." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex gap-1 text-yellow-500 mb-4">★★★★★</div>
                <p className="text-gray-600 italic mb-6">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <span className="text-sm text-green-600">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-yellow-500 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Start Your Agricultural Journey?</h2>
          <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">Partner with I.B SMART FARMS today and become part of a sustainable and innovative agricultural future.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => navigateTo('contact')} className="px-8 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition shadow-lg">Contact Us</button>
            <button onClick={() => navigateTo('training')} className="px-8 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg">Join Training</button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderAbout = () => (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-green-900 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About I.B SMART FARMS</h1>
        <p className="text-green-100 max-w-2xl mx-auto px-4">Innovation • Integrity • Sustainability • Empowerment</p>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Story */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-yellow-500 pl-4">Our Story</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            I.B SMART FARMS was established with a clear vision: to create a sustainable agricultural enterprise that combines production, innovation, and empowerment. Recognizing the challenges of food insecurity, youth unemployment, and limited access to practical agricultural knowledge, the farm was built not just as a production center but as a platform for impact.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Over time, I.B SMART FARMS has grown into a diversified agribusiness engaging in poultry production, fisheries, crop cultivation, agro-processing, and agribusiness training.
          </p>
        </div>

        {/* Mission/Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-green-50 p-10 rounded-2xl border border-green-100 hover:shadow-lg transition">
            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-green-700 mb-6">
              <Award size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To promote sustainable agricultural production, value addition, and agribusiness development through innovation, training, and inclusive empowerment of youth and women.
            </p>
          </div>
          <div className="bg-yellow-50 p-10 rounded-2xl border border-yellow-100 hover:shadow-lg transition">
            <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-700 mb-6">
              <Sprout size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To become a leading agricultural innovation and training hub in Nigeria, driving food security, economic growth, and community transformation.
            </p>
          </div>
        </div>

        {/* Founder Profile */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 h-96 md:h-auto bg-gray-200 relative">
               <img src={images.founder} alt="Ali Ibrahim Musa" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                 <h3 className="text-2xl font-bold">Ali Ibrahim Musa</h3>
                 <p className="text-yellow-400">Founder & CEO</p>
               </div>
            </div>
            <div className="md:w-2/3 p-8 md:p-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Meet The Visionary</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Ali Ibrahim Musa is an agripreneur, agricultural innovator, and youth development advocate dedicated to transforming agriculture into a tool for sustainable food security. He is the visionary behind the <span className="font-bold text-green-700">NextGen Agriculture Program (NeGAP)</span>.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 border-b pb-1">Leadership Roles</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• COO, Raynative Smart Farms, Shika Zaria</li>
                    <li>• Board Member, FARM TRYBE AGROSPACE LTD</li>
                    <li>• Chairman of Chairmen, ABU Student Representative Council (2024/2025)</li>
                    <li>• Faculty Chairman, Faculty of Agriculture (2024/2025)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 border-b pb-1">Awards & Grants</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Farmer of the Year (NAAS ABU Zaria, 2024)</li>
                    <li>• Fellow, Young Africa Innovates (YAI)</li>
                    <li>• Deal Room 2.0 Grant Winner (Soilless Farm Lab)</li>
                    <li>• Young Cassava Changemakers Winner 2025</li>
                    <li>• Ten Outstanding Young Persons (TOYP) Award 2025</li>
                  </ul>
                </div>
              </div>
              
              <div className="italic text-gray-500 border-l-4 border-green-500 pl-4">
                "We are not just building a farm — but a platform for agricultural transformation, innovation, and sustainable impact."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="animate-fade-in">
      <div className="bg-gray-900 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-gray-300">Comprehensive Solutions for Modern Agriculture</p>
      </div>
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid gap-16">
          {/* Poultry */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <img src={images.services.poultry} className="rounded-2xl shadow-xl w-full" alt="Poultry" />
            </div>
            <div className="md:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <Bird className="text-yellow-500" size={32} />
                <h2 className="text-3xl font-bold text-green-900">Poultry Production</h2>
              </div>
              <p className="text-gray-600 text-lg mb-6">We produce high-quality poultry products using efficient and sustainable management practices.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Broiler Production</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Layer Management</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Poultry Advisory Services</li>
              </ul>
            </div>
          </div>

          {/* Fishery */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10">
             <div className="md:w-1/2">
              <img src={images.services.fishery} className="rounded-2xl shadow-xl w-full" alt="Fishery" />
            </div>
            <div className="md:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <Fish className="text-blue-500" size={32} />
                <h2 className="text-3xl font-bold text-green-900">Fisheries & Aquaculture</h2>
              </div>
              <p className="text-gray-600 text-lg mb-6">Our fish farming operations focus on responsible aquaculture practices that guarantee quality and safety.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Table Size Catfish</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> High-Quality Fingerlings</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Pond Setup & Management</li>
              </ul>
            </div>
          </div>

          {/* Crops */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <img src={images.services.crops} className="rounded-2xl shadow-xl w-full" alt="Crops" />
            </div>
            <div className="md:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <Sprout className="text-green-500" size={32} />
                <h2 className="text-3xl font-bold text-green-900">Crop & Nursery</h2>
              </div>
              <p className="text-gray-600 text-lg mb-6">Innovative cultivation of vegetables and crops using both conventional and soilless methods.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Hydroponics Systems</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Vegetable Farming (Tomatoes, Peppers)</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Seedling Production</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      <div className="bg-yellow-500 text-gray-900 py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Our Products</h1>
        <p className="text-gray-800">Fresh from the farm to your table.</p>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Food Products */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
              <ShoppingBag /> Food Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4 hover:border-green-500 transition cursor-pointer">
                <img src={images.services.processing} className="w-full h-40 object-cover rounded mb-4" alt="Garri" />
                <h3 className="font-bold text-lg">Premium Garri</h3>
                <p className="text-sm text-gray-500">Clean, sand-free, processed hygienically.</p>
              </div>
               <div className="border rounded-lg p-4 hover:border-green-500 transition cursor-pointer">
                <img src={images.services.fishery} className="w-full h-40 object-cover rounded mb-4" alt="Fish" />
                <h3 className="font-bold text-lg">Fresh Catfish</h3>
                <p className="text-sm text-gray-500">Live or smoked to perfection.</p>
              </div>
              <div className="border rounded-lg p-4 hover:border-green-500 transition cursor-pointer">
                <img src={images.services.poultry} className="w-full h-40 object-cover rounded mb-4" alt="Chicken" />
                <h3 className="font-bold text-lg">Poultry Meat & Eggs</h3>
                <p className="text-sm text-gray-500">Fresh crates and processed birds.</p>
              </div>
            </div>
          </div>

          {/* Agro Inputs */}
           <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
              <Sprout /> Agro Inputs & Merchandise
            </h2>
             <div className="space-y-4">
               {['High-yield Seedlings', 'Farm Tools & Equipment', 'Growing Media (Coco peat)', 'Agro Chemicals & Fertilizers'].map((item, idx) => (
                 <div key={idx} className="flex justify-between items-center p-4 border-b last:border-0 hover:bg-gray-50 transition">
                   <span className="font-medium text-gray-700">{item}</span>
                   <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Available</span>
                 </div>
               ))}
             </div>
             <div className="mt-8 bg-green-50 p-6 rounded-lg text-center">
               <p className="mb-4 text-gray-700">Need specific supplies for your farm?</p>
               <a href="https://wa.me/2347062884108" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 mx-auto hover:bg-green-700 transition w-fit">
                 <Phone size={18} /> Order via WhatsApp
               </a>
             </div>
          </div>
        </div>
         </div>
    </div>
  );

  const renderTraining = () => (
    <div className="animate-fade-in">
       <div className="bg-green-800 text-white py-20 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Training & Empowerment</h1>
        <p className="text-green-100 max-w-2xl mx-auto">Raising the next generation of agricultural innovators.</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
           <div className="order-2 lg:order-1">
             <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Programs</h2>
             <div className="space-y-6">
               <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
                 <div className="bg-yellow-100 p-3 rounded-lg h-fit"><Users className="text-yellow-700" /></div>
                 <div>
                   <h3 className="text-xl font-bold mb-2">NextGen Agriculture Program (NeGAP)</h3>
                   <p className="text-gray-600">A flagship initiative designed to equip students and youth with practical skills in modern farming.</p>
                 </div>
               </div>
               <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
                 <div className="bg-green-100 p-3 rounded-lg h-fit"><Sprout className="text-green-700" /></div>
                 <div>
                   <h3 className="text-xl font-bold mb-2">Hydroponics & Soilless Farming</h3>
                   <p className="text-gray-600">Specialized training on setting up and managing future-forward farming systems without soil.</p>
                 </div>
               </div>
               <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
                 <div className="bg-blue-100 p-3 rounded-lg h-fit"><Users className="text-blue-700" /></div>
                 <div>
                   <h3 className="text-xl font-bold mb-2">Women Agribusiness Empowerment</h3>
                   <p className="text-gray-600">Cohorts dedicated to supporting women with the skills and resources to start agribusinesses.</p>
                 </div>
               </div>
             </div>
             <button onClick={() => navigateTo('contact')} className="mt-8 bg-green-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-800 transition shadow-lg">Register for Upcoming Cohort</button>
           </div>
           <div className="order-1 lg:order-2 h-96 lg:h-auto">
             <img src={images.hero[4]} alt="Training Session" className="rounded-2xl shadow-2xl w-full h-full object-cover" />
           </div>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="animate-fade-in">
      <div className="container mx-auto px-4 py-16">
        <SectionTitle title="Projects & Gallery" subtitle="Visualizing our impact on the community and land." />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.gallery.map((img, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-xl h-64 cursor-pointer">
              <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold border border-white px-4 py-2 rounded">View Project</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
           <h3 className="text-2xl font-bold mb-6">Recent Initiatives</h3>
           <div className="grid md:grid-cols-2 gap-8">
             <div className="border-l-4 border-green-500 pl-4">
               <h4 className="font-bold text-lg">Net House Project</h4>
               <p className="text-gray-600">Construction of controlled environment agriculture systems for high-value vegetables.</p>
             </div>
             <div className="border-l-4 border-yellow-500 pl-4">
               <h4 className="font-bold text-lg">Student Bootcamps</h4>
               <p className="text-gray-600">Intensive weekend agricultural training sessions for university students.</p>
             </div>
             <div className="border-l-4 border-blue-500 pl-4">
               <h4 className="font-bold text-lg">Community Outreach</h4>
               <p className="text-gray-600">Free advisory and vaccination campaigns for local small-holder farmers.</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderBlog = () => (
    <div className="container mx-auto px-4 py-16 animate-fade-in">
      <SectionTitle title="Farm Insights" subtitle="Knowledge sharing for the modern farmer." />
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Starting Poultry in Nigeria", cat: "Poultry", date: "Oct 12, 2025" },
          { title: "Profitable Fish Farming Tips", cat: "Fishery", date: "Sep 28, 2025" },
          { title: "Guide to Garri Processing Business", cat: "Business", date: "Sep 15, 2025" },
          { title: "Hydroponics for Beginners", cat: "Technology", date: "Aug 30, 2025" },
          { title: "Agribusiness Opportunities for Youth", cat: "Empowerment", date: "Aug 10, 2025" }
        ].map((post, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer border border-gray-100">
            <div className="h-48 bg-gray-200 relative">
               <img src={images.hero[idx % images.hero.length]} className="w-full h-full object-cover" alt="Blog Thumb" />
               <span className="absolute top-4 right-4 bg-yellow-500 text-xs font-bold px-2 py-1 rounded">{post.cat}</span>
            </div>
            <div className="p-6">
              <span className="text-gray-400 text-xs">{post.date}</span>
              <h3 className="font-bold text-xl mt-2 mb-3 hover:text-green-700">{post.title}</h3>
              <p className="text-gray-600 text-sm">Learn the essential steps and strategies to succeed in this sector...</p>
              <button className="mt-4 text-green-600 font-bold text-sm flex items-center gap-1">Read More <ArrowRight size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="animate-fade-in">
      <div className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-gray-400">We'd love to hear from you.</p>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-700"><Phone /></div>
                <div>
                  <h4 className="font-bold text-gray-900">Phone & WhatsApp</h4>
                  <p className="text-gray-600">+234 706 288 4108</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-700"><Mail /></div>
                <div>
                  <h4 className="font-bold text-gray-900">Email</h4>
                  <p className="text-gray-600">I.bsmartfarms@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-700"><MapPin /></div>
                <div>
                  <h4 className="font-bold text-gray-900">Location</h4>
                  <p className="text-gray-600">Zaria, Kaduna State, Nigeria</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="font-bold text-gray-900 mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"><Facebook size={20}/></button>
                <button className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition"><Instagram size={20}/></button>
                <button className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition"><Twitter size={20}/></button>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none">
                  <option>General Inquiry</option>
                  <option>Training Registration</option>
                  <option>Product Order</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-lg transition shadow-lg transform active:scale-95">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen flex flex-col">
      {/* INJECT CUSTOM STYLES HERE FOR ANIMATIONS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md transition-all">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              onClick={() => navigateTo('home')} 
              className="cursor-pointer flex items-center gap-2 hover:opacity-80 transition"
            >
              <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">I.B</div>
              <div className="leading-tight">
                <span className="block font-bold text-gray-900 text-lg tracking-tight">I.B SMART FARMS</span>
                <span className="block text-xs text-green-600 font-semibold tracking-widest uppercase">Innovation & Growth</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex gap-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`font-medium transition-colors hover:text-green-600 relative py-2 ${activePage === item.id ? 'text-green-700 font-bold' : 'text-gray-600'}`}
                >
                  {item.name}
                  {activePage === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-gray-800 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl animate-fade-in">
            <div className="flex flex-col p-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`text-left py-3 px-4 rounded-lg transition ${activePage === item.id ? 'bg-green-50 text-green-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        {activePage === 'home' && renderHome()}
        {activePage === 'about' && renderAbout()}
        {activePage === 'services' && renderServices()}
        {activePage === 'products' && renderProducts()}
        {activePage === 'training' && renderTraining()}
        {activePage === 'projects' && renderProjects()}
        {activePage === 'blog' && renderBlog()}
        {activePage === 'contact' && renderContact()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6 text-white">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center font-bold">I.B</div>
                <span className="font-bold text-xl">I.B SMART FARMS</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                A leading agricultural innovation and training hub in Nigeria. We combine production, technology, and empowerment to drive food security.
              </p>
              <div className="flex gap-4">
                <button className="hover:text-white transition p-2 bg-gray-800 rounded-full"><Facebook size={18} /></button>
                <button className="hover:text-white transition p-2 bg-gray-800 rounded-full"><Twitter size={18} /></button>
                <button className="hover:text-white transition p-2 bg-gray-800 rounded-full"><Instagram size={18} /></button>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => navigateTo('about')} className="hover:text-green-400 transition">About Us</button></li>
                <li><button onClick={() => navigateTo('services')} className="hover:text-green-400 transition">Our Services</button></li>
                <li><button onClick={() => navigateTo('training')} className="hover:text-green-400 transition">NeGAP Training</button></li>
                <li><button onClick={() => navigateTo('projects')} className="hover:text-green-400 transition">Projects</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Our Services</h4>
              <ul className="space-y-3 text-sm">
                <li>Poultry Production</li>
                <li>Fisheries & Aquaculture</li>
                <li>Crop & Hydroponics</li>
                <li>Agro Processing (Garri)</li>
                <li>Consultancy</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contact Info</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3 items-start">
                  <MapPin size={18} className="text-green-500 flex-shrink-0 mt-1" />
                  <span>Zaria, Kaduna State, Nigeria</span>
                </li>
                <li className="flex gap-3 items-center">
                  <Phone size={18} className="text-green-500 flex-shrink-0" />
                  <span>+234 706 288 4108</span>
                </li>
                <li className="flex gap-3 items-center">
                  <Mail size={18} className="text-green-500 flex-shrink-0" />
                  <span>I.bsmartfarms@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} I.B SMART FARMS. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed for Excellence.</p>
          </div>
        </div>
      </footer>
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/2347062884108"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition z-50 animate-bounce"
        title="Chat with us"
      >
        <Phone size={24} />
      </a>
    </div>
  );
}