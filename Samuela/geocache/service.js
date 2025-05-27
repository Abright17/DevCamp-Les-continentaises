const geocacheDAO = require('./GeocacheDAO');
const querystring = require('querystring');
const http = require('http');

const repondre = async function(requete, reponse) {
    if (requete.method === 'GET') {
        if (requete.url === '/geocache/liste' || requete.url === '/geocache/liste/') {
            const liste = await geocacheDAO.listerGeocaches();
            reponse.writeHead(200, { 'Content-Type': 'application/json' });
            return reponse.end(JSON.stringify(liste));
        }

        const match = requete.url.match(/\/geocache\/([0-9]+)\/?/);
        if (match) {
            const id = match[1];
            console.log('Recherche geocache ID: ' + id);
            const geo = await geocacheDAO.chercherGeocache(id);
            reponse.writeHead(200, { 'Content-Type': 'application/json' });
            return reponse.end(JSON.stringify(geo));
        }
        if (requete.url === '/geocache/hasard' || requete.url === '/geocache/hasard/') {
            const liste = await geocacheDAO.listerGeocaches();
           const idAlea= await geocacheDAO.geocacheHasard();
            reponse.writeHead(200, { 'Content-Type': 'application/json' });
            return reponse.end(JSON.stringify(idAlea));
        }
    }

     if (requete.method === 'POST') {
        if (requete.url === '/geocache/ajouter' || requete.url === '/geocache/ajouter/') {
            let body = '';

            requete.on('data', chunk => {
                body += chunk;
            });

            requete.on('end', async () => {
                const data = querystring.parse(body);

                const geo = {
                    nom: data.nom,
                    proprietaire: data.proprietaire,
                    longitude: parseFloat(data.longitude),
                    latitude: parseFloat(data.latitude)
                };

                console.log("Ajout de geocache : " + JSON.stringify(geo));

                try {
                    await geocacheDAO.ajouterGeocache(geo);
                    reponse.writeHead(200, { 'Content-Type': 'text/html' });
                    reponse.end('<p>✅ Géocache ajoutée avec succès !</p><a href="/">Retour</a>');
                } catch (err) {
                    console.error(err);
                    reponse.writeHead(500, { 'Content-Type': 'text/plain' });
                    reponse.end("❌ Erreur lors de l'ajout du géocache.");
                }
            });

            return;
        }
    }

    reponse.writeHead(404, { 'Content-Type': 'text/plain' });
    reponse.end('404 - Rien ici');
};

const serveur = http.createServer(repondre);
serveur.listen(3000, () => {
    console.log("Serveur en écoute sur le port 3000...");
});
