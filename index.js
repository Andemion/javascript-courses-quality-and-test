require('dotenv').config();
const express = require('express');
const db = require('./sqlite/database.js');
const path = require('path');
const Game = require('./game.js');

const PORT = process.env.PORT || 3030;

const app = express();
const game = new Game();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.get('/', (request, response) => {
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    // Vérifier si le joueur a déjà joué aujourd'hui
    const queryCheck = `SELECT * FROM players WHERE ip = ? AND DATE(timestamp / 1000, 'unixepoch') = DATE('now')`;
    db.get(queryCheck, [ip], (err, row) => {
        if (err) {
            console.error('Erreur lors de la vérification de la participation du joueur :', err.message);
            return res.status(500).json({ error: 'Erreur interne du serveur.' });
        }

        if (row) {
            // Le joueur a déjà joué aujourd'hui
            return res.status(403).json({ error: 'Vous avez déjà joué aujourd\'hui. Revenez demain!' });
        }
    });

    response.render('pages/index', {
        game: game.print(),
        word: game.word,
        numberOfTries: game.getNumberOfTries(),
        score: game.getScore()
    });
});

app.post('/', (request, response) => {
    try { 
        if (request.body.word) {
            let guess = game.guess(request.body.word);
            console.log("Guess :" + guess);
        } else {
            console.log("No word provided in the request body.");
        }
        
        if (game.print().includes("#") && game.getNumberOfTries() == 0) {
            game.setScore()
            response.render('pages/loser', { 
                score: game.getScore(),
                word: game.word,
            });
        }
        else if (game.print().includes("#") && game.getNumberOfTries() > 0){
            response.render('pages/index', {
                game: game.print(),
                numberOfTries: game.getNumberOfTries(),
                score: game.getScore()
            });

        }else{
            response.render('pages/winner', {
                score: game.getScore()
            });
        }

    } catch (error) {
        console.error(error.message);
        response.status(500).send("An error occurred: " + error.message);
    }
});

app.post('/save-pseudo', (req, res) => {
    const { pseudo, score } = req.body;

    // Obtenir l'adresse IP du joueur depuis la requête
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Obtenir le timestamp actuel
    const timestamp = Date.now(); 

    // Vérifier que le pseudo et le score ne sont pas vides
    if (!pseudo || !score) {
        return res.status(400).json({ error: 'Le pseudo et le score sont requis.' });
    }
        // Insérer le pseudo, le score, l'IP et le timestamp dans la base de données
        const query = `INSERT INTO players (pseudo, score, ip, timestamp) VALUES (?, ?, ?, ?)`;
        db.run(query, [pseudo, score, ip, timestamp], function(err) {
            if (err) {
                console.error('Erreur lors de l\'insertion des données dans la base de données :', err.message);
                return res.status(500).json({ error: 'Erreur interne du serveur.' });
            }

            res.json({ message: 'Pseudo, score, IP, et timestamp sauvegardés avec succès!', id: this.lastID });
        });
    
});

app.get('/yesterday-scores', (req, res) => {
    
    db.all(`SELECT pseudo, score FROM players WHERE DATE(timestamp / 1000, 'unixepoch') = DATE('now', '-1 day')`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Erreur interne du serveur.' });
        } else {
            if (rows.length < 1000){
                game.hightScoreGenerator(rows)
            }
            res.json(rows);
        }
    });
});

app.get('/today-scores', (req, res) => {
    
    db.all(`SELECT pseudo, score FROM players WHERE DATE(timestamp / 1000, 'unixepoch') = DATE('now')`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Erreur interne du serveur.' });
        } else {
            if (rows.length < 1000){
                game.hightScoreGenerator(rows)
            }
            res.json(rows);
        }
    });
});

(async () => {
    try {
        await game.loadWords();
        app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
    } catch (error) {
        console.error("Failed to load words and start the server:", error);
    }
})();
