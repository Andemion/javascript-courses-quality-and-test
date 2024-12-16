const { test, expect } = require('@playwright/test');

test('header has title', async ({ page }) => {
  await page.goto('http://localhost:3030/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hangman/);
});

test('has title in H1', async ({ page }) => {
  await page.goto('http://localhost:3030/');

  // Sélectionne la balise <h1> et vérifie son texte
  const h1 = await page.locator('h1');

  await expect(h1).toContainText('LE JEU DU PENDU');
});

test('Try number equal to 5', async ({ page }) => {
    await page.goto('http://localhost:3030/');

    const locator = page.locator('legend#try_number');

    await expect(locator).toContainText(/5/);
});


test('Type a letter into the input field', async ({ page }) => {
  await page.goto('http://localhost:3030/');

  // Sélectionner le champ d'entrée avec le placeholder "Tapez une lettre"
  const inputField = page.locator('input[placeholder="Tapez une lettre"]');

  // Tapez une lettre dans le champ
  await inputField.fill('A'); // Vous pouvez aussi utiliser `type` pour simuler la saisie lettre par lettre

  // Vérifiez que la valeur du champ est bien "A"
  await expect(inputField).toHaveValue('A');
});

test('Input field accepts only letters', async ({ page }) => {
  await page.goto('http://localhost:3030/');

  const inputField = page.locator('input[placeholder="Tapez une lettre"]');

  // Essayer de saisir un chiffre
  await inputField.fill('1');
  await expect(inputField).toHaveValue(''); // Le champ ne doit pas accepter les chiffres

  // Essayer de saisir un caractère spécial
  await inputField.fill('@');
  await expect(inputField).toHaveValue(''); // Le champ ne doit pas accepter les caractères spéciaux

  // Essayer de saisir une lettre majuscule
  await inputField.fill('A');
  await expect(inputField).toHaveValue('A'); // Le champ doit accepter les lettres

  // Essayer de saisir une lettre minuscule
  await inputField.fill('b');
  await expect(inputField).toHaveValue('b'); // Le champ doit accepter les lettres
});