import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import History from '../components/History';
import Members from '../components/Members';
import Traits from '../components/Traits';
import Scoreboard from '../components/Scoreboard';
import Footer from '../components/Footer';

const HufflepuffPage = () => {
  const houseData = {
    name: 'Lufa-Lufa',
    colors: {
      primary: 'yellow',
      secondary: 'yellow',
      gradient: 'from-yellow-600 to-yellow-400'
    },
    motto: 'Hard Work and Loyalty Above All',
    description: 'A Casa da Lealdade, Dedicação e Trabalho Árduo. Onde corações fiéis se encontram para construir um mundo melhor através da perseverança e compaixão.',
    founder: 'Helga Hufflepuff',
    traits: [
      { name: 'Lealdade', description: 'Fidelidade inabalável aos amigos e princípios' },
      { name: 'Dedicação', description: 'Comprometimento total com os objetivos' },
      { name: 'Paciência', description: 'Perseverança através das dificuldades' },
      { name: 'Justiça', description: 'Senso aguçado de equidade e fairness' }
    ],
    members: [
      {
        name: 'Cedric Diggory',
        title: 'Campeão de Hogwarts',
        achievement: 'Campeão do Torneio Tribruxo',
        description: 'Jovem exemplar que demonstrou que a verdadeira grandeza vem da bondade e fair play.',
        traits: ['Honra', 'Bondade', 'Coragem']
      },
      {
        name: 'Nymphadora Tonks',
        title: 'Auror',
        achievement: 'Membro da Ordem da Fênix',
        description: 'Metamorfomaga corajosa que lutou bravamente pela liberdade, demonstrando lealdade até o fim.',
        traits: ['Coragem', 'Lealdade', 'Humor']
      },
      {
        name: 'Helga Hufflepuff',
        title: 'Fundadora',
        achievement: 'Uma das Quatro Fundadoras',
        description: 'Conhecida por sua bondade e por aceitar todos os estudantes, valorizando o trabalho árduo acima do talento.',
        traits: ['Bondade', 'Inclusão', 'Sabedoria']
      }
    ],
    history: [
      {
        period: 'Século X',
        title: 'Fundação da Casa',
        description: 'Fundada por Helga Hufflepuff, conhecida por sua bondade e por aceitar estudantes de todas as origens.',
        highlight: 'Marco Histórico'
      },
      {
        period: 'Séculos XI-XIX',
        title: 'Era dos Construtores',
        description: 'Lufa-Lufa produziu grandes trabalhadores e construtores da sociedade mágica, sempre com foco no bem comum.',
        highlight: 'Idade da Construção'
      },
      {
        period: 'Século XX-XXI',
        title: 'Guardiões da Tradição',
        description: 'A casa continua a formar indivíduos dedicados que valorizam a lealdade e o trabalho árduo.',
        highlight: 'Era da Dedicação'
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
      <Scoreboard currentHouse="Lufa-Lufa" />
      <Footer houseColors={houseData.colors} />
    </>
  );
};

export default HufflepuffPage;