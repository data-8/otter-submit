import { test, expect } from '@jupyterlab/galata';

test.describe('otter-submit toolbar button', () => {
  test.beforeEach(async ({ page }) => {
    // Open a new notebook before each test
    await page.menu.clickMenuItem('File>New>Notebook');
    await page.waitForSelector('.jp-NotebookPanel', { state: 'visible' });
    // Dismiss the kernel selector if it appears
    const selectKernelBtn = page.locator('button:has-text("Select")');
    if (await selectKernelBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await selectKernelBtn.click();
    }
  });

  test('submit button appears in the notebook toolbar', async ({ page }) => {
    const submitBtn = page.locator(
      '.jp-NotebookPanel .jp-Toolbar [data-command="otter-submit:submit"]'
    );
    await expect(submitBtn).toBeVisible();
  });

  test('clicking submit button shows confirmation dialog', async ({ page }) => {
    const submitBtn = page.locator(
      '.jp-NotebookPanel .jp-Toolbar [data-command="otter-submit:submit"]'
    );
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Dialog should appear with the submission confirmation message
    const dialog = page.locator('.jp-Dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('.jp-Dialog-header')).toHaveText(
      'Notebook Submitted for Grading'
    );
    await expect(dialog.locator('.jp-Dialog-body')).toContainText(
      'Your notebook has been submitted for grading'
    );

    // Dismiss the dialog
    await dialog.locator('button:has-text("OK")').click();
    await expect(dialog).not.toBeVisible();
  });
});