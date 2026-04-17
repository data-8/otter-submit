import { test, expect, Page } from '@playwright/test';

async function openNewNotebook(page: Page): Promise<void> {
  // Create a notebook via the contents API (no auth required in test config)
  const resp = await page.request.post('/api/contents', {
    data: JSON.stringify({ type: 'notebook' }),
    headers: { 'Content-Type': 'application/json' }
  });
  expect(resp.ok()).toBeTruthy();
  const { path } = await resp.json();

  // Navigate directly to the notebook
  await page.goto(`/lab/tree/${path}`);
  await page.waitForSelector('.jp-NotebookPanel', { timeout: 30000 });

  // Dismiss kernel selection dialog if shown
  const dialog = page.locator('.jp-Dialog');
  if (await dialog.isVisible({ timeout: 3000 }).catch(() => false)) {
    await dialog.locator('.jp-Dialog-footer button').last().click();
  }
  await page.waitForSelector('.jp-NotebookPanel .jp-Toolbar', {
    timeout: 15000
  });
}

test.describe('otter-submit toolbar button', () => {
  test.beforeEach(async ({ page }) => {
    await openNewNotebook(page);
  });

  test('submit button appears in notebook toolbar', async ({ page }) => {
    const submitBtn = page.locator('[data-command="otter-submit:submit"]');
    await expect(submitBtn).toBeVisible();
  });

  test('clicking submit button shows confirmation dialog', async ({ page }) => {
    await page.click('[data-command="otter-submit:submit"]');

    const dialog = page.locator('.jp-Dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('.jp-Dialog-header')).toHaveText(
      'Notebook Submitted for Grading'
    );
    await expect(dialog.locator('.jp-Dialog-body')).toContainText(
      'Your notebook has been submitted for grading'
    );
    await dialog.locator('button:has-text("OK")').click();
    await expect(dialog).not.toBeVisible();
  });
});
