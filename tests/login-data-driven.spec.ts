import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const cenarios = [
  { tipo: 'cliente válido', email: 'user@system.com', senha: 'UserPassword123', deveLogar: true },
  { tipo: 'admin válido', email: 'admin@system.com', senha: 'AdminPassword123', deveLogar: true },
  { tipo: 'senha errada', email: 'user@system.com', senha: 'SenhaErrada123', deveLogar: false },
];

for (const cenario of cenarios) {
  test(`Data-Driven: Testar login com ${cenario.tipo}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(cenario.email, cenario.senha);

    if (cenario.deveLogar) {
      await expect(page).toHaveURL(/.*painel/);
    } else {
      await expect(loginPage.errorMessage).toBeVisible();
    }
  });
}