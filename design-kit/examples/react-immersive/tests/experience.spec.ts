import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('has functional heading, navigation and proper viewport', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Design that feels alive/i })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Explore the experience/ })).toBeVisible();
  const fits = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2);
  expect(fits).toBeTruthy();
});

test('responds to reduced motion and works without WebGL', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (...args: any[]) {
      if (args[0] === 'webgl' || args[0] === 'webgl2' || args[0] === 'experimental-webgl') return null;
      return original.apply(this, args as any);
    } as typeof HTMLCanvasElement.prototype.getContext;
  });
  await page.goto('/');
  await expect(page.locator('main[data-reduced-motion="true"]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Material thinking.' })).toBeVisible();
});

test('meets serious/critical axe checks on main page', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  const serious = results.violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
  expect(serious.map(v => ({ id: v.id, description: v.description, nodes: v.nodes.length }))).toEqual([]);
});

test('first keyboard stop reaches skip link', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
});
