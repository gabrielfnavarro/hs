import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Suporte a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, 'hogwarts.db'));

// Apagar tabelas antigas se houver
db.exec(`DROP TABLE IF EXISTS score_entries; DROP TABLE IF EXISTS houses;`);

// Criar tabelas
db.exec(`
CREATE TABLE houses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  total INTEGER NOT NULL DEFAULT 0,
  primary_color TEXT NOT NULL,
  gradient TEXT NOT NULL,
  icon TEXT
);

CREATE TABLE score_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  house_id INTEGER NOT NULL,
  reason TEXT NOT NULL,
  points INTEGER NOT NULL,
  date TEXT NOT NULL,
  type TEXT CHECK(type IN ('gain', 'loss')) NOT NULL,
  FOREIGN KEY (house_id) REFERENCES houses(id) ON DELETE CASCADE
);
`);

// Inserir casas
const insertHouse = db.prepare(`
  INSERT INTO houses (name, total, primary_color, gradient, icon)
  VALUES (?, ?, ?, ?, ?)
`);

const houses = [
  ['Grifinória', 420, 'red', 'from-red-600 to-yellow-500', 'Shield'],
  ['Sonserina', 380, 'green', 'from-green-600 to-gray-400', 'Zap'],
  ['Corvinal', 350, 'blue', 'from-blue-600 to-blue-400', 'Crown'],
  ['Lufa-Lufa', 340, 'yellow', 'from-yellow-600 to-yellow-400', 'Heart']
];

const houseIds = houses.map((house) => insertHouse.run(...house).lastInsertRowid);

// Inserir entradas de exemplo (só Grifinória aqui)
const insertEntry = db.prepare(`
  INSERT INTO score_entries (house_id, reason, points, date, type)
  VALUES (?, ?, ?, ?, ?)
`);

const grifinoriaEntries = [
  ['Harry Potter salvou a Pedra Filosofal', 60, '2024-01-15', 'gain'],
  ['Hermione resolveu o enigma das poções', 50, '2024-01-14', 'gain'],
  ['Ron venceu no xadrez gigante', 50, '2024-01-14', 'gain'],
  ['Neville mostrou coragem', 10, '2024-01-13', 'gain'],
  ['Saída noturna não autorizada', -50, '2024-01-12', 'loss']
];

grifinoriaEntries.forEach(e => insertEntry.run(houseIds[0], ...e));

console.log('Banco criado com sucesso!');
