var mysql = require('mysql2');

var connexion = mysql.createConnection({
  host: "127.0.0.1",
  user: "geocaching",
  password: "donnees2"
});
connexion.connect(function(erreur) {
if (erreur) throw erreur;
console.log("Connecte");
connexion.query('USE geocaching;');
var sql = "SELECT * FROM geocache";
connexion.query(
sql,
function (erreur, resultat) {
if (erreur) throw erreur;
console.log("Resultat: " + resultat);
geocache1 = resultat[0];
console.log(geocache1.nom);
});
});
