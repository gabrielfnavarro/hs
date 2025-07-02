import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, Star, Clock, User, Download, Eye, Bookmark, Sparkles, Scroll, Wand2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  pages: number;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Mestre';
  rating: number;
  cover: string;
  publishedYear: number;
  tags: string[];
  isRestricted: boolean;
}

const LibraryPage = () => {
  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      title: 'História de Hogwarts',
      author: 'Bathilda Bagshot',
      category: 'História',
      description: 'Um relato completo da fundação e evolução da Escola de Magia e Bruxaria de Hogwarts.',
      pages: 847,
      difficulty: 'Intermediário',
      rating: 4.8,
      cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
      publishedYear: 1947,
      tags: ['História', 'Hogwarts', 'Fundadores'],
      isRestricted: false
    },
    {
      id: '2',
      title: 'Poções Avançadas',
      author: 'Libatius Borage',
      category: 'Poções',
      description: 'Manual completo de poções complexas para estudantes avançados.',
      pages: 1205,
      difficulty: 'Avançado',
      rating: 4.6,
      cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
      publishedYear: 1962,
      tags: ['Poções', 'Alquimia', 'Ingredientes'],
      isRestricted: false
    },
    {
      id: '3',
      title: 'Segredos das Artes Sombrias',
      author: 'Autor Desconhecido',
      category: 'Artes Sombrias',
      description: 'Conhecimento proibido sobre magia sombria. Acesso restrito.',
      pages: 666,
      difficulty: 'Mestre',
      rating: 3.2,
      cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
      publishedYear: 1456,
      tags: ['Artes Sombrias', 'Proibido', 'Maldições'],
      isRestricted: true
    },
    {
      id: '4',
      title: 'Transfiguração Hoje',
      author: 'Emeric Switch',
      category: 'Transfiguração',
      description: 'Guia moderno para a arte da transfiguração mágica.',
      pages: 432,
      difficulty: 'Intermediário',
      rating: 4.5,
      cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
      publishedYear: 1978,
      tags: ['Transfiguração', 'Metamorfose', 'Teoria'],
      isRestricted: false
    },
    {
      id: '5',
      title: 'Herbologia Mágica',
      author: 'Phyllida Spore',
      category: 'Herbologia',
      description: 'Estudo completo das plantas mágicas e suas propriedades.',
      pages: 623,
      difficulty: 'Iniciante',
      rating: 4.7,
      cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
      publishedYear: 1985,
      tags: ['Herbologia', 'Plantas', 'Botânica'],
      isRestricted: false
    },
    {
      id: '6',
      title: 'Defesa Contra as Artes Sombrias',
      author: 'Quentin Trimble',
      category: 'DCAT',
      description: 'Manual essencial para proteção contra magia sombria.',
      pages: 789,
      difficulty: 'Intermediário',
      rating: 4.9,
      cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
      publishedYear: 1992,
      tags: ['Defesa', 'Proteção', 'Contra-feitiços'],
      isRestricted: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todas');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = ['Todas', 'História', 'Poções', 'Transfiguração', 'Herbologia', 'DCAT', 'Artes Sombrias'];
  const difficulties = ['Todas', 'Iniciante', 'Intermediário', 'Avançado', 'Mestre'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Todas' || book.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'Todas' || book.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Intermediário': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Avançado': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'Mestre': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
        
        {[...Array(10)].map((_, i) => (
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
            <Scroll className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400/15 rotate-12" />
          </div>
        ))}
      </div>

      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 sm:pt-24">
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-7xl mx-auto">
          <div className={`transform transition-all duration-2000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-75'
          }`}>
            <div className="relative inline-block mb-8 sm:mb-12">
              <BookOpen className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 text-blue-400 mx-auto transition-all duration-1000 hover:scale-110" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-3xl scale-150 animate-pulse"></div>
              <div className="absolute inset-0 bg-blue-400/10 rounded-full blur-2xl scale-200 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          <div className={`transform transition-all duration-2000 delay-300 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
                BIBLIOTECA DE HOGWARTS
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-300 font-light italic mb-8 sm:mb-12">
              Repositório do Conhecimento Mágico
            </p>
            
            <div className="relative bg-black/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 mb-12 sm:mb-16 max-w-5xl mx-auto">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                Explore a vasta coleção de livros mágicos de Hogwarts. Desde textos fundamentais até 
                conhecimentos avançados, nossa biblioteca digital oferece acesso ao saber acumulado 
                ao longo dos séculos.
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className={`transform transition-all duration-2000 delay-600 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl border border-gray-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-12 sm:mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar livros, autores, tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:border-blue-400 focus:outline-none transition-colors duration-300"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:border-blue-400 focus:outline-none appearance-none transition-colors duration-300"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div className="relative">
                  <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:border-blue-400 focus:outline-none appearance-none transition-colors duration-300"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Books Grid */}
          <div className={`transform transition-all duration-2000 delay-900 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredBooks.map((book, index) => (
                <div
                  key={book.id}
                  className="group relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl border border-gray-700/50 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-700 hover:transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {book.isRestricted && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
                      <div className="bg-red-500/20 backdrop-blur-sm text-red-400 px-2 sm:px-3 py-1 rounded-full text-xs font-medium border border-red-500/30">
                        Restrito
                      </div>
                    </div>
                  )}

                  {/* Book Cover */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                    
                    {/* Rating */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                        <span className="text-white text-xs sm:text-sm font-medium">{book.rating}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-blue-500/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-blue-500 transition-colors duration-300">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="bg-green-500/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-green-500 transition-colors duration-300">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="bg-yellow-500/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-yellow-500 transition-colors duration-300">
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    {/* Title and Author */}
                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-500 mb-1 sm:mb-2 leading-tight">
                        {book.title}
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base flex items-center">
                        <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        {book.author}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                      {book.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-400">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {book.publishedYear}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {book.pages} páginas
                      </div>
                    </div>

                    {/* Difficulty and Category */}
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(book.difficulty)}`}>
                        {book.difficulty}
                      </span>
                      <span className="px-2 sm:px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-xs font-medium border border-blue-400/30">
                        {book.category}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-3">
                      {book.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBooks.length === 0 && (
              <div className="text-center py-12 sm:py-16">
                <BookOpen className="h-16 w-16 sm:h-20 sm:w-20 text-gray-500 mx-auto mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-400 mb-2 sm:mb-4">Nenhum livro encontrado</h3>
                <p className="text-gray-500">Tente ajustar seus filtros de busca</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes floatMagic {
          0%, 100% { 
            transform: translateY(0px) rotate(12deg); 
            opacity: 0.15; 
          }
          50% { 
            transform: translateY(-15px) rotate(192deg); 
            opacity: 0.3; 
          }
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default LibraryPage;