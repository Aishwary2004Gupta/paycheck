import { test, expect } from "@playwright/test";

test("API flow: register, login, create transaction", async ({ request }) => {
  const email = `user${Date.now()}@test.com`;
  const password = "Password123";

  const reg = await request.post("http://localhost:4001/api/auth/register", {
    data: { email, password }
  });
  expect(reg.status()).toBe(201);

  const login = await request.post("http://localhost:4001/api/auth/login", {
    data: { email, password }
  });
  expect(login.status()).toBe(200);
  const { token } = await login.json();

  const tx = await request.post("http://localhost:4002/api/transactions", {
    data: { amount: 100 },
    headers: { Authorization: `Bearer ${token}` }
  });
  expect(tx.status()).toBe(201);
  const body = await tx.json();
  expect(body.status).toBe("SUCCESS");
});
