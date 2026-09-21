import { performance } from "perf_hooks";

const ITERATIONS = 20;

function calculateStats(times) {
  times.sort((a, b) => a - b);
  const sum = times.reduce((acc, v) => acc + v, 0);
  const mean = sum / times.length;
  const p50 = times[Math.floor(times.length * 0.5)];
  const p95 = times[Math.floor(times.length * 0.95)];
  const min = times[0];
  const max = times[times.length - 1];
  const variance = times.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / times.length;
  const stdDev = Math.sqrt(variance);
  return { mean, p50, p95, min, max, stdDev };
}

async function runMernBenchmarks() {
  console.log("\n==========================================");
  console.log("=== RUNNING MERN BENCHMARKS (PORT 3000) ===");
  console.log("==========================================");

  // 1. Sign in
  const loginTimes = [];
  let token = null;

  for (let i = 0; i < ITERATIONS; i++) {
    const t0 = performance.now();
    const res = await fetch("http://localhost:3000/api/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "benchmark@test.com", password: "password123" }),
    });
    const t1 = performance.now();
    loginTimes.push(t1 - t0);

    if (res.ok) {
      const data = await res.json();
      token = data.token;
    }
  }

  const loginStats = calculateStats(loginTimes);
  console.log(`MERN Sign-In: Mean=${loginStats.mean.toFixed(2)}ms, p50=${loginStats.p50.toFixed(2)}ms, p95=${loginStats.p95.toFixed(2)}ms, stdDev=${loginStats.stdDev.toFixed(2)}ms`);

  // 2. Get 20 beers
  const getBeersTimes = [];
  let beersCount = 0;
  for (let i = 0; i < ITERATIONS; i++) {
    const t0 = performance.now();
    const res = await fetch("http://localhost:3000/api/beer", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const t1 = performance.now();
    getBeersTimes.push(t1 - t0);

    if (res.ok) {
      const data = await res.json();
      beersCount = data.length;
    }
  }
  const getBeersStats = calculateStats(getBeersTimes);
  console.log(`MERN Get Beers (${beersCount} items): Mean=${getBeersStats.mean.toFixed(2)}ms, p50=${getBeersStats.p50.toFixed(2)}ms, p95=${getBeersStats.p95.toFixed(2)}ms, stdDev=${getBeersStats.stdDev.toFixed(2)}ms`);

  // 3. Search beers (name=IPA)
  const searchTimes = [];
  let searchCount = 0;
  for (let i = 0; i < ITERATIONS; i++) {
    const t0 = performance.now();
    const res = await fetch("http://localhost:3000/api/beer?name=IPA", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const t1 = performance.now();
    searchTimes.push(t1 - t0);

    if (res.ok) {
      const data = await res.json();
      searchCount = data.length;
    }
  }
  const searchStats = calculateStats(searchTimes);
  console.log(`MERN Search Beers (${searchCount} matches): Mean=${searchStats.mean.toFixed(2)}ms, p50=${searchStats.p50.toFixed(2)}ms, p95=${searchStats.p95.toFixed(2)}ms, stdDev=${searchStats.stdDev.toFixed(2)}ms`);

  return { loginStats, getBeersStats, searchStats };
}

async function runNextBenchmarks() {
  console.log("\n=============================================");
  console.log("=== RUNNING NEXT.JS BENCHMARKS (PORT 3001) ===");
  console.log("=============================================");

  // 1. Sign in via native Next.js form POST
  const loginTimes = [];
  let cookieHeader = null;

  for (let i = 0; i < ITERATIONS; i++) {
    const formData = new FormData();
    formData.append("$ACTION_REF_1", "");
    formData.append("$ACTION_1:0", '{"id":"6064543ddff884a80ea2d66433eb619dfc2ea28554","bound":"$@1"}');
    formData.append("$ACTION_1:1", "[{}]");
    formData.append("$ACTION_KEY", "kcfaf34d879453a685fb8647fca88c801");
    formData.append("email", "benchmark@test.com");
    formData.append("password", "password123");

    const t0 = performance.now();
    const res = await fetch("http://localhost:3001/en/sign-in", {
      method: "POST",
      body: formData,
      redirect: "manual",
    });
    const t1 = performance.now();
    loginTimes.push(t1 - t0);

    const setCookie = res.headers.get("set-cookie");
    if (setCookie) {
      cookieHeader = setCookie.split(";")[0];
    }
  }

  const loginStats = calculateStats(loginTimes);
  console.log(`Next.js Sign-In: Mean=${loginStats.mean.toFixed(2)}ms, p50=${loginStats.p50.toFixed(2)}ms, p95=${loginStats.p95.toFixed(2)}ms, stdDev=${loginStats.stdDev.toFixed(2)}ms`);

  // 2. Next.js Authenticated Dashboard SSR (RSC load with Auth check)
  const dashboardTimes = [];
  for (let i = 0; i < ITERATIONS; i++) {
    const t0 = performance.now();
    const res = await fetch("http://localhost:3001/en/app", {
      headers: { Cookie: cookieHeader },
    });
    const t1 = performance.now();
    dashboardTimes.push(t1 - t0);
  }
  const dashboardStats = calculateStats(dashboardTimes);
  console.log(`Next.js Dashboard SSR (Auth + RSC): Mean=${dashboardStats.mean.toFixed(2)}ms, p50=${dashboardStats.p50.toFixed(2)}ms, p95=${dashboardStats.p95.toFixed(2)}ms, stdDev=${dashboardStats.stdDev.toFixed(2)}ms`);

  // 3. Next.js GetBeersAction Server Action invocation
  const getBeersTimes = [];
  for (let i = 0; i < ITERATIONS; i++) {
    const t0 = performance.now();
    const res = await fetch("http://localhost:3001/en/app", {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
        "Next-Action": "406b7eb1b4e0cae6d6c25e522d31d63cee5456ac64",
        "Content-Type": "text/plain;charset=UTF-8",
        Accept: "text/x-component",
      },
      body: JSON.stringify([]),
    });
    const t1 = performance.now();
    getBeersTimes.push(t1 - t0);
  }
  const getBeersStats = calculateStats(getBeersTimes);
  console.log(`Next.js GetBeersAction (20 items): Mean=${getBeersStats.mean.toFixed(2)}ms, p50=${getBeersStats.p50.toFixed(2)}ms, p95=${getBeersStats.p95.toFixed(2)}ms, stdDev=${getBeersStats.stdDev.toFixed(2)}ms`);

  // 4. Next.js GetBeersAction with search query
  const searchTimes = [];
  for (let i = 0; i < ITERATIONS; i++) {
    const t0 = performance.now();
    const res = await fetch("http://localhost:3001/en/app", {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
        "Next-Action": "406b7eb1b4e0cae6d6c25e522d31d63cee5456ac64",
        "Content-Type": "text/plain;charset=UTF-8",
        Accept: "text/x-component",
      },
      body: JSON.stringify(["IPA"]),
    });
    const t1 = performance.now();
    searchTimes.push(t1 - t0);
  }
  const searchStats = calculateStats(searchTimes);
  console.log(`Next.js GetBeersAction (Search IPA): Mean=${searchStats.mean.toFixed(2)}ms, p50=${searchStats.p50.toFixed(2)}ms, p95=${searchStats.p95.toFixed(2)}ms, stdDev=${searchStats.stdDev.toFixed(2)}ms`);

  return { loginStats, dashboardStats, getBeersStats, searchStats };
}

async function main() {
  const mern = await runMernBenchmarks();
  const next = await runNextBenchmarks();

  console.log("\n=============================================");
  console.log("=== SUMMARY: API & SERVER ACTION LATENCY ====");
  console.log("=============================================");
  console.log(`| Művelet | MERN Latency (Mean / p50 / p95) | Next.js Latency (Mean / p50 / p95) |`);
  console.log(`| :--- | :---: | :---: |`);
  console.log(`| **Bejelentkezés (Sign-In)** | ${mern.loginStats.mean.toFixed(1)}ms / ${mern.loginStats.p50.toFixed(1)}ms / ${mern.loginStats.p95.toFixed(1)}ms | ${next.loginStats.mean.toFixed(1)}ms / ${next.loginStats.p50.toFixed(1)}ms / ${next.loginStats.p95.toFixed(1)}ms |`);
  console.log(`| **Sörök lekérése (20 db)** | ${mern.getBeersStats.mean.toFixed(1)}ms / ${mern.getBeersStats.p50.toFixed(1)}ms / ${mern.getBeersStats.p95.toFixed(1)}ms | ${next.getBeersStats.mean.toFixed(1)}ms / ${next.getBeersStats.p50.toFixed(1)}ms / ${next.getBeersStats.p95.toFixed(1)}ms |`);
  console.log(`| **Keresés / Szűrés (IPA)** | ${mern.searchStats.mean.toFixed(1)}ms / ${mern.searchStats.p50.toFixed(1)}ms / ${mern.searchStats.p95.toFixed(1)}ms | ${next.searchStats.mean.toFixed(1)}ms / ${next.searchStats.p50.toFixed(1)}ms / ${next.searchStats.p95.toFixed(1)}ms |`);
  console.log(`| **Dashboard SSR / Betöltés** | N/A (Kliens render) | ${next.dashboardStats.mean.toFixed(1)}ms / ${next.dashboardStats.p50.toFixed(1)}ms / ${next.dashboardStats.p95.toFixed(1)}ms |`);
}

main().catch(console.error);
