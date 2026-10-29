import { test, expect } from '@playwright/test';

test('hero and controls render and presets change theme', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Good design');
  await page.getByRole('button', { name: /the red room/i }).click();
  await expect(page.getByText('The red room', { exact: true }).last()).toBeVisible();
  await expect(page.locator('html')).toHaveCSS('--base', '#211514');
});
test('reference URL generates real local command', async ({ page }) => {
  await page.goto('/#extract');
  await page.getByLabel('PASTE A WEBSITE URL').fill('https://example.com');
  await page.getByRole('button', { name: 'Prepare extraction command' }).click();
  await expect(page.getByText('npx designlang "https://example.com/" --full')).toBeVisible();
});
test('mobile page has no horizontal overflow', async ({ page }) => {
  await page.goto('/');
  const widths=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,view:window.innerWidth}));
  expect(widths.doc).toBeLessThanOrEqual(widths.view + 2);
});
test('reduced motion remains readable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading',{name:/Colour is/i})).toBeVisible();
});
