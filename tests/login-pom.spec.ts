import { test, expect } from '../fixtures/auth.fixture';
import { LoginPage } from '../pages/LoginPage';

test.describe('Testes E2E de Login com POM', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Cenário 1 (Caminho Feliz): Login de cliente válido com validação de redirecionamento para o painel', async ({ page }) => {
    await loginPage.login('user@system.com', 'UserPassword123');
    await expect(page).toHaveURL(/.*painel/);
  });

  test('Cenário 2 (Caminho Triste): Login com senha incorreta validando mensagem de erro visível', async () => {
    await loginPage.login('user@system.com', 'SenhaIncorreta123');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('Cenário 3 (Regra de Negócio): Validar que o botão inicia desabilitado', async () => {
    await expect(loginPage.loginBtn).toBeDisabled();
  });

  test('Teste demonstrando o uso da Fixture customizada de autenticação', async ({ authenticatedPage }) => {
    await expect(authenticatedPage).toHaveURL(/.*painel/);
  });
});