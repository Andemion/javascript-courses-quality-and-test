module.exports = {
  // Chemin vers le dossier contenant vos tests
  testMatch: [
    "**/test/jest/**/*.(test|spec).js", // Inclut tous les fichiers .test.js ou .spec.js dans test/jest/
  ],

  // Ou utilisez `testRegex` si vous préférez une expression régulière
  // testRegex: "test/jest/.*\\.(test|spec)\\.js$",

  // Autres options Jest
  verbose: true, // Affiche des informations détaillées pendant les tests
  collectCoverage: true, // Active le rapport de couverture
  coverageReporters: ["json-summary"],
};
