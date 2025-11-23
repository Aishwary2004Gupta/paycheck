import { test, expect } from "@playwright/test";

test("UI flow: register, login, pay", async ({ page }) => {
  await page.goto("/");

  const email = `ui${Date.now()}@test.com`;
  const password = "Password123";

  // register
  await page.fill("#regEmail", email);
  await page.fill("#regPassword", password);
  await page.click("#registerBtn");
  await expect(page.locator("#registerStatus")).toContainText("Registered", {
    timeout: 5000
  });

  // login
  await page.fill("#email", email);
  await page.fill("#password", password);
  await page.click("#loginBtn");
  await expect(page.locator("#loginStatus")).toContainText("Logged in", {
    timeout: 5000
  });

  // pay
  await page.fill("#amount", "100");
  await page.click("#payBtn");
  await expect(page.locator("#payStatus")).toContainText("Payment SUCCESS", {
    timeout: 5000
  });
});
