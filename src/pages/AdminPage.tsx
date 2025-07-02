import React, { useState, useEffect } from 'react';
import { Shield, Crown, Zap, Heart, Plus, Minus, Save, Eye, EyeOff, Trash2, RotateCcw, Award, Sparkles, Lock, Key } from 'lucide-react';


const houseColors = {
  'Grifinória': { primary: 'red', gradient: 'from-red-600 to-yellow-500', icon: Shield },
  'Sonserina': { primary: 'green', gradient: 'from-green-600 to-gray-400', icon: Zap },
  'Corvinal': { primary: 'blue', gradient: 'from-blue-600 to-blue-400', icon: Crown },
  'Lufa-Lufa': { primary: 'yellow', gradient: 'from-yellow-600 to-yellow-400', icon: Heart }
};

interface ScoreEntry {
  id: string;
  reason: string;
  points: number;
  date: string;
  type: 'gain' | 'loss';
  addedBy: string;
}

interface HouseData {
  name: string;
  total: number;
  entries: ScoreEntry[];
  colors: {
    primary: string;
    gradient: string;
    icon: any;
  };
}

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [houses, setHouses] = useState<HouseData[]>([]);

useEffect(() => {
  if (isAuthenticated) {
    fetch('http://localhost:3001/houses')
      .then(res => res.json())
      .then(data => {
        const housesWithColors = data.map((house: any) => ({
          ...house,
          colors: houseColors[house.name]
        }));
        setHouses(housesWithColors);
      })
      .catch(() => alert('Erro ao carregar dados'));
  }
}, [isAuthenticated]);



  const [newEntries, setNewEntries] = useState<{[key: string]: {reason: string, points: number, type: 'gain' | 'loss'}}>({
    'Grifinória': { reason: '', points: 0, type: 'gain' },
    'Sonserina': { reason: '', points: 0, type: 'gain' },
    'Corvinal': { reason: '', points: 0, type: 'gain' },
    'Lufa-Lufa': { reason: '', points: 0, type: 'gain' }
  });

  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);
  const [bulkMode, setBulkMode] = useState(false);

  // Senha secreta para acessar a página
  const SECRET_PASSWORD = 'dumbledore123';

  const handleLogin = () => {
    if (password === SECRET_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('hogwarts_admin_auth', 'true');
    } else {
      alert('Senha incorreta! Apenas o Diretor pode acessar esta área.');
    }
  };

  useEffect(() => {
    const savedAuth = localStorage.getItem('hogwarts_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const addPoints = (houseName: string) => {
    const entry = newEntries[houseName];
    if (!entry.reason.trim() || entry.points === 0) {
      alert('Preencha motivo e pontos');
      return;
    }

const house = houses.find(h => h.name === houseName);
if (!house) return alert('Casa não encontrada');

    fetch(`http://localhost:3001/houses/${house.id}/entries`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ houseName, reason: entry.reason, points: entry.points, type: entry.type, addedBy: 'Diretor' })
    })
    .then(res => res.json())
    .then(updatedHouse => {
      setHouses(prev => prev.map(h => h.name === houseName ? updatedHouse : h));
      setNewEntries(prev => ({ ...prev, [houseName]: { reason: '', points: 0, type: 'gain' } }));
    })
    .catch(() => alert('Erro ao adicionar pontos'));
  };


  const removeEntry = (houseName: string, entryId: string) => {
  if (!window.confirm('Confirma remoção?')) return;

const house = houses.find(h => h.name === houseName);
if (!house) return;

fetch(`http://localhost:3001/houses/${house.id}/entry/${entryId}`, { method: 'DELETE' })
  .then(res => res.json())
  .then(updatedHouse => {
    updatedHouse.colors = houseColors[updatedHouse.name];
    setHouses(prev => prev.map(h => h.name === houseName ? updatedHouse : h));
  })
  .catch(() => alert('Erro ao remover entrada'));

};


  const resetAllScores = () => {
    if (window.confirm('⚠️ ATENÇÃO: Isso irá resetar TODOS os pontos de TODAS as casas! Tem certeza?')) {
      if (window.confirm('🚨 ÚLTIMA CONFIRMAÇÃO: Esta ação é IRREVERSÍVEL! Continuar?')) {
        fetch('http://localhost:3001/reset', { method: 'POST' })
          .then(() => {
            setHouses(prev => prev.map(house => ({
              ...house,
              total: 0,
              entries: []
            })));
            alert('✅ Todos os pontos foram resetados!');
          })
          .catch(() => alert('Erro ao resetar pontos'));

        alert('✅ Todos os pontos foram resetados!');
      }
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPassword('');
    localStorage.removeItem('hogwarts_admin_auth');
  };

  const sortedHouses = [...houses].sort((a, b) => b.total - a.total);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.2,
                animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-md w-full mx-4">
          <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <Lock className="h-16 w-16 text-purple-400 mx-auto animate-pulse" />
                <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-2xl scale-150 animate-pulse"></div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Área Restrita
              </h1>
              <p className="text-gray-400 text-sm">Apenas o Diretor de Hogwarts pode acessar</p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha do Diretor"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl pl-10 pr-12 py-4 text-white focus:border-purple-400 focus:outline-none transition-colors duration-300"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Acessar Painel Administrativo
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                🔒 Área protegida por magia antiga
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `magicalFloat ${15 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`
            }}
          >
            <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 text-purple-400/20" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="relative inline-block mb-6">
            <Award className="h-16 w-16 sm:h-20 sm:w-20 text-purple-400 mx-auto animate-pulse" />
            <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-2xl scale-150 animate-pulse"></div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Painel Administrativo
          </h1>
          <p className="text-gray-400 text-lg mb-6">Gerenciamento de Pontos das Casas de Hogwarts</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setBulkMode(!bulkMode)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                bulkMode 
                  ? 'bg-gradient-to-r from-green-600 to-green-500 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {bulkMode ? '✅ Modo Múltiplo' : '📝 Modo Individual'}
            </button>
            
            <button
              onClick={resetAllScores}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300"
            >
              <RotateCcw className="h-5 w-5 inline mr-2" />
              Reset Geral
            </button>
            
            <button
              onClick={logout}
              className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300"
            >
              🚪 Sair
            </button>
          </div>
        </div>

        {/* Ranking Atual */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-purple-400">🏆 Ranking Atual</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {sortedHouses.map((house, index) => {
              const IconComponent = house.colors.icon;
              const position = index + 1;
              
              return (
                <div
                  key={house.name}
                  className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl border border-gray-700/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold mr-3">
                      {position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : `${position}º`}
                    </span>
                    <IconComponent className={`h-8 w-8 text-${house.colors.primary}-400`} />
                  </div>
                  
                  <h3 className={`text-xl font-bold text-${house.colors.primary}-400 mb-2`}>
                    {house.name}
                  </h3>
                  
                  <div className={`text-3xl font-bold bg-gradient-to-r ${house.colors.gradient} bg-clip-text text-transparent`}>
                    {house.total}
                  </div>
                  
                  <p className="text-gray-400 text-sm mt-2">
                    {house.entries.length} entradas
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gerenciamento de Pontos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {houses.map((house) => {
            const IconComponent = house.colors.icon;
            
            return (
              <div
                key={house.name}
                className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-6 sm:p-8"
              >
                {/* House Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${house.colors.gradient} rounded-2xl flex items-center justify-center`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold text-${house.colors.primary}-400`}>
                        {house.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{house.total} pontos</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedHouse(selectedHouse === house.name ? null : house.name)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      selectedHouse === house.name
                        ? `bg-${house.colors.primary}-500 text-white`
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {selectedHouse === house.name ? 'Fechar' : 'Gerenciar'}
                  </button>
                </div>

                {/* Add Points Form */}
                {selectedHouse === house.name && (
                  <div className="space-y-4 mb-6 p-4 bg-black/30 rounded-2xl border border-gray-600/30">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Motivo</label>
                        <input
                          type="text"
                          value={newEntries[house.name].reason}
                          onChange={(e) => setNewEntries(prev => ({
                            ...prev,
                            [house.name]: { ...prev[house.name], reason: e.target.value }
                          }))}
                          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none"
                          placeholder="Ex: Excelente trabalho em Poções"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-2">Pontos</label>
                        <input
                          type="number"
                          value={newEntries[house.name].points}
                          onChange={(e) => setNewEntries(prev => ({
                            ...prev,
                            [house.name]: { ...prev[house.name], points: parseInt(e.target.value) || 0 }
                          }))}
                          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none"
                          placeholder="10"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2 text-white">
                          <input
                            type="radio"
                            value="gain"
                            checked={newEntries[house.name].type === 'gain'}
                            onChange={(e) => setNewEntries(prev => ({
                              ...prev,
                              [house.name]: { ...prev[house.name], type: e.target.value as 'gain' | 'loss' }
                            }))}
                            className="text-green-400"
                          />
                          <Plus className="h-4 w-4 text-green-400" />
                          <span>Ganhar</span>
                        </label>
                        
                        <label className="flex items-center space-x-2 text-white">
                          <input
                            type="radio"
                            value="loss"
                            checked={newEntries[house.name].type === 'loss'}
                            onChange={(e) => setNewEntries(prev => ({
                              ...prev,
                              [house.name]: { ...prev[house.name], type: e.target.value as 'gain' | 'loss' }
                            }))}
                            className="text-red-400"
                          />
                          <Minus className="h-4 w-4 text-red-400" />
                          <span>Perder</span>
                        </label>
                      </div>
                      
                      <button
                        onClick={() => addPoints(house.name)}
                        className={`bg-gradient-to-r ${house.colors.gradient} text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center space-x-2`}
                      >
                        <Save className="h-4 w-4" />
                        <span>Adicionar</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Recent Entries */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Últimas Entradas ({house.entries.length})
                  </h4>
                  
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {house.entries.slice(0, 5).map((entry) => (
                      <div
                        key={entry.id}
                        className="bg-gray-800/50 rounded-lg p-3 flex items-center justify-between group hover:bg-gray-700/50 transition-colors duration-300"
                      >
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          {entry.type === 'gain' ? (
                            <Plus className="h-4 w-4 text-green-400 flex-shrink-0" />
                          ) : (
                            <Minus className="h-4 w-4 text-red-400 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">{entry.reason}</p>
                            <p className="text-gray-400 text-xs">
                              {new Date(entry.date).toLocaleDateString('pt-BR')} • {entry.addedBy}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 flex-shrink-0">
                          <span className={`text-lg font-bold ${
                            entry.type === 'gain' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {entry.type === 'gain' ? '+' : ''}{entry.points}
                          </span>
                          
                          <button
                            onClick={() => removeEntry(house.name, entry.id)}
                            className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all duration-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {house.entries.length > 5 && (
                    <p className="text-gray-500 text-sm text-center">
                      ... e mais {house.entries.length - 5} entradas
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes magicalFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.2; 
          }
          50% { 
            transform: translateY(-15px) rotate(180deg); 
            opacity: 0.4; 
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPage;