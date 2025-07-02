import React, { useState, useEffect } from 'react';
import { Menu, X, Home, ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  houseColors?: {
    primary: string;
    secondary: string;
    gradient: string;
  };
}

const Header: React.FC<HeaderProps> = ({ houseColors }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getColorClasses = () => {
    if (!houseColors) return 'text-white hover:text-gray-300';
    
    const colorMap: { [key: string]: string } = {
      red: 'text-red-400 hover:text-red-300',
      green: 'text-green-400 hover:text-green-300',
      blue: 'text-blue-400 hover:text-blue-300',
      yellow: 'text-yellow-400 hover:text-yellow-300'
    };
    
    return colorMap[houseColors.primary] || 'text-white hover:text-gray-300';
  };

  const getBorderColor = () => {
    if (!houseColors) return 'border-white/20';
    
    const colorMap: { [key: string]: string } = {
      red: 'border-red-500/20',
      green: 'border-green-500/20',
      blue: 'border-blue-500/20',
      yellow: 'border-yellow-500/20'
    };
    
    return colorMap[houseColors.primary] || 'border-white/20';
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? `bg-black/95 backdrop-blur-2xl border-b ${getBorderColor()} shadow-2xl` 
          : 'bg-transparent'
      }`}
    >
      {/* Magical glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${houseColors?.gradient || 'from-blue-600/10 to-purple-600/10'} opacity-0 ${isScrolled ? 'opacity-100' : ''} transition-opacity duration-700`}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {!isHomePage && (
              <button
                onClick={() => navigate('/')}
                className={`group relative p-2 sm:p-3 rounded-xl hover:bg-white/10 transition-all duration-500 ${getColorClasses()}`}
              >
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 group-hover:-translate-x-1 transition-all duration-300" />
                <div className="absolute inset-0 bg-white/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </button>
            )}
            
            <button
              onClick={() => navigate('/')}
              className={`group flex items-center space-x-2 sm:space-x-3 cursor-pointer relative ${getColorClasses()}`}
            >
              <div className="relative">
                <Home className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 transform group-hover:scale-110 transition-all duration-500 ease-out" />
                <Sparkles className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="relative">
                <span className="text-lg sm:text-xl font-bold transition-all duration-500 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  HOGWARTS
                </span>
                <div className={`absolute -bottom-0.5 sm:-bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${houseColors?.gradient || 'from-white to-gray-300'} group-hover:w-full transition-all duration-500`}></div>
              </div>
            </button>
          </div>

          {!isHomePage && (
            <nav className="hidden md:flex space-x-1 lg:space-x-2">
              {[
                { name: 'Início', id: 'hero' },
                { name: 'História', id: 'history' },
                { name: 'Membros', id: 'members' },
                { name: 'Características', id: 'traits' }
              ].map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative px-4 lg:px-6 py-2 lg:py-3 transition-all duration-500 ${getColorClasses()}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 font-medium text-sm lg:text-base">{item.name}</span>
                  <div className={`absolute inset-0 bg-gradient-to-r ${houseColors?.gradient || 'from-white/10 to-gray-300/10'} rounded-xl scale-0 group-hover:scale-100 transition-all duration-300 ease-out`}></div>
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r ${houseColors?.gradient || 'from-white to-gray-300'} group-hover:w-3/4 transition-all duration-500 ease-out`}></div>
                </button>
              ))}
            </nav>
          )}

          {!isHomePage && (
            <button
              className="md:hidden group relative p-2 sm:p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="relative">
                {isMobileMenuOpen ? 
                  <X className={`h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-90 transition-transform duration-300 ${getColorClasses()}`} /> : 
                  <Menu className={`h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-300 ${getColorClasses()}`} />
                }
              </div>
              <div className="absolute inset-0 bg-white/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </button>
          )}
        </div>

        {/* Enhanced Mobile Menu */}
        {!isHomePage && (
          <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-80 pb-4 sm:pb-6 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${houseColors?.gradient || 'from-blue-600/10 to-purple-600/10'} rounded-2xl blur-xl`}></div>
              <nav className="relative flex flex-col space-y-1 sm:space-y-2 pt-3 sm:pt-4 bg-black/50 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border border-white/10">
                {[
                  { name: 'Início', id: 'hero' },
                  { name: 'História', id: 'history' },
                  { name: 'Membros', id: 'members' },
                  { name: 'Características', id: 'traits' }
                ].map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`group text-left px-4 sm:px-6 py-3 sm:py-4 hover:bg-white/10 rounded-xl transition-all duration-300 ${getColorClasses()}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block font-medium text-sm sm:text-base">
                      {item.name}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;