const Game = require('../game.js');

let game;

beforeAll(async () => {
    game = new Game();
    await game.loadWords();
    game.word = "damien"; // Setting a known word for tests
    game.unknowWord = "######";
    game.score = 1000;
});

describe("Game test", () => {

    test("The word must be 'damien'", () => {
        expect(game.word).toBe("damien");
    });

    test("should be 5 tries at the beginning of the game", () => {
        expect(game.getNumberOfTries()).toBe(5);
    });

    test("test the try mechanic with a correct guess", () => {
        game.guess("a");
        expect(game.getNumberOfTries()).toBe(5);
    });

    test("test the try mechanic of score with a correct guess", () => {
        game.guess("w");
        expect(game.getScore()).toBe(950);
    });

    test("test the try mechanic with a uncorrect guess", () => {
        game.guess("z");
        expect(game.getNumberOfTries()).toBe(3);
    });

    test("test the setScore mechanic with numberOfTry == 0", () => {
        game.numberOfTry = 0;
        game.setScore()
        expect(game.getScore()).toBe(0);
    });

    test("test the hightScoreGenerator mechanic with", () => {
        var list = []
        game.hightScoreGenerator(list);
        expect(list.length).toBe(1000);
    });

    test("should show only 'a' letter", () => {
        game.word = "damien";
        game.unknowWord = "######";
        game.guess("a");
        console.log(game.word);
        console.log(game.unknowWord);
        expect(game.print()).toBe("#a####");
    });

    test("test the try mechanic with an incorrect guess", () => {
        expect(() => game.guess("*")).toThrow("The input is not a letter.");
    });

    test("test the chooseWord mechanic with wordDay under Date.now()", () => {
        game.listOfWords = ["hello"];
        game.word = "world";
        game.wordDay = Date.now() - 10000;
        game.chooseWord();
        expect(game.word).toBe("hello");
    });

    test("test the chooseWord mechanic with empty word", () => {
        game.listOfWords = ["hello"];
        game.word = "";
        game.chooseWord();
        expect(game.word).toBe("hello");
    });

    test("should throw an error if no words are available", () => {
        game.listOfWords = [];
        expect(() => game.chooseWord()).toThrow("No words available to choose from.");
    });

    test("test entry lettre without word", () => {
        game.word = "";
        expect(() => game.guess("a")).toThrow("The word has not been set. Please ensure that the game has been initialized properly.");
    });

});
