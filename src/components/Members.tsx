import React, { useState, useEffect } from 'react';
import { Star, Award, BookOpen, Users, Crown, Wand2, Sparkles, Shield } from 'lucide-react';

interface Member {
  name: string;
  title: string;
  achievement: string;
  description: string;
  traits: string[];
}

interface HouseData {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  members: Member[];
}

interface MembersProps {
  houseData: HouseData;
}

const Members: React.FC<MembersProps> = ({ houseData }) => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setTimeout(() => {
              setVisibleCards(prev => [...new Set([...prev, index])]);
            }, index * 200);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.member-card');
    cards.forEach(card => observer.observe(card));

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
      red: 'border-red-500/30 hover:border-red-400/60',
      green: 'border-green-500/30 hover:border-green-400/60',
      blue: 'border-blue-500/30 hover:border-blue-400/60',
      yellow: 'border-yellow-500/30 hover:border-yellow-400/60'
    };
    return colorMap[houseData.colors.primary] || 'border-white/30 hover:border-white/60';
  };

  // Enhanced placeholder images for members
  const memberImages = [
    "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600"
  ];

  return (
    <section id="members" className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/50 to-black"></div>
      
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Magical constellation effect */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `constellation ${15 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`
            }}
          >
            <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 bg-${houseData.colors.primary}-400/25 rounded-full`}>
              <div className={`absolute inset-0 bg-${houseData.colors.primary}-400/15 rounded-full blur-sm scale-150`}></div>
            </div>
          </div>
        ))}
        
        {/* Floating magical elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `magicalFloat ${12 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 6}s`
            }}
          >
            <Wand2 className={`h-3 w-3 sm:h-4 sm:w-4 text-${houseData.colors.primary}-400/15 rotate-45`} />
          </div>
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="relative inline-block mb-6 sm:mb-8">
            <Users className={`h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 ${getColorClasses()} mx-auto mb-4 sm:mb-6 animate-pulse`} />
            <div className={`absolute inset-0 bg-${houseData.colors.primary}-400/20 rounded-full blur-2xl scale-150 animate-pulse`}></div>
          </div>
          
          <h2 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8">
            <span className={`bg-gradient-to-r ${houseData.colors.gradient} bg-clip-text text-transparent`}>
              Lendas Vivas
            </span>
            <div className={`absolute inset-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r ${houseData.colors.gradient} bg-clip-text text-transparent blur-sm opacity-30`}>
              Lendas Vivas
            </div>
          </h2>
          
          <div className={`w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r ${houseData.colors.gradient} mx-auto mb-6 sm:mb-8 rounded-full relative`}>
            <div className={`absolute inset-0 bg-gradient-to-r ${houseData.colors.gradient} rounded-full blur-sm`}></div>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Bruxos e bruxas excepcionais que trouxeram honra e reconhecimento à Casa {houseData.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {houseData.members.map((member, index) => (
            <div
              key={index}
              data-index={index}
              className={`member-card group transition-all duration-1000 ease-out ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`relative h-full bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl border ${getBorderColor()} rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-700 hover:transform hover:scale-[1.02] hover:shadow-2xl group cursor-pointer`}>
                
                {/* Magical hover effects */}
                {hoveredCard === index && (
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

                {/* Enhanced Character Image */}
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                  <img 
                    src={memberImages[index % memberImages.length]} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                  
                  {/* Magical overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-${houseData.colors.primary}-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                  
                  {/* Floating Achievement Icon */}
                  <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br ${houseData.colors.gradient} backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-xl relative z-10`}>
                      <Star className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${houseData.colors.gradient} rounded-xl sm:rounded-2xl blur-sm opacity-50`}></div>
                    </div>
                  </div>

                  {/* Magical sparkles on hover */}
                  {hoveredCard === index && (
                    <div className="absolute inset-0">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute animate-ping"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`
                          }}
                        >
                          <Sparkles className={`h-2 w-2 sm:h-3 sm:w-3 text-${houseData.colors.primary}-400`} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                  {/* Enhanced Name and Title */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white group-hover:${getColorClasses()} transition-colors duration-500 mb-2 sm:mb-3 leading-tight`}>
                      {member.name}
                    </h3>
                    <p className={`${getColorClasses()} font-semibold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg`}>{member.title}</p>
                    <div className="relative inline-block">
                      <p className={`text-${houseData.colors.primary}-500 text-xs sm:text-sm font-medium bg-${houseData.colors.primary}-500/10 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full border border-${houseData.colors.primary}-500/20 relative z-10`}>
                        {member.achievement}
                      </p>
                      <div className={`absolute inset-0 bg-${houseData.colors.primary}-500/5 rounded-full blur-sm`}></div>
                    </div>
                  </div>

                  {/* Enhanced Description */}
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-500 mb-4 sm:mb-6 md:mb-8 leading-relaxed text-xs sm:text-sm md:text-base line-clamp-4">
                    {member.description}
                  </p>

                  {/* Enhanced Traits */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {member.traits.map((trait, traitIndex) => (
                      <span
                        key={traitIndex}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 md:py-2 bg-${houseData.colors.primary}-900/40 ${getColorClasses()} rounded-full text-xs font-medium border border-${houseData.colors.primary}-700/30 group-hover:bg-${houseData.colors.primary}-800/50 group-hover:border-${houseData.colors.primary}-600/50 transition-all duration-500 relative`}
                        style={{ animationDelay: `${traitIndex * 100}ms` }}
                      >
                        {trait}
                        <div className={`absolute inset-0 bg-${houseData.colors.primary}-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300`}></div>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative corner elements */}
                <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-l-2 border-t-2 border-${houseData.colors.primary}-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className={`absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-r-2 border-b-2 border-${houseData.colors.primary}-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes constellation {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
            opacity: 0.25; 
          }
          50% { 
            transform: translateY(-10px) scale(1.2); 
            opacity: 0.6; 
          }
        }
        
        @keyframes magicalFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(45deg); 
            opacity: 0.15; 
          }
          50% { 
            transform: translateY(-15px) rotate(225deg); 
            opacity: 0.3; 
          }
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Members;