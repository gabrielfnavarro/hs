import React, { useState, useEffect } from 'react';
import { Trophy, Star, Award, Shield, Crown, Zap, Heart, Sparkles } from 'lucide-react';

const iconMap: Record<string, any> = {
  Trophy,
  Star,
  Award,
  Shield,
  Crown,
  Zap,
  Heart,
  Sparkles,
};


interface ScoreEntry {
  id: string;
  reason: string;
  points: number;
  date: string;
  type: 'gain' | 'loss';
}

interface HouseScore {
  id: number; // <-- Adicionado
  name: string;
  total: number;
  entries: ScoreEntry[];
  colors: {
    primary: string;
    gradient: string;
    icon: any;
  };
}


interface ScoreboardProps {
  isHomePage?: boolean;
  currentHouse?: string;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ isHomePage = false, currentHouse }) => {
  const [houses, setHouses] = useState<HouseScore[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/houses')
      .then(res => res.json())
      .then(async (data) => {
        // Para cada casa, buscar entradas
        const enriched = await Promise.all(data.map(async (house: any) => {
          const res = await fetch(`http://localhost:3001/houses/${house.id}/entries`);
          const entries = await res.json();
          return {
            ...house,
            entries,
            colors: {
              primary: house.primary_color,
              gradient: house.gradient,
              icon: iconMap[house.icon] || Trophy
            }
          };
        }));
        setHouses(enriched);
      });
  }, []);


  const sortedHouses = [...houses].sort((a, b) => b.total - a.total);
  const currentHouseData = houses.find(h => h.name === currentHouse);

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 2: return <Award className="h-6 w-6 text-gray-400" />;
      case 3: return <Star className="h-6 w-6 text-amber-600" />;
      default: return <div className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">{position}</div>;
    }
  };

  if (isHomePage) {
    return (
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="relative inline-block mb-6 sm:mb-8">
              <Trophy className="h-12 w-12 sm:h-16 sm:w-16 text-yellow-400 mx-auto mb-4 sm:mb-6 animate-pulse" />
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl scale-150 animate-pulse"></div>
            </div>
            
            <h2 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Placar das Casas
              </span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Acompanhe a competição entre as quatro casas de Hogwarts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {sortedHouses.map((house, index) => {
              const position = index + 1;
              const IconComponent = house.colors.icon;
              
              return (
                <div
                  key={house.name}
                  className="group relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl border border-gray-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 transition-all duration-700 hover:transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${house.colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-2xl sm:rounded-3xl`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        {getPositionIcon(position)}
                        <IconComponent className={`h-6 w-6 sm:h-8 sm:w-8 text-${house.colors.primary}-400`} />
                      </div>
                      <div className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${house.colors.gradient} bg-clip-text text-transparent`}>
                        {house.total}
                      </div>
                    </div>
                    
                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-${house.colors.primary}-400 transition-colors duration-500 mb-2 sm:mb-3`}>
                      {house.name}
                    </h3>
                    
                    <div className={`text-xs sm:text-sm text-${house.colors.primary}-400 font-medium`}>
                      {position === 1 ? '🏆 Liderando' : 
                       position === 2 ? '🥈 2º Lugar' : 
                       position === 3 ? '🥉 3º Lugar' : '4º Lugar'}
                    </div>
                  </div>
                  
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${house.colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl sm:rounded-b-3xl`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Página individual da casa - APENAS VISUALIZAÇÃO
  if (!currentHouseData) return null;

  return (
    <section id="scoreboard" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
            <Sparkles className={`h-1.5 w-1.5 sm:h-2 sm:w-2 text-${currentHouseData.colors.primary}-400 opacity-30`} />
          </div>
        ))}
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="relative inline-block mb-6 sm:mb-8">
            <Trophy className={`h-12 w-12 sm:h-16 sm:w-16 text-${currentHouseData.colors.primary}-400 mx-auto mb-4 sm:mb-6 animate-pulse`} />
            <div className={`absolute inset-0 bg-${currentHouseData.colors.primary}-400/20 rounded-full blur-2xl scale-150 animate-pulse`}></div>
          </div>
          
          <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
            <span className={`bg-gradient-to-r ${currentHouseData.colors.gradient} bg-clip-text text-transparent`}>
              Placar da Casa
            </span>
          </h2>
          
          <div className={`text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r ${currentHouseData.colors.gradient} bg-clip-text text-transparent mb-4`}>
            {currentHouseData.total} Pontos
          </div>
          
          <p className={`text-lg sm:text-xl text-${currentHouseData.colors.primary}-400 font-medium`}>
            Posição: {sortedHouses.findIndex(h => h.name === currentHouse) + 1}º lugar
          </p>
        </div>

        {/* Histórico de pontos - APENAS VISUALIZAÇÃO */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">📜 Histórico de Pontos</h3>
          
          <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl border border-gray-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
            <div className="space-y-4">
              {currentHouseData.entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-gradient-to-br from-gray-800/95 to-gray-700/95 backdrop-blur-xl border border-gray-600/50 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:border-gray-500/70 hover:transform hover:scale-[1.01]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {entry.type === 'gain' ? (
                          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                            <span className="text-green-400 font-bold text-sm">+</span>
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                            <span className="text-red-400 font-bold text-sm">-</span>
                          </div>
                        )}
                        <span className="text-white font-medium text-sm sm:text-base">{entry.reason}</span>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm ml-11">
                        📅 {new Date(entry.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    
                    <div className={`text-2xl sm:text-3xl font-bold ${
                      entry.type === 'gain' ? 'text-green-400' : 'text-red-400'
                    } flex-shrink-0 text-right`}>
                      {entry.type === 'gain' ? '+' : ''}{entry.points}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {currentHouseData.entries.length === 0 && (
              <div className="text-center py-12">
                <Trophy className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Nenhuma entrada de pontos ainda</p>
              </div>
            )}
          </div>
        </div>

        {/* Informação sobre administração */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
            </div>
            <h4 className="text-lg font-bold text-purple-400 mb-2">Pontuação Oficial</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Os pontos são gerenciados pela administração de Hogwarts. 
              Acompanhe aqui o desempenho da sua casa ao longo do ano letivo!
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes sparkleFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.3; 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.6; 
          }
        }
      `}</style>
    </section>
  );
};

export default Scoreboard;