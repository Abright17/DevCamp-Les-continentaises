const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'geocaches.json');
let geocaches = JSON.parse(fs.readFileSync(dbPath, 'utf8'));


router.get('/liste', (req, res) => {
  res.json(geocaches);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const g = geocaches.find(g => g.id === id);
  if (g) res.json(g);
  else res.status(404).send('Non trouvé');
});

router.post('/ajouter', (req, res) => {
  const nouveau = req.body;
  nouveau.id = Date.now();
  geocaches.push(nouveau);
  fs.writeFileSync(dbPath, JSON.stringify(geocaches, null, 2));
  res.status(201).json(nouveau);
});

router.put('/editer/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = geocaches.findIndex(g => g.id === id);
  if (index !== -1) {
    geocaches[index] = { ...geocaches[index], ...req.body };
    fs.writeFileSync(dbPath, JSON.stringify(geocaches, null, 2));
    res.json(geocaches[index]);
  } else {
    res.status(404).send('Non trouvé');
  }
});

router.delete('/effacer/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = geocaches.findIndex(g => g.id === id);
  if (index !== -1) {
    const supprimé = geocaches.splice(index, 1);
    fs.writeFileSync(dbPath, JSON.stringify(geocaches, null, 2));
    res.json(supprimé);
  } else {
    res.status(404).send('Non trouvé');
  }
});

module.exports = router;
