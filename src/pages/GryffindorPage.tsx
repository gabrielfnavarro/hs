import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import History from '../components/History';
import Members from '../components/Members';
import Traits from '../components/Traits';
import Scoreboard from '../components/Scoreboard';
import Footer from '../components/Footer';

const GryffindorPage = () => {
  const houseData = {
    name: 'Grifinória',
    colors: {
      primary: 'red',
      secondary: 'yellow',
      gradient: 'from-red-600 to-yellow-500'
    },
    motto: 'Courage and Bravery Above All',
    description: 'A Casa da Coragem, Bravura e Cavalaria. Onde corações valentes se encontram para enfrentar qualquer desafio com determinação e honra.',
    founder: 'Godric Gryffindor',
    traits: [
      { name: 'Coragem', description: 'A bravura para enfrentar qualquer perigo' },
      { name: 'Cavalaria', description: 'Honra e nobreza em todas as ações' },
      { name: 'Determinação', description: 'Força de vontade inabalável' },
      { name: 'Liderança', description: 'Capacidade natural de liderar outros' }
    ],
    members: [
      {
        name: 'Harry Potter',
        title: 'O Menino que Sobreviveu',
        achievement: 'Derrotou Voldemort',
        description: 'O bruxo mais famoso de sua geração, conhecido por sua coragem excepcional e determinação em proteger aqueles que ama.',
        traits: ['Coragem', 'Lealdade', 'Determinação']
      },
      {
        name: 'Hermione Granger',
        title: 'A Bruxa Mais Brilhante',
        achievement: 'Melhor aluna de sua turma',
        description: 'Combinando inteligência excepcional com coragem inabalável, provou que a bravura vem em muitas formas.',
        traits: ['Inteligência', 'Coragem', 'Lealdade']
      },
      {
        name: 'Ron Weasley',
        title: 'Amigo Leal',
        achievement: 'Membro do Trio Dourado',
        description: 'Demonstrou que a verdadeira coragem está em permanecer ao lado dos amigos, mesmo nos momentos mais difíceis.',
        traits: ['Lealdade', 'Humor', 'Coragem']
      }
    ],
    history: [
      {
        period: 'Século X',
        title: 'Fundação da Casa',
        description: 'Fundada por Godric Gryffindor, conhecido por sua coragem lendária e pela criação da Espada de Gryffindor.',
        highlight: 'Marco Histórico'
      },
      {
        period: 'Século XI-XV',
        title: 'Era dos Cavaleiros',
        description: 'Grifinória produziu alguns dos maiores cavaleiros e heróis do mundo mágico, estabelecendo tradições de honra.',
        highlight: 'Idade Heroica'
      },
      {
        period: 'Século XX',
        title: 'Guerra contra Voldemort',
        description: 'A casa liderou a resistência contra as forças das trevas, com muitos membros sacrificando suas vidas pela liberdade.',
        highlight: 'Era Moderna'
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
      <Scoreboard currentHouse="Grifinória" />
      <Footer houseColors={houseData.colors} />
    </>
  );
};

export default GryffindorPage;