import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import History from '../components/History';
import Members from '../components/Members';
import Traits from '../components/Traits';
import Scoreboard from '../components/Scoreboard';
import Footer from '../components/Footer';

const SlytherinPage = () => {
  const houseData = {
    name: 'Sonserina',
    colors: {
      primary: 'green',
      secondary: 'gray',
      gradient: 'from-green-600 to-gray-400'
    },
    motto: 'Ambition and Cunning Lead to Greatness',
    description: 'A Casa da Ambição, Astúcia e Determinação. Onde mentes estratégicas se encontram para alcançar a grandeza através da inteligência e perseverança.',
    founder: 'Salazar Slytherin',
    traits: [
      { name: 'Ambição', description: 'Desejo ardente de alcançar a grandeza' },
      { name: 'Astúcia', description: 'Inteligência estratégica e perspicácia' },
      { name: 'Determinação', description: 'Persistência incansável nos objetivos' },
      { name: 'Liderança', description: 'Capacidade natural de comando' }
    ],
    members: [
      {
        name: 'Severus Snape',
        title: 'Mestre das Poções',
        achievement: 'Herói da Guerra Mágica',
        description: 'Professor complexo que demonstrou que a verdadeira coragem pode vir dos lugares mais inesperados.',
        traits: ['Inteligência', 'Sacrifício', 'Complexidade']
      },
      {
        name: 'Draco Malfoy',
        title: 'Herdeiro Nobre',
        achievement: 'Redenção Pessoal',
        description: 'Jovem que aprendeu que as escolhas definem mais que o sangue, encontrando seu próprio caminho.',
        traits: ['Evolução', 'Orgulho', 'Crescimento']
      },
      {
        name: 'Salazar Slytherin',
        title: 'Fundador',
        achievement: 'Um dos Quatro Fundadores',
        description: 'Visionário que valorizava a ambição e a pureza mágica, deixando um legado complexo e duradouro.',
        traits: ['Visão', 'Ambição', 'Legado']
      }
    ],
    history: [
      {
        period: 'Século X',
        title: 'Fundação da Casa',
        description: 'Fundada por Salazar Slytherin, conhecido por sua ambição e pela criação da Câmara Secreta.',
        highlight: 'Marco Histórico'
      },
      {
        period: 'Século XI-XIX',
        title: 'Era dos Estrategistas',
        description: 'Sonserina produziu grandes líderes políticos e estrategistas, moldando o mundo mágico através da astúcia.',
        highlight: 'Idade da Influência'
      },
      {
        period: 'Século XX-XXI',
        title: 'Renovação e Redenção',
        description: 'A casa passou por uma transformação, provando que ambição pode ser canalizada para o bem.',
        highlight: 'Era da Renovação'
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
      <Scoreboard currentHouse="Sonserina" />
      <Footer houseColors={houseData.colors} />
    </>
  );
};

export default SlytherinPage;