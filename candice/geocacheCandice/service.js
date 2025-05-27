const express = require('express');
const { LocalStorage } = require('node-localstorage');
const app = express();

// 🔹 Initialiser localStorage dans un répertoire nommé "geocache_data"
const localStorage = new LocalStorage('./geocache_data');

// 🔹 Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Charger les données depuis localStorage
let geocaches = [];
const savedData = localStorage.getItem('geocaches');
if (savedData) {
    geocaches = JSON.parse(savedData);
} else {
    // Données par défaut si rien n'est stocké
    geocaches = [
        { id: 1, nom: "Cache du parc", description: "Sous un banc", latitude: 45.5017, longitude: -73.5673 },
        { id: 2, nom: "Cache en forêt", description: "Près d'un arbre", latitude: 45.5040, longitude: -73.5800 },
        { id: 3, nom: "Cache urbaine", description: "Dans un mur creux", latitude: 45.4975, longitude: -73.5701 }
    ];
    localStorage.setItem('geocaches', JSON.stringify(geocaches));
}

/// 🔹 Route 1 : Lister tous les géocaches
app.get('/geocache/liste/', (req, res) => {
    res.send(geocaches);
});

// ✅ 🔹 Route 3 : Retourner une géocache au hasard — doit venir avant /:id
app.get('/geocache/hasard/', (req, res) => {
    const index = Math.floor(Math.random() * geocaches.length);
    res.send(geocaches[index]);
});

// 🔹 Route 2 : Obtenir une géocache par ID
app.get('/geocache/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).send({ message: "ID invalide" });

    const geocache = geocaches.find(g => g.id === id);
    if (geocache) {
        res.send(geocache);
    } else {
        res.status(404).send({ message: "Geocache non trouvée" });
    }
});


// 🔹 Route 4 : Ajouter une géocache
app.post('/geocache/ajouter/', (req, res) => {
    const geocache = req.body;
    geocache.id = geocaches.length > 0 ? geocaches[geocaches.length - 1].id + 1 : 1;
    geocaches.push(geocache);

    // 🔸 Sauvegarder dans localStorage
    localStorage.setItem('geocaches', JSON.stringify(geocaches));

    res.redirect('/geocache/liste/');
});

// 🔹 Lancer le serveur
app.listen(3000, () => {
    console.log("✅ Serveur en ligne sur http://137.177.194.89:3000");
});
