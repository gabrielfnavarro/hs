import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Crown, Zap, Heart, Castle, Sparkles, Wand2, BookOpen } from 'lucide-react';
import Scoreboard from '../components/Scoreboard';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const houses = [
    {
      name: 'Grifinória',
      path: '/gryffindor',
      icon: Shield,
      colors: 'from-red-600 to-yellow-500',
      bgGradient: 'from-red-900/20 to-yellow-900/20',
      borderColor: 'border-red-500/30 hover:border-red-400/60',
      textColor: 'text-red-400',
      motto: 'Coragem e Bravura',
      description: 'Casa dos corajosos e audaciosos, onde residem os corações valentes.',
      founder: 'Godric Gryffindor'
    },
    {
      name: 'Sonserina',
      path: '/slytherin',
      icon: Zap,
      colors: 'from-green-600 to-gray-400',
      bgGradient: 'from-green-900/20 to-gray-900/20',
      borderColor: 'border-green-500/30 hover:border-green-400/60',
      textColor: 'text-green-400',
      motto: 'Ambição e Astúcia',
      description: 'Casa dos ambiciosos e determinados, onde a astúcia é valorizada.',
      founder: 'Salazar Slytherin'
    },
    {
      name: 'Corvinal',
      path: '/ravenclaw',
      icon: Crown,
      colors: 'from-blue-600 to-blue-400',
      bgGradient: 'from-blue-900/20 to-blue-800/20',
      borderColor: 'border-blue-500/30 hover:border-blue-400/60',
      textColor: 'text-blue-400',
      motto: 'Sabedoria e Inteligência',
      description: 'Casa dos sábios e criativos, onde a inteligência é suprema.',
      founder: 'Rowena Ravenclaw'
    },
    {
      name: 'Lufa-Lufa',
      path: '/hufflepuff',
      icon: Heart,
      colors: 'from-yellow-600 to-yellow-400',
      bgGradient: 'from-yellow-900/20 to-yellow-800/20',
      borderColor: 'border-yellow-500/30 hover:border-yellow-400/60',
      textColor: 'text-yellow-400',
      motto: 'Lealdade e Dedicação',
      description: 'Casa dos leais e trabalhadores, onde a dedicação é honrada.',
      founder: 'Helga Hufflepuff'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pt-16 sm:pt-20 md:pt-24">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Magical constellation */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Floating magical orbs */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400/8"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              animation: `gentleFloat ${20 + Math.random() * 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
        
        {/* Sparkle effects */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkle ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            <Sparkles className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-blue-400 opacity-25" />
          </div>
        ))}

        {/* Floating wands */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `wandFloat ${25 + Math.random() * 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          >
            <Wand2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-400/15 rotate-45" />
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-7xl mx-auto">
          {/* Enhanced Hogwarts Logo */}
          <div className={`transform transition-all duration-2000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-75'
          }`}>
            <div className="relative inline-block mb-12 sm:mb-14 md:mb-16">
              <div className="relative group">
                <Castle className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 text-white mx-auto transition-all duration-1000 group-hover:scale-110" />
                
                {/* Multiple glow layers */}
                <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl scale-150 animate-pulse"></div>
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-2xl scale-200 animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Pulsing energy rings */}
                <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-0 border border-blue-400/20 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>

          {/* Enhanced School Name */}
          <div className={`transform transition-all duration-2000 delay-300 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                HOGWARTS
              </span>
              {/* Text glow effect */}
              <div className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent blur-sm opacity-30">
                HOGWARTS
              </div>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-300 font-light italic mb-8 sm:mb-10 md:mb-12">
              School of Witchcraft and Wizardry
            </p>
            
            <div className="relative bg-black/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 mb-12 sm:mb-14 md:mb-16 max-w-5xl mx-auto">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                Descubra as quatro casas lendárias de Hogwarts, cada uma com sua própria história, 
                tradições e valores únicos que moldaram gerações de bruxos extraordinários.
              </p>
              
              {/* Decorative elements */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-l-2 border-t-2 border-blue-400/50"></div>
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-r-2 border-t-2 border-blue-400/50"></div>
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-l-2 border-b-2 border-blue-400/50"></div>
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-r-2 border-b-2 border-blue-400/50"></div>
            </div>
          </div>

          {/* Enhanced Houses Grid */}
          <div className={`transform transition-all duration-2000 delay-600 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-16 sm:mt-18 md:mt-20">
              {houses.map((house, index) => (
                <div
                  key={house.name}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-700"
                  style={{ animationDelay: `${800 + index * 200}ms` }}
                  onClick={() => navigate(house.path)}
                >
                  <div className={`relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl border ${house.borderColor} rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 transition-all duration-700 hover:shadow-2xl overflow-hidden`}>
                    
                    {/* Magical background effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${house.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl sm:rounded-3xl`}></div>
                    
                    {/* Enhanced House Icon */}
                    <div className="relative mb-4 sm:mb-6 md:mb-8">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br ${house.colors} rounded-2xl sm:rounded-3xl flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-700 shadow-2xl relative z-10`}>
                        <house.icon className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white drop-shadow-lg" />
                      </div>
                      
                      {/* Multiple glow layers */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${house.colors} rounded-2xl sm:rounded-3xl blur-xl opacity-30 group-hover:opacity-60 group-hover:scale-125 transition-all duration-700`}></div>
                      <div className={`absolute inset-0 bg-gradient-to-br ${house.colors} rounded-2xl sm:rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 group-hover:scale-150 transition-all duration-700`}></div>
                      
                      {/* Pulsing rings */}
                      <div className={`absolute inset-0 border-2 border-${house.colors.split(' ')[1].split('-')[0]}-400/20 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-700`} style={{ animationDuration: '2s' }}></div>
                    </div>

                    {/* Enhanced House Info */}
                    <div className="relative z-10">
                      <h3 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold ${house.textColor} group-hover:text-white transition-colors duration-500 mb-2 sm:mb-3`}>
                        {house.name}
                      </h3>
                      <p className={`${house.textColor} font-semibold mb-3 sm:mb-4 text-xs sm:text-sm md:text-base`}>
                        {house.motto}
                      </p>
                      <p className="text-gray-300 group-hover:text-white transition-colors duration-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 md:mb-6">
                        {house.description}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Fundada por {house.founder}
                      </p>
                    </div>

                    {/* Enhanced decorative top line */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${house.colors} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl sm:rounded-t-3xl`}></div>
                    
                    {/* Hover particles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full animate-ping`}
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${Math.random() * 2}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Library Access Button */}
          <div className={`transform transition-all duration-2000 delay-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="mt-16 sm:mt-20 md:mt-24">
              <button
                onClick={() => navigate('/library')}
                className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-2xl font-bold text-lg sm:text-xl hover:scale-105 transition-all duration-500 shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3 sm:space-x-4">
                  <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Explorar Biblioteca</span>
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
                </div>
              </button>
            </div>
          </div>

          {/* Enhanced School Motto */}
          <div className={`transform transition-all duration-2000 delay-1200 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="mt-16 sm:mt-20 md:mt-24 text-center">
              <div className="relative bg-black/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 max-w-4xl mx-auto">
                <blockquote className="relative text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-blue-300 italic mb-4 sm:mb-6">
                  "Draco Dormiens Nunquam Titillandus"
                </blockquote>
                <p className="text-gray-400 font-medium text-xs sm:text-sm md:text-base">
                  Nunca Faça Cócegas em um Dragão Adormecido
                </p>
                
                {/* Decorative quotes */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 text-3xl sm:text-4xl md:text-5xl text-blue-400 opacity-20 font-serif">"</div>
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-3xl sm:text-4xl md:text-5xl text-blue-400 opacity-20 font-serif rotate-180">"</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scoreboard Section */}
      <Scoreboard isHomePage={true} />

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes gentleFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.08; 
          }
          50% { 
            transform: translateY(-10px) translateX(5px) scale(1.05); 
            opacity: 0.15; 
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
            opacity: 0.15; 
          }
          50% { 
            transform: translateY(-15px) rotate(225deg); 
            opacity: 0.3; 
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;