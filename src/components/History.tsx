import React, { useState, useEffect, useRef } from 'react';
import { Crown, Scroll, Star, Award, Sparkles, Castle, Clock, BookOpen } from 'lucide-react';

interface HistoryEvent {
  period: string;
  title: string;
  description: string;
  highlight: string;
}

interface HouseData {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  history: HistoryEvent[];
}

interface HistoryProps {
  houseData: HouseData;
}

const History: React.FC<HistoryProps> = ({ houseData }) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setTimeout(() => {
              setVisibleItems(prev => [...new Set([...prev, index])]);
            }, index * 200);
          }
        });
      },
      { threshold: 0.1 }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

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
      red: 'border-red-400',
      green: 'border-green-400',
      blue: 'border-blue-400',
      yellow: 'border-yellow-400'
    };
    return colorMap[houseData.colors.primary] || 'border-white';
  };

  return (
    <section id="history" ref={sectionRef} className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Magical orbs */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-${houseData.colors.primary}-400/10`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 30}px`,
              height: `${Math.random() * 100 + 30}px`,
              animation: `magicalOrb ${20 + Math.random() * 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`,
              filter: 'blur(2px)'
            }}
          />
        ))}
        
        {/* Floating sparkles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkleFloat ${8 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 6}s`
            }}
          >
            <Sparkles className={`h-2 w-2 sm:h-3 sm:w-3 text-${houseData.colors.primary}-400 opacity-40`} />
          </div>
        ))}
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="relative inline-block mb-6 sm:mb-8">
            <BookOpen className={`h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 ${getColorClasses()} mx-auto mb-4 sm:mb-6 animate-pulse`} />
            <div className={`absolute inset-0 bg-${houseData.colors.primary}-400/20 rounded-full blur-2xl scale-150 animate-pulse`}></div>
          </div>
          
          <h2 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8">
            <span className={`bg-gradient-to-r ${houseData.colors.gradient} bg-clip-text text-transparent`}>
              História Épica
            </span>
            <div className={`absolute inset-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r ${houseData.colors.gradient} bg-clip-text text-transparent blur-sm opacity-30`}>
              História Épica
            </div>
          </h2>
          
          <div className={`w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r ${houseData.colors.gradient} mx-auto mb-6 sm:mb-8 rounded-full relative`}>
            <div className={`absolute inset-0 bg-gradient-to-r ${houseData.colors.gradient} rounded-full blur-sm`}></div>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Uma jornada épica através dos séculos de tradição e legado que moldou a Casa {houseData.name}.
          </p>
        </div>

        <div className="relative">
          {/* Enhanced Timeline Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2">
            <div className={`w-full h-full bg-gradient-to-b ${houseData.colors.gradient} rounded-full shadow-2xl relative`}>
              <div className={`absolute inset-0 bg-gradient-to-b ${houseData.colors.gradient} rounded-full blur-sm opacity-50`}></div>
            </div>
          </div>

          {/* Mobile Timeline Line */}
          <div className="lg:hidden absolute left-6 sm:left-8 top-0 bottom-0 w-1">
            <div className={`w-full h-full bg-gradient-to-b ${houseData.colors.gradient} rounded-full shadow-lg`}></div>
          </div>

          <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
            {houseData.history.map((event, index) => (
              <div
                key={index}
                data-index={index}
                className={`timeline-item relative transition-all duration-1000 ease-out ${
                  visibleItems.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
              >
                {/* Enhanced Timeline Icon */}
                <div className="absolute left-6 sm:left-8 lg:left-1/2 transform lg:-translate-x-1/2 -translate-y-1 z-20">
                  <div className="relative group">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full flex items-center justify-center border-4 ${getBorderColor()} shadow-2xl group-hover:scale-110 transition-all duration-500 relative z-10`}>
                      <Clock className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 ${getColorClasses()} group-hover:text-white transition-colors duration-300`} />
                    </div>
                    
                    {/* Multiple glow layers */}
                    <div className={`absolute inset-0 bg-${houseData.colors.primary}-400/30 rounded-full blur-xl scale-150 animate-pulse`}></div>
                    <div className={`absolute inset-0 bg-${houseData.colors.primary}-400/20 rounded-full blur-2xl scale-200 animate-pulse`} style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>

                {/* Enhanced Content Card */}
                <div className={`ml-16 sm:ml-20 lg:ml-0 ${
                  index % 2 === 0 ? 'lg:mr-1/2 lg:pr-16 xl:pr-24' : 'lg:ml-1/2 lg:pl-16 xl:pl-24'
                } ${visibleItems.includes(index) ? 'animate-slideInUp' : ''}`}>
                  <div className="group relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl border border-gray-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 hover:border-opacity-80 transition-all duration-700 hover:transform hover:scale-[1.02] hover:shadow-2xl overflow-hidden">
                    
                    {/* Magical background effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${houseData.colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-2xl sm:rounded-3xl`}></div>
                    
                    {/* Period Badge */}
                    <div className="absolute -top-3 sm:-top-4 left-4 sm:left-6 z-10">
                      <span className={`bg-gradient-to-r ${houseData.colors.gradient} text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl relative z-10`}>
                        {event.period}
                      </span>
                      <div className={`absolute inset-0 bg-gradient-to-r ${houseData.colors.gradient} rounded-full blur-sm opacity-50`}></div>
                    </div>

                    {/* Highlight Badge */}
                    <div className="absolute -top-3 sm:-top-4 right-4 sm:right-6 z-10">
                      <span className={`bg-${houseData.colors.primary}-400/20 backdrop-blur-sm ${getColorClasses()} px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-${houseData.colors.primary}-400/30 relative z-10`}>
                        {event.highlight}
                      </span>
                    </div>

                    <div className="flex items-start mb-4 sm:mb-6 mt-4 sm:mt-6">
                      <div className={`bg-gradient-to-br ${houseData.colors.gradient} text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 mr-3 sm:mr-4 md:mr-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl relative z-10 flex-shrink-0`}>
                        <Crown className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${houseData.colors.gradient} rounded-xl sm:rounded-2xl blur-sm opacity-50`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white group-hover:${getColorClasses()} transition-colors duration-500 mb-2 sm:mb-3 leading-tight`}>
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-500 leading-relaxed text-sm sm:text-base md:text-lg pr-2">
                      {event.description}
                    </p>

                    {/* Decorative elements */}
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      <Star className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${getColorClasses()}`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes magicalOrb {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.1; 
          }
          25% { 
            transform: translateY(-30px) translateX(20px) scale(1.1); 
            opacity: 0.2; 
          }
          50% { 
            transform: translateY(-15px) translateX(-10px) scale(0.9); 
            opacity: 0.3; 
          }
          75% { 
            transform: translateY(-40px) translateX(25px) scale(1.05); 
            opacity: 0.15; 
          }
        }
        
        @keyframes sparkleFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.4; 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.8; 
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default History;