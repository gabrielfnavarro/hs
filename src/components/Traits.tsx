import React, { useState, useEffect } from 'react';
import { Brain, Palette, BookOpen, Search, Lightbulb, Target, Zap, Eye, Shield, Heart, Crown, Sword, Sparkles, Star, Wand2 } from 'lucide-react';

interface Trait {
  name: string;
  description: string;
}

interface HouseData {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  traits: Trait[];
}

interface TraitsProps {
  houseData: HouseData;
}

const Traits: React.FC<TraitsProps> = ({ houseData }) => {
  const [visibleTraits, setVisibleTraits] = useState<number[]>([]);
  const [hoveredTrait, setHoveredTrait] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setTimeout(() => {
              setVisibleTraits(prev => [...new Set([...prev, index])]);
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    const traits = document.querySelectorAll('.trait-card');
    traits.forEach(trait => observer.observe(trait));

    return () => observer.disconnect();
  }, []);

  const getTraitIcon = (traitName: string) => {
    const iconMap: { [key: string]: any } = {
      'Inteligência': Brain,
      'Criatividade': Palette,
      'Sabedoria': BookOpen,
      'Curiosidade': Search,
      'Coragem': Shield,
      'Cavalaria': Crown,
      'Determinação': Target,
      'Liderança': Sword,
      'Ambição': Zap,
      'Astúcia': Eye,
      'Lealdade': Heart,
      'Dedicação': Target,
      'Paciência': BookOpen,
      'Justiça': Shield
    };
    return iconMap[traitName] || Lightbulb;
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

  const getBorderColor = () => {
    const colorMap: { [key: string]: string } = {
      red: 'border-red-500/30 hover:border-red-400/60',
      green: 'border-green-500/30 hover:border-green-400/60',
      blue: 'border-blue-500/30 hover:border-blue-400/60',
      yellow: 'border-yellow-500/30 hover:border-yellow-400/60'
    };
    return colorMap[houseData.colors.primary] || 'border-white/30 hover:border-white/60';
  };

  return (
    <section id="traits" className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Magical energy waves */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `energyWave ${20 + Math.random() * 15}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          >
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-${houseData.colors.primary}-400/15 rounded-full`}>
              <div className={`absolute inset-0 bg-${houseData.colors.primary}-400/10 rounded-full blur-sm scale-150`}></div>
            </div>
          </div>
        ))}
        
        {/* Floating magical symbols */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `symbolFloat ${15 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`
            }}
          >
            <Wand2 className={`h-2.5 w-2.5 sm:h-3 sm:w-3 text-${houseData.colors.primary}-400/15 rotate-45`} />
          </div>
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="relative inline-block mb-6 sm:mb-8">
            <Sparkles className={`h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 ${getColorClasses()} mx-auto mb-4 sm:mb-6 animate-pulse`} />
            <div className={`absolute inset-0 bg-${houseData.colors.primary}-400/20 rounded-full blur-2xl scale-150 animate-pulse`}></div>
          </div>
          
          <h2 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8">
            <span className={`bg-gradient-to-r ${houseData.colors.gradient} bg-clip-text text-transparent`}>
              Virtudes Supremas
            </span>
            <div className={`absolute inset-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r ${houseData.colors.gradient} bg-clip-text text-transparent blur-sm opacity-30`}>
              Virtudes Supremas
            </div>
          </h2>
          
          <div className={`w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r ${houseData.colors.gradient} mx-auto mb-6 sm:mb-8 rounded-full relative`}>
            <div className={`absolute inset-0 bg-gradient-to-r ${houseData.colors.gradient} rounded-full blur-sm`}></div>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Os valores supremos e qualidades excepcionais que definem os verdadeiros membros da Casa {houseData.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {houseData.traits.map((trait, index) => {
            const TraitIcon = getTraitIcon(trait.name);
            
            return (
              <div
                key={index}
                data-index={index}
                className={`trait-card group transition-all duration-1000 ease-out ${
                  visibleTraits.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                onMouseEnter={() => setHoveredTrait(index)}
                onMouseLeave={() => setHoveredTrait(null)}
              >
                <div className={`relative h-full bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl border ${getBorderColor()} rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 transition-all duration-700 hover:transform hover:scale-105 hover:shadow-2xl group cursor-pointer overflow-hidden`}>
                  
                  {/* Magical background effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${houseData.colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-2xl sm:rounded-3xl`}></div>
                  
                  {/* Floating Particles on Hover */}
                  {hoveredTrait === index && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-${houseData.colors.primary}-400 rounded-full animate-ping`}
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${1 + Math.random()}s`
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Enhanced Icon */}
                  <div className="relative mb-4 sm:mb-6 md:mb-8">
                    <div className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${houseData.colors.gradient} rounded-2xl sm:rounded-3xl flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-700 shadow-2xl relative z-10`}>
                      <TraitIcon className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white drop-shadow-lg" />
                    </div>
                    
                    {/* Multiple glow layers */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${houseData.colors.gradient} rounded-2xl sm:rounded-3xl blur-xl opacity-30 group-hover:opacity-60 group-hover:scale-125 transition-all duration-700`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${houseData.colors.gradient} rounded-2xl sm:rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 group-hover:scale-150 transition-all duration-700`}></div>
                    
                    {/* Pulsing rings */}
                    <div className={`absolute inset-0 border-2 border-${houseData.colors.primary}-400/20 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-700`} style={{ animationDuration: '2s' }}></div>
                    <div className={`absolute inset-0 border border-${houseData.colors.primary}-400/15 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-700`} style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="relative z-10">
                    <h3 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white group-hover:${getColorClasses()} transition-colors duration-500 mb-3 sm:mb-4 md:mb-6 leading-tight`}>
                      {trait.name}
                    </h3>
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-500 leading-relaxed text-xs sm:text-sm md:text-base">
                      {trait.description}
                    </p>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-20 group-hover:opacity-60 transition-opacity duration-500">
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 border border-${houseData.colors.primary}-400/30 rounded-full flex items-center justify-center`}>
                      <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-${houseData.colors.primary}-400 rounded-full animate-pulse`}></div>
                    </div>
                  </div>

                  {/* Enhanced corner decorations */}
                  <div className={`absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-l-2 border-b-2 border-${houseData.colors.primary}-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-l-2 border-t-2 border-${houseData.colors.primary}-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes energyWave {
          0% { 
            transform: translateX(-50px) translateY(0px) scale(0.5); 
            opacity: 0; 
          }
          50% { 
            transform: translateX(50vw) translateY(-10px) scale(1); 
            opacity: 0.4; 
          }
          100% { 
            transform: translateX(100vw) translateY(0px) scale(0.5); 
            opacity: 0; 
          }
        }
        
        @keyframes symbolFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(45deg); 
            opacity: 0.15; 
          }
          50% { 
            transform: translateY(-15px) rotate(225deg); 
            opacity: 0.3; 
          }
        }
      `}</style>
    </section>
  );
};

export default Traits;