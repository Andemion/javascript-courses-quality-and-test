import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3030/');
  await expect(page.locator('#try_number')).toContainText('Nombre d\'essai restant : 5');
  await page.getByText('Score actuel :').click();
  await expect(page.locator('iframe').contentFrame().locator('#content')).toBeVisible();
  await expect(page.getByText('Meilleur score d\'hier Player')).toBeVisible();
  await page.getByText('Meilleur score du jour Player').click();
});