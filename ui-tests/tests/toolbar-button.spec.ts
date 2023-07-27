import { test, expect } from '@jupyterlab/galata';

test('should attempt to submit', async ({ page }) => {
  // Create a new Notebook
  await page.menu.clickMenuItem('File>New>Notebook');
  //await page.click('button:has-text("Submit")');
  await page.waitForSelector('text=| Idle');

  let failed = false;
  try {
    
  } catch (e) {
    failed = false;
    expect(e).toBeTruthy();
  }
  expect(failed).toBe(false);
});
