import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
const db = new Database('hogwarts.db');
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Criação das tabelas se não existirem
db.prepare(`
  CREATE TABLE IF NOT EXISTS houses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    total INTEGER,
    primary_color TEXT,
    gradient TEXT,
    icon TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    house_id INTEGER,
    reason TEXT,
    points INTEGER,
    type TEXT,
    date TEXT,
    added_by TEXT
  )
`).run();

// GET todas as casas
app.get('/houses', (req, res) => {
  const houses = db.prepare('SELECT * FROM houses').all();
  const housesWithEntries = houses.map(house => {
    const entries = db.prepare('SELECT * FROM entries WHERE house_id = ? ORDER BY date DESC').all(house.id);
    return {...house, entries};
  });
  res.json(housesWithEntries);
});


// GET entradas de uma casa
app.get('/houses/:id/entries', (req, res) => {
  const entries = db.prepare('SELECT * FROM entries WHERE house_id = ? ORDER BY date DESC').all(req.params.id);
  res.json(entries);
});

// POST nova entrada e atualização da pontuação
app.post('/houses/:id/entries', (req, res) => {
  const { reason, points, type, addedBy } = req.body;
  const date = new Date().toISOString().split('T')[0];

  const value = type === 'loss' ? -Math.abs(points) : Math.abs(points);

  db.prepare(`
    INSERT INTO entries (house_id, reason, points, type, date, added_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(req.params.id, reason, value, type, date, addedBy);

  db.prepare(`UPDATE houses SET total = total + ? WHERE id = ?`).run(value, req.params.id);

  res.json({ success: true });
});

app.delete('/houses/:houseId/entry/:entryId', (req, res) => {
  const { houseId, entryId } = req.params;
  const entry = db.prepare('SELECT points FROM entries WHERE id = ?').get(entryId);
  if (!entry) return res.status(404).json({ error: 'Entrada não encontrada' });

  db.prepare('DELETE FROM entries WHERE id = ?').run(entryId);
  db.prepare('UPDATE houses SET total = total - ? WHERE id = ?').run(entry.points, houseId);

  const updatedHouse = db.prepare('SELECT * FROM houses WHERE id = ?').get(houseId);
  const entries = db.prepare('SELECT * FROM entries WHERE house_id = ? ORDER BY date DESC').all(houseId);
  res.json({ ...updatedHouse, entries });
});


// Reset geral
app.post('/reset', (req, res) => {
  db.prepare('DELETE FROM entries').run();
  db.prepare('UPDATE houses SET total = 0').run();
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
