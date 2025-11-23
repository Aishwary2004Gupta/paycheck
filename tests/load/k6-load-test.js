import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    { duration: "5s", target: 10 },
    { duration: "10s", target: 50 },
    { duration: "10s", target: 100 },
    { duration: "5s", target: 0 }
  ]
};

export default function () {
  const payload = JSON.stringify({
    email: "load@test.com",
    password: "Password123"
  });

  const params = { headers: { "Content-Type": "application/json" } };

  const res = http.post("http://localhost:4001/api/auth/login", payload, params);

  check(res, {
    "status is 200 or 401": (r) => r.status === 200 || r.status === 401,
    "response time < 500ms": (r) => r.timings.duration < 500
  });

  sleep(1);
}
