import React, { useEffect, useState } from 'react';
import { Shield, Zap, Crown, Heart, Sparkles, Wand2 } from 'lucide-react';

interface HouseData {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  motto: string;
  description: string;
  founder: string;
}

interface HeroProps {
  houseData: HouseData;
}

const Hero: React.FC<HeroProps> = ({ houseData }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getHouseIcon = () => {
    switch (houseData.name) {
      case 'Grifinória': return Shield;
      case 'Sonserina': return Zap;
      case 'Corvinal': return Crown;
      case 'Lufa-Lufa': return Heart;
      default: return Shield;
    }
  };

  const getColorClasses = () => {
    const colorMap: { [key: string]: string } = {
      red: 'text-red-400',
      green: 'text-green-400',
      blue: 'text-blue-400',
      yellow: 'text-yellow-400'
    };
    return colorMap[houseData.colors.primary] || 'text-white';
  };

  const HouseIcon = getHouseIcon();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-32">
      {/* Enhanced Background Layers */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-${houseData.colors.primary}-950/30`}></div>
        
        {/* Floating magical orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-${houseData.colors.primary}-400/10 animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 40 + 15}px`,
                height: `${Math.random() * 40 + 15}px`,
                animation: `gentleFloat ${15 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>

        {/* Sparkle effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `sparkle ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            >
              <Sparkles className={`h-1.5 w-1.5 sm:h-2 sm:w-2 text-${houseData.colors.primary}-400 opacity-30`} />
            </div>
          ))}
        </div>

        {/* Floating magical wands */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `wandFloat ${20 + Math.random() * 15}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 8}s`
              }}
            >
              <Wand2 className={`h-3 w-3 sm:h-4 sm:w-4 text-${houseData.colors.primary}-400/20 rotate-45`} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Enhanced House Icon */}
        <div className={`transform transition-all duration-2000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-75'
        }`}>
          <div className="relative inline-block mb-8 sm:mb-10 md:mb-12">
            <div className="relative group">
              <HouseIcon className={`h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 ${getColorClasses()} mx-auto transition-all duration-1000 group-hover:scale-110`} />
              
              {/* Magical glow rings */}
              <div className={`absolute inset-0 bg-${houseData.colors.primary}-400/20 rounded-full blur-3xl scale-150 animate-pulse`}></div>
              <div className={`absolute inset-0 bg-${houseData.colors.primary}-400/10 rounded-full blur-2xl scale-200 animate-pulse`} style={{ animationDelay: '1s' }}></div>
              
              {/* Pulsing energy rings */}
              <div className={`absolute inset-0 border-2 border-${houseData.colors.primary}-400/30 rounded-full animate-ping`} style={{ animationDuration: '3s' }}></div>
              <div className={`absolute inset-0 border border-${houseData.colors.primary}-400/20 rounded-full animate-ping`} style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* Enhanced House Name */}
        <div className={`transform transition-all duration-2000 delay-300 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h1 className="relative mb-6 sm:mb-8">
            <span className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold bg-gradient-to-r ${houseData.colors.gradient} bg-clip-text text-transparent drop-shadow-2xl`}>
              {houseData.name.toUpperCase()}
            </span>
            {/* Text glow effect */}
            <div className={`absolute inset-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold bg-gradient-to-r ${houseData.colors.gradient} bg-clip-text text-transparent blur-sm opacity-30`}>
              {houseData.name.toUpperCase()}
            </div>
          </h1>
          
          <div className="relative mb-8 sm:mb-10">
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl ${getColorClasses()} font-light italic relative z-10 px-4`}>
              "{houseData.motto}"
            </p>
            {/* Decorative lines - hidden on mobile */}
            <div className={`hidden lg:block absolute top-1/2 left-0 w-8 xl:w-12 h-0.5 bg-gradient-to-r ${houseData.colors.gradient} transform -translate-y-1/2 -translate-x-12 xl:-translate-x-16`}></div>
            <div className={`hidden lg:block absolute top-1/2 right-0 w-8 xl:w-12 h-0.5 bg-gradient-to-l ${houseData.colors.gradient} transform -translate-y-1/2 translate-x-12 xl:translate-x-16`}></div>
          </div>
        </div>

        {/* Enhanced Description */}
        <div className={`transform transition-all duration-2000 delay-600 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="relative bg-black/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 mb-6 sm:mb-8">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto mb-4 sm:mb-6 leading-relaxed">
              {houseData.description}
            </p>
            <p className={`text-sm sm:text-base md:text-lg ${getColorClasses()} font-semibold`}>
              Fundada por {houseData.founder}
            </p>
            
            {/* Decorative corners */}
            <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-l-2 border-t-2 border-${houseData.colors.primary}-400/50`}></div>
            <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-r-2 border-t-2 border-${houseData.colors.primary}-400/50`}></div>
            <div className={`absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-l-2 border-b-2 border-${houseData.colors.primary}-400/50`}></div>
            <div className={`absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-r-2 border-b-2 border-${houseData.colors.primary}-400/50`}></div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className={`absolute bottom-8 sm:bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 transition-all duration-2000 delay-1400 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
        </div>
      </div>

      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.1; 
          }
          50% { 
            transform: translateY(-10px) translateX(5px) scale(1.05); 
            opacity: 0.2; 
          }
        }
        
        @keyframes sparkle {
          0%, 100% { 
            opacity: 0; 
            transform: scale(0) rotate(0deg); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1) rotate(180deg); 
          }
        }
        
        @keyframes wandFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(45deg); 
            opacity: 0.2; 
          }
          50% { 
            transform: translateY(-15px) rotate(225deg); 
            opacity: 0.4; 
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;