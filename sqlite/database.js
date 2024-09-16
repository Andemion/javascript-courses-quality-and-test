const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('./sqlite/mydatabase.sqlite', (err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données:', err.message);
    } else {
        console.log('Connexion à la base de données SQLite réussie.');
    }
});

// Créez la table 'players' si elle n'existe pas
db.run(`CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY,
    pseudo TEXT,
    score INTEGER,
    ip TEXT,
    timestamp INTEGER
)`, (err) => {
    if (err) {
        console.error('Erreur lors de la création de la table:', err.message);
    } else {
        console.log('Table "players" vérifiée/créée.');
    }
});

// Exporter l'instance de la base de données
module.exports = db;
