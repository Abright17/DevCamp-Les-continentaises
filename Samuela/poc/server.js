const app = require('./app'); // ton fichier où tu crées l'app Express
const port = 3000;

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

