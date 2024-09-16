const tools = require('./tools.js');
const csv = require('csv-parser');
const fs = require('fs');

class Game {


    constructor() {
        this.listOfWords = [];
        this.numberOfTry = 5;
        this.newGame = false;
        this.word = "";
        this.wordDay = Date.now();
        this.score = 1000;
        this.gameStart = "";
        this.gameTryPoint = "";
    }

    loadWords() {
        return new Promise((resolve, reject) => {
            fs.createReadStream('words_fr.txt')
                .pipe(csv())
                .on('data', (row) => {
                    this.listOfWords.push(row.word.toLowerCase());
                })
                .on('end', () => {
                    console.log('CSV file successfully processed');
                    this.chooseWord();
                    resolve();
                })
                .on('error', reject);
        });
    }

    chooseWord() {
        if (this.listOfWords.length > 0) {
            if (this.word == "" || (this.word.length > 0 && this.wordDay < Date.now())){
                this.wordDay = Date.now()+ 86400000;
                this.word = this.listOfWords[tools.getRandomInt(this.listOfWords.length)];
            }
            this.unknowWord = this.word.replace(/./g, '#');
        } else {
            throw new Error("No words available to choose from.");
        }
    }

    guess(oneLetter) {
        if (!this.word) {
            throw new Error("The word has not been set. Please ensure that the game has been initialized properly.");
        }

        this.setScore()

        const regex = /^[a-zA-Z]$/;

        if(regex.test(oneLetter) ){  
            if (this.word.includes(oneLetter)) {
                this.word.split("").forEach((letter, index) => {
                    if (letter.toLowerCase() == oneLetter.toLowerCase())
                        this.unknowWord = tools.replaceAt(this.unknowWord, index, oneLetter);
                })
                return true;
            }
        }else{
            throw new Error("The input is not a letter.");
        }

        this.score = this.score - 50

        this.numberOfTry--;
        return false;
    }

    print() {
        return this.unknowWord;
    }

    getNumberOfTries() {
        return this.numberOfTry;
    }

    getScore(){
        return this.score;
    }

    setScore(){
        if(this.newGame == false){
            this.newGame = true;
            this.gameStart = Date.now();
        }else if(this.numberOfTry == 0){
            this.score = 0
        }else{
            this.gameTryPoint = Date.now();
            let lostPoint = (this.gameTryPoint - this.gameStart)/1000;
            this.score = this.score - Math.round(lostPoint);
            this.gameStart = this.gameTryPoint;
        }
    }

    hightScoreGenerator(liste){
        var x = liste.length;
        
        while (x < 1000){
            var pseudo = "player" + String(x);
            var score = 500 - x
            liste.push({ pseudo: pseudo, score: score })
            x++
        }

        liste.sort((a, b) => b.score - a.score);

        return liste;
    }

}

module.exports = Game;
