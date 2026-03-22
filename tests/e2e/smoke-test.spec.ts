import { test, expect } from '@playwright/test'

test('smoke test', async ({ page }) => {
  await page.goto('/')

  // app home
  await expect(page.locator('h1')).toHaveText('Rurik: Dawn of Kiev Solo Helper')
  await page.getByRole('button', { name: 'Play Game' }).click()

  // setup game
  await page.getByRole('link', { name: 'Rebellion Setup' }).click()
  await page.getByRole('link', { name: 'Player Setup' }).click()
  await page.getByRole('button', { name: 'Start Game' }).click()

  // abort game
  await page.getByRole('button', { name: 'Abort Game' }).click()
  await page.locator('#endGameModal').getByRole('button', { name: 'Abort Game' }).click()

  // app home
  await expect(page.locator('h1')).toHaveText('Rurik: Dawn of Kiev Solo Helper')
})
