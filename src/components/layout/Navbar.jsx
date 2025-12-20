import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getLoggedInUser, logoutUser } from "../../utils/auth";
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Home, 
  Briefcase, 
  LayoutDashboard, 
  Mail, 
  Users,
  ChevronDown,
  Sparkles
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [glowing, setGlowing] = useState(true);

  const toggleMenu = () => {
    setMobileOpen(!mobileOpen);
    if (!mobileOpen) {
      // Add a subtle bounce effect when opening
      setTimeout(() => {
        document.querySelector('.mobile-menu')?.classList.add('animate-bounce-in');
      }, 50);
    }
  };

  const handleLogout = () => {
    // Add logout animation
    document.querySelector('.logout-btn')?.classList.add('animate-pulse');
    setTimeout(() => {
      logoutUser();
      setUser(null);
      navigate("/login");
    }, 300);
  };

  useEffect(() => {
    const user = getLoggedInUser();
    setUser(user);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Add pulsing glow effect every 3 seconds
    const glowInterval = setInterval(() => {
      setGlowing(prev => !prev);
    }, 3000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(glowInterval);
    };
  }, []);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/jobs-listings", label: "Jobs", icon: Briefcase },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/contact", label: "Contact", icon: Mail },
    { path: "/candidates", label: "About Us", icon: Users },
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`relative px-4 py-2.5 rounded-xl transition-all duration-500 group overflow-hidden ${
              isActive 
                ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg' 
                : 'text-gray-700 hover:text-blue-600 bg-white/80 hover:bg-white'
            }`}
            onMouseEnter={() => {
              setHoveredLink(item.path);
              // Add ripple effect
              const element = document.getElementById(`nav-${item.path}`);
              if (element) {
                element.classList.add('animate-ripple');
                setTimeout(() => {
                  element.classList.remove('animate-ripple');
                }, 600);
              }
            }}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {/* Hover background animation */}
            <div 
              id={`nav-${item.path}`}
              className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
            />
            
            <div className="relative flex items-center gap-3">
              <Icon className={`w-4 h-4 transition-all duration-500 ${
                hoveredLink === item.path ? 'scale-125 rotate-12' : ''
              } ${isActive ? 'text-white' : 'text-blue-500'}`} />
              <span className={`font-medium transition-all duration-300 ${
                hoveredLink === item.path ? 'tracking-wide' : ''
              }`}>{item.label}</span>
              
              {/* Animated indicator for active link */}
              {isActive && (
                <div className="absolute -right-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
              )}
            </div>
            
            {/* Floating particles on hover */}
            {hoveredLink === item.path && !isActive && (
              <>
                <div className="absolute top-1 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-float" style={{ animationDelay: '0.1s' }}></div>
                <div className="absolute top-2 right-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-float" style={{ animationDelay: '0.3s' }}></div>
              </>
            )}
          </Link>
        );
      })}
    </>
  );

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-700 ${
      scrolled 
        ? 'bg-gradient-to-r from-white via-blue-50/80 to-indigo-50/80 backdrop-blur-xl shadow-2xl py-3 border-b border-blue-100/50' 
        : 'bg-gradient-to-r from-white via-blue-50 to-indigo-50 shadow-lg py-4'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/40 rounded-full animate-float"
            style={{
              left: `${10 + i * 20}%`,
              top: '30%',
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
        
        {/* Pulsing glow effect */}
        <div className={`absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl transition-all duration-3000 ${
          glowing ? 'opacity-70 scale-125' : 'opacity-40 scale-100'
        }`} />
        <div className={`absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl transition-all duration-3000 ${
          glowing ? 'opacity-70 scale-125' : 'opacity-40 scale-100'
        }`} style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo with animation */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group relative"
            onMouseEnter={() => {
              document.querySelector('.logo-glow')?.classList.add('animate-pulse');
            }}
            onMouseLeave={() => {
              document.querySelector('.logo-glow')?.classList.remove('animate-pulse');
            }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="logo-glow absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
              
              {/* Logo container */}
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
                <span className="text-white font-bold text-xl">DH</span>
                
                {/* Sparkle effect */}
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin-slow" />
              </div>
              
              {/* Border animation */}
              <div className="absolute -inset-1 border-2 border-transparent rounded-2xl group-hover:border-blue-400/50 transition-all duration-700"></div>
            </div>
            
            <div className="transform transition-all duration-500 group-hover:translate-x-1">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                DevHire
              </h1>
              <p className="text-xs text-gray-500 -mt-1 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Hiring made brilliant
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm p-2 rounded-2xl border border-white/40 shadow-inner">
              <NavLinks />
            </div>

            <div className="h-8 w-px bg-gradient-to-b from-transparent via-blue-300 to-transparent mx-3 animate-pulse"></div>

            {/* User/Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                    // Add click animation
                    document.querySelector('.user-btn')?.classList.add('animate-bounce');
                    setTimeout(() => {
                      document.querySelector('.user-btn')?.classList.remove('animate-bounce');
                    }, 300);
                  }}
                  className="user-btn flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-500 group shadow-lg hover:shadow-xl"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -inset-1 border-2 border-blue-400/50 rounded-full opacity-0 group-hover:opacity-100 animate-ping-slow"></div>
                  </div>
                  <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {user.name || "Account"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-500 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Dropdown Menu with animation */}
                <div className={`absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 overflow-hidden transition-all duration-500 ${
                  dropdownOpen 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                }`}>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-white/50">
                    <p className="font-bold text-gray-800">{user.email}</p>
                    <p className="text-sm text-gray-600 mt-1">Welcome back!</p>
                  </div>
                  
                  <div className="p-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50/80 transition-all duration-300 hover:translate-x-2 group"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <span>My Profile</span>
                    </Link>
                    
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50/80 transition-all duration-300 hover:translate-x-2 group"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span>Settings</span>
                    </Link>
                    
                    <div className="border-t border-gray-100/50 mt-2 pt-2">
                      <button
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="logout-btn flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50/80 text-red-600 w-full transition-all duration-300 hover:translate-x-2 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                          <LogOut className="w-4 h-4" />
                        </div>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-gray-700 hover:text-blue-600 font-medium transition-all duration-500 rounded-xl hover:bg-white/80 backdrop-blur-sm border border-transparent hover:border-blue-200 hover:shadow-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="relative px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-indigo-600 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 overflow-hidden group"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700"></div>
                  <span className="relative flex items-center gap-2">
                    Get Started
                    <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-700 relative overflow-hidden ${
              mobileOpen 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rotate-90' 
                : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 hover:border-blue-300 hover:scale-110'
            }`}
          >
            {/* Button background animation */}
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-transform duration-700 ${
              mobileOpen ? 'translate-x-0' : '-translate-x-full'
            }`}></div>
            
            {mobileOpen ? (
              <X className="w-6 h-6 relative z-10 animate-spin-in" />
            ) : (
              <Menu className="w-6 h-6 relative z-10" />
            )}
          </button>
        </div>

        {/* Mobile Menu with animation */}
        <div className={`md:hidden mobile-menu overflow-hidden transition-all duration-700 ${
          mobileOpen 
            ? 'max-h-[500px] opacity-100 mt-4 scale-100' 
            : 'max-h-0 opacity-0 scale-95'
        }`}>
          <div className="bg-gradient-to-br from-white via-blue-50/90 to-indigo-50/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/40">
            <div className="space-y-2 mb-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      setMobileOpen(false);
                      // Add click animation
                      const element = document.querySelector(`#mobile-${item.path}`);
                      if (element) {
                        element.classList.add('animate-pulse');
                        setTimeout(() => {
                          element.classList.remove('animate-pulse');
                        }, 300);
                      }
                    }}
                    id={`mobile-${item.path}`}
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-500 transform hover:scale-[1.02] ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg -translate-x-1'
                        : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-500'}`} />
                    <span className="font-semibold">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full animate-ping"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth Section */}
            <div className="pt-6 border-t border-white/30">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/40">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -inset-1 border-2 border-blue-400/50 rounded-full animate-ping-slow"></div>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{user.name || "User"}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="p-3 bg-white/80 backdrop-blur-sm text-center rounded-xl font-semibold hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-105"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="logout-btn p-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block p-3.5 bg-white/80 backdrop-blur-sm text-center rounded-xl font-semibold hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-105"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="block p-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-bold text-center hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Get Started Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes spin-in {
          from {
            transform: rotate(-180deg) scale(0);
            opacity: 0;
          }
          to {
            transform: rotate(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes ping-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-ripple {
          animation: ripple 0.6s linear;
        }
        
        .animate-spin-in {
          animation: spin-in 0.5s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;