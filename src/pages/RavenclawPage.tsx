import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import History from '../components/History';
import Members from '../components/Members';
import Traits from '../components/Traits';
import Scoreboard from '../components/Scoreboard';
import Footer from '../components/Footer';

const RavenclawPage = () => {
  const houseData = {
    name: 'Corvinal',
    colors: {
      primary: 'blue',
      secondary: 'blue',
      gradient: 'from-blue-600 to-blue-400'
    },
    motto: 'Wit Beyond Measure is Man\'s Greatest Treasure',
    description: 'A Casa da Sabedoria, Criatividade e Aprendizado. Onde mentes brilhantes se encontram para explorar os mistérios da magia e expandir os horizontes do conhecimento.',
    founder: 'Rowena Ravenclaw',
    traits: [
      { name: 'Inteligência', description: 'Capacidade superior de raciocínio e compreensão' },
      { name: 'Criatividade', description: 'Habilidade de pensar de forma inovadora' },
      { name: 'Sabedoria', description: 'Conhecimento profundo e discernimento' },
      { name: 'Curiosidade', description: 'Sede insaciável de conhecimento' }
    ],
    members: [
      {
        name: 'Luna Lovegood',
        title: 'Estudante Notável',
        achievement: 'Membro da Armada de Dumbledore',
        description: 'Excêntrica e corajosa, demonstrou que a inteligência pode se manifestar de formas únicas e inesperadas.',
        traits: ['Originalidade', 'Coragem', 'Lealdade']
      },
      {
        name: 'Cho Chang',
        title: 'Apanhadora',
        achievement: 'Capitã do Time de Quadribol',
        description: 'Talentosa jogadora de Quadribol e estudante dedicada, representou bem os valores de excelência da Corvinal.',
        traits: ['Atletismo', 'Dedicação', 'Liderança']
      },
      {
        name: 'Rowena Ravenclaw',
        title: 'Fundadora',
        achievement: 'Uma das Quatro Fundadoras',
        description: 'Conhecida por sua inteligência incomparável e pela criação do Diadema da Ravenclaw.',
        traits: ['Inteligência', 'Sabedoria', 'Criatividade']
      }
    ],
    history: [
      {
        period: 'Século X',
        title: 'Fundação da Casa',
        description: 'Fundada por Rowena Ravenclaw, conhecida por sua inteligência excepcional e amor pelo aprendizado.',
        highlight: 'Marco Histórico'
      },
      {
        period: 'Séculos XV-XVII',
        title: 'Era dos Descobridores',
        description: 'Corvinal produziu grandes inventores e descobridores mágicos, revolucionando campos como Transfiguração e Feitiços.',
        highlight: 'Idade de Ouro'
      },
      {
        period: 'Século XX-XXI',
        title: 'Tempos Modernos',
        description: 'A casa continua a produzir bruxos excepcionais, mantendo viva a tradição de excelência acadêmica.',
        highlight: 'Era Contemporânea'
      }
    ]
  };

  return (
    <>
      <Header houseColors={houseData.colors} />
      <Hero houseData={houseData} />
      <History houseData={houseData} />
      <Members houseData={houseData} />
      <Traits houseData={houseData} />
      <Scoreboard currentHouse="Corvinal" />
      <Footer houseColors={houseData.colors} />
    </>
  );
};

export default RavenclawPage;