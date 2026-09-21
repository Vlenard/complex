# Benchmark és Mérési Mappa (`benchmarks/`)

Ez a mappa tartalmazza a MERN és Next.js alkalmazások összehasonlító méréseihez szükséges futtatható szkripteket, mérőeszközöket, valamint a generált nyers mérési eredményeket.

---

## 📂 Mappa Felépítése és Szeparációja

A mérési környezet két élesen elkülönített kategóriára van bontva:

```
benchmarks/
├── README.md               <-- Ez a leírás
├── package.json            <-- Függőségek és npm futtatási parancsok
├── package-lock.json       <-- Csomagverziók zárolása
├── node_modules/           <-- Telepített eszközök (lighthouse, autocannon)
│
├── scripts/                <-- 🧑‍💻 TÉNYLEGES FORRÁSKÓD (Futtatható mérőszoftverek)
│   ├── seeder.js           <-- Adatbázis magvető (20 minta tétel + tesztfelhasználó)
│   └── run_api_benchmarks.js <-- Automatizált REST API & Server Action válaszidő mérő
│
└── results/                <-- 📊 GENERÁLT EREDMÉNYEK (Nyers JSON kimenetek)
    ├── mern_landing_lighthouse.json  <-- MERN Landing mobil Lighthouse jelentés
    ├── next_landing_lighthouse.json  <-- Next.js Landing mobil Lighthouse jelentés
    ├── mern_desktop_lighthouse.json  <-- MERN Landing desktop Lighthouse jelentés
    ├── next_desktop_lighthouse.json  <-- Next.js Landing desktop Lighthouse jelentés
    ├── mern_autocannon.json          <-- MERN 20 kapcsolatos terhelésteszt adatok
    └── next_autocannon.json          <-- Next.js 20 kapcsolatos terhelésteszt adatok
```

---

## 🚀 Hasznos Parancsok a Mérések Újrafuttatásához

1. **Adatbázis újratelepítése (20 determinisztikus tétel):**
   ```bash
   npm --prefix benchmarks run seed
   ```

2. **API & Server Action válaszidő mérések futtatása (20 iteráció):**
   ```bash
   npm --prefix benchmarks run bench:api
   ```

3. **Lighthouse mérések újraindítása (Headless Chrome-mal):**
   ```bash
   # MERN Desktop
   CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ./benchmarks/node_modules/.bin/lighthouse "http://localhost:3000/" --preset=desktop --output=json --output-path=benchmarks/results/mern_desktop_lighthouse.json --quiet
   
   # Next.js Desktop
   CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ./benchmarks/node_modules/.bin/lighthouse "http://localhost:3001/en" --preset=desktop --output=json --output-path=benchmarks/results/next_desktop_lighthouse.json --quiet
   ```

4. **Autocannon terhelésteszt:**
   ```bash
   ./benchmarks/node_modules/.bin/autocannon -c 20 -d 10 -j http://localhost:3000/ > benchmarks/results/mern_autocannon.json
   ./benchmarks/node_modules/.bin/autocannon -c 20 -d 10 -j http://localhost:3001/en > benchmarks/results/next_autocannon.json
   ```

---

## 📈 Eredmények Feldolgozása

A generált nyers JSON eredmények szöveges, elemzett és táblázatos összefoglalója a [**docs/meresi_eredmenyek.md**](file:///Users/vlenard/code/complex/docs/meresi_eredmenyek.md) fájlban található.
