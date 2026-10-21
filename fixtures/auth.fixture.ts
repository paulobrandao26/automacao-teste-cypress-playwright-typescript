import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user@system.com', 'UserPassword123');
    await use(page);
  },
});

export { expect } from '@playwright/test';