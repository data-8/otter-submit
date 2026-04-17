import { test, expect } from '@jupyterlab/galata';

test.describe('otter-submit toolbar button', () => {
  test('submit button appears in the notebook toolbar', async ({ page }) => {
    await page.notebook.createNew();

    const submitBtn = page.locator(
      '.jp-NotebookPanel .jp-Toolbar [data-command="otter-submit:submit"]'
    );
    await expect(submitBtn).toBeVisible();
  });

  test('clicking submit button shows confirmation dialog', async ({ page }) => {
    await page.notebook.createNew();

    const submitBtn = page.locator(
      '.jp-NotebookPanel .jp-Toolbar [data-command="otter-submit:submit"]'
    );
    await submitBtn.click();

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
