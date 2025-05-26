const mysql = require('mysql2/promise');
const connexion = {
  host: "127.0.0.1",
  user: "geocaching",
  password: "donnees2",
  database: "geocaching"
};

exports.listerGeocaches = async function() {
    console.log("GeocacheDAO.listerGeocaches()");
    const db = await mysql.createConnection(connexion);
    const [rows] = await db.execute('SELECT * FROM geocache');

    const liste = {};
    let position = 0;
    for (let geo of rows) {
        console.log(`DAO: ${geo.nom} (${geo.latitude}, ${geo.longitude})`);
        liste[position++] = geo;
    }

    return liste;
};
exports.chercherGeocache = async function(id) {
    console.log(`GeocacheDAO.chercherGeocache(${id})`);
    const db = await mysql.createConnection(connexion);
    const [rows] = await db.execute('SELECT * FROM geocache WHERE id = ?', [id]);
    return rows[0];
};

exports.ajouterGeocache = async function(geo) {
    console.log("GeocacheDAO.ajouterGeocache(" + JSON.stringify(geo) + ")");
    const db = await mysql.createConnection(connexion);
    const sql = 'INSERT INTO geocache (nom, proprietaire, latitude, longitude) VALUES (?, ?, ?, ?)';
    await db.execute(sql, [geo.nom, geo.proprietaire, geo.latitude, geo.longitude]);
};
exports.geocacheHasard = async function() {
  console.log("GeocacheDAO.geocacheHasard()");
  const db = await mysql.createConnection(connexion);
  try {
    const [rows] = await db.execute('SELECT * FROM geocache ORDER BY RAND() LIMIT 1');
    return rows[0];
  } finally {
    await db.end();
  }
};

