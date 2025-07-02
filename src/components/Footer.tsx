import React from 'react';
import { Castle, Heart, Star, BookOpen, Sparkles, Crown, Wand2 } from 'lucide-react';

interface FooterProps {
  houseColors?: {
    primary: string;
    secondary: string;
    gradient: string;
  };
}

const Footer: React.FC<FooterProps> = ({ houseColors }) => {
  const getColorClasses = () => {
    if (!houseColors) return 'text-white';
    
    const colorMap: { [key: string]: string } = {
      red: 'text-red-400',
      green: 'text-green-400',
      blue: 'text-blue-400',
      yellow: 'text-yellow-400'
    };
    return colorMap[houseColors.primary] || 'text-white';
  };

  return (
    <footer className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-t from-black via-gray-900 to-gray-800 overflow-hidden">
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Magical constellation */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `magicalTwinkle ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          >
            <div className={`w-0.5 h-0.5 sm:w-1 sm:h-1 bg-${houseColors?.primary || 'white'}-400 rounded-full`}>
              <div className={`absolute inset-0 bg-${houseColors?.primary || 'white'}-400/50 rounded-full blur-sm scale-150`}></div>
            </div>
          </div>
        ))}
        
        {/* Floating magical elements */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatMagic ${15 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`
            }}
          >
            <Wand2 className={`h-3 w-3 sm:h-4 sm:w-4 text-${houseColors?.primary || 'white'}-400/20 rotate-45`} />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Enhanced Logo */}
          <div className="flex items-center justify-center space-x-4 sm:space-x-6 mb-8 sm:mb-10 md:mb-12 group">
            <div className="relative">
              <div className={`absolute inset-0 bg-${houseColors?.primary || 'white'}-400/20 rounded-full blur-3xl scale-200 group-hover:scale-250 transition-transform duration-700`}></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-400/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 group-hover:border-opacity-60 transition-all duration-700 group-hover:scale-110">
                <Castle className={`h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 ${getColorClasses()} group-hover:rotate-12 group-hover:scale-110 transition-all duration-700`} />
              </div>
            </div>
            <div className="text-left">
              <span className={`block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${houseColors?.gradient || 'from-white to-gray-300'} bg-clip-text text-transparent group-hover:from-white group-hover:to-gray-200 transition-all duration-700`}>
                Hogwarts
              </span>
              <span className={`block text-sm sm:text-base md:text-lg ${getColorClasses()} font-medium opacity-80`}>School of Witchcraft and Wizardry</span>
            </div>
          </div>

          {/* Enhanced House Colors Line */}
          {houseColors && (
            <div className="relative w-48 sm:w-56 md:w-64 h-1.5 sm:h-2 mx-auto mb-8 sm:mb-10 md:mb-12">
              <div className={`absolute inset-0 bg-gradient-to-r ${houseColors.gradient} rounded-full`}></div>
              <div className={`absolute inset-0 bg-gradient-to-r ${houseColors.gradient} rounded-full blur-sm opacity-50`}></div>
              <div className={`absolute inset-0 bg-gradient-to-r ${houseColors.gradient} rounded-full blur-lg opacity-30 scale-110`}></div>
            </div>
          )}

          {/* Enhanced Quote */}
          <div className="relative mb-8 sm:mb-10 md:mb-12">
            <div className="relative bg-black/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10">
              <blockquote className={`relative text-xl sm:text-2xl md:text-3xl lg:text-4xl ${getColorClasses()} italic font-light mb-3 sm:mb-4`}>
                "Draco Dormiens Nunquam Titillandus"
              </blockquote>
              <p className="text-gray-400 font-medium text-sm sm:text-base md:text-lg">— Lema de Hogwarts</p>
              
              {/* Decorative quotes */}
              <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 text-4xl sm:text-5xl md:text-6xl ${getColorClasses()} opacity-20 font-serif`}>"</div>
              <div className={`absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-4xl sm:text-5xl md:text-6xl ${getColorClasses()} opacity-20 font-serif rotate-180`}>"</div>
            </div>
          </div>

          {/* Enhanced Copyright */}
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 text-gray-400 mb-12 sm:mb-14 md:mb-16 group">
            <span className="font-medium text-sm sm:text-base md:text-lg">Feito com</span>
            <div className="relative">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 fill-current animate-pulse group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute inset-0 bg-red-500/30 rounded-full blur-lg scale-150 animate-pulse"></div>
            </div>
            <span className="font-medium text-sm sm:text-base md:text-lg">para o mundo mágico</span>
          </div>

          {/* Enhanced School Values Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-14 md:mb-16">
            {[
              { icon: BookOpen, label: 'Conhecimento', color: getColorClasses() },
              { icon: Star, label: 'Excelência', color: getColorClasses() },
              { icon: Castle, label: 'Tradição', color: getColorClasses() },
              { icon: Heart, label: 'Comunidade', color: getColorClasses() }
            ].map((item, index) => (
              <div 
                key={item.label}
                className="group cursor-pointer transition-all duration-700 hover:transform hover:scale-110"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 group-hover:border-opacity-70 transition-all duration-700 overflow-hidden">
                  
                  {/* Magical background effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${houseColors?.gradient || 'from-blue-600/10 to-purple-600/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl sm:rounded-3xl`}></div>
                  
                  <div className="relative z-10">
                    <item.icon className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 ${item.color} mx-auto mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`} />
                    <p className={`text-xs sm:text-sm text-gray-400 group-hover:${getColorClasses()} transition-colors duration-500 font-medium`}>
                      {item.label}
                    </p>
                  </div>
                  
                  {/* Hover sparkles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-${houseColors?.primary || 'white'}-400 rounded-full animate-ping`}
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

          {/* Enhanced School Motto */}
          <div className="relative">
            <div className="relative bg-black/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/5">
              <p className="relative text-gray-400 text-base sm:text-lg italic font-light">
                "Where Magic Lives Forever"
              </p>
              <div className={`absolute top-2 left-2 w-3 h-3 sm:w-4 sm:h-4 border-l-2 border-t-2 border-${houseColors?.primary || 'white'}-400/30`}></div>
              <div className={`absolute bottom-2 right-2 w-3 h-3 sm:w-4 sm:h-4 border-r-2 border-b-2 border-${houseColors?.primary || 'white'}-400/30`}></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes magicalTwinkle {
          0%, 100% { 
            opacity: 0.2; 
            transform: scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.5); 
          }
        }
        
        @keyframes floatMagic {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.2; 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.6; 
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;