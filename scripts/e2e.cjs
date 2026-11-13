const { chromium } = require("playwright-core");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.env.BASE_URL || "http://127.0.0.1:4175";
(async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  let checks = 0;
  const text = async (s) => {
    await page
      .getByText(s, { exact: false })
      .filter({ visible: true })
      .first()
      .waitFor();
    checks++;
  };
  const button = async (s) =>
    page.getByRole("button", { name: s, exact: true }).click();
  const nav = async (s) =>
    page.getByRole("link", { name: s, exact: true }).click();
  const noOverflow = async () => {
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    checks++;
  };
  try {
    await page.goto(base, { waitUntil: "networkidle" });
    await text("12 lugares encontrados");
    await noOverflow();
    for (const city of [
      "Caraguatatuba",
      "São Sebastião",
      "Ubatuba",
      "Ilhabela",
    ]) {
      await button("Cidade: " + city);
      await text("3 lugares encontrados");
      assert.equal(
        await page
          .getByRole("button", { name: "Cidade: " + city, exact: true })
          .getAttribute("aria-pressed"),
        "true",
      );
      checks++;
    }
    await button("Todas as cidades");
    await page.getByLabel("Buscar lugares").fill("sao sebastiao");
    await text("3 lugares encontrados");
    await button("Praias");
    await text("2 lugares encontrados");
    await button("Cidade: Ilhabela");
    await text("Nenhum lugar com essa combinação");
    await button("Limpar filtros");
    await text("12 lugares encontrados");
    await page.getByLabel("Buscar lugares").fill("sao nao existe");
    await text("Nenhum lugar com essa combinação");
    await button("Limpar filtros");
    await page.getByLabel("Buscar lugares").fill("prumirim");
    await text("1 lugar encontrado");
    await page
      .getByRole("link", { name: "Conhecer Praia do Prumirim", exact: true })
      .waitFor();
    checks++;
    await page.getByLabel("Buscar lugares").fill("");
    await page
      .getByRole("checkbox", { name: "Entrada gratuita", exact: false })
      .click();
    await text("8 lugares encontrados");
    await button("Um pouco de verde");
    await text("Nenhum lugar com essa combinação");
    await button("Limpar filtros");
    await page
      .getByRole("button", {
        name: "Salvar nos favoritos: Praia da Mococa",
        exact: true,
      })
      .click();
    await nav("Favoritos");
    await text("Praia da Mococa");
    await page.reload({ waitUntil: "networkidle" });
    await text("Praia da Mococa");
    await nav("Descobrir");
    await page
      .getByRole("link", { name: "Conhecer Praia da Mococa", exact: true })
      .click();
    await button("Adicionar ao meu roteiro +");
    await button("✓ Remover do roteiro");
    await button("Adicionar ao meu roteiro +");
    await page
      .getByLabel("Sua lembrança da visita")
      .fill("Uma descoberta entre a serra e o mar.");
    await button("Registrar visita");
    await text("Descoberta guardada no seu passaporte.");
    await nav("Passaporte");
    await text("Uma descoberta entre a serra e o mar.");
    await text("REGISTRO MANUAL · SEM GPS");
    await page.reload({ waitUntil: "networkidle" });
    await text("Uma descoberta entre a serra e o mar.");
    await page.goto(base + "/place/ilhabela-vila", {
      waitUntil: "networkidle",
    });
    await button("Adicionar ao meu roteiro +");
    await nav("Meu roteiro");
    await text("02 PARADAS");
    await text("Ilhabela envolve travessia pelo canal");
    await page
      .getByRole("button", { name: "Subir Vila de Ilhabela", exact: true })
      .click();
    const saved = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("desvio:v1")),
    );
    assert.deepEqual(saved.route, ["ilhabela-vila", "caragua-mococa"]);
    checks++;
    const [popup] = await Promise.all([
      page.waitForEvent("popup"),
      button("Abrir roteiro no Google Maps ↗"),
    ]);
    assert.match(popup.url(), /google.*maps/);
    await popup.close();
    checks++;
    await page
      .getByRole("button", {
        name: "Remover Praia da Mococa do roteiro",
        exact: true,
      })
      .click();
    await text("01 PARADAS");
    await nav("Descobrir");
    await button("Mapa");
    await page.locator(".leaflet-marker-icon").first().waitFor();
    assert.equal(await page.locator(".leaflet-marker-icon").count(), 12);
    checks++;
    await page.locator(".leaflet-marker-icon").first().click();
    await page
      .getByRole("link", { name: "Conhecer Praia da Mococa", exact: true })
      .waitFor();
    checks++;
    await button("Lista");
    await page.setViewportSize({ width: 390, height: 844 });
    await noOverflow();
    await nav("Meu roteiro");
    await noOverflow();
    await nav("Passaporte");
    await noOverflow();
    await page
      .getByRole("button", {
        name: "Remover visita a Praia da Mococa",
        exact: true,
      })
      .click();
    await button("Sim, remover");
    await text("A primeira história está lá fora.");
    await page.goto(base + "/place/inexistente", { waitUntil: "networkidle" });
    await text("Esse caminho não existe.");
    await page.goto(base, { waitUntil: "networkidle" });
    await context.setOffline(true);
    await page
      .getByRole("link", {
        name: "Conhecer Projeto Tamar Ubatuba",
        exact: true,
      })
      .click();
    await text("Um motivo para ir.");
    await button("Adicionar ao meu roteiro +");
    await nav("Meu roteiro");
    await text("Projeto Tamar Ubatuba");
    await context.setOffline(false);
    checks++;
    const broken = await browser.newContext();
    await broken.addInitScript(() =>
      localStorage.setItem("desvio:v1", "{broken"),
    );
    const bp = await broken.newPage();
    await bp.goto(base, { waitUntil: "networkidle" });
    await bp
      .getByText("Não foi possível ler seus dados locais.", { exact: false })
      .waitFor();
    assert.equal(
      await bp.evaluate(() => localStorage.getItem("desvio:v1")),
      "{broken",
    );
    checks++;
    await bp.getByRole("link", { name: "Meu roteiro", exact: true }).click();
    await bp
      .getByText("Não foi possível ler seus dados locais.", { exact: false })
      .filter({ visible: true })
      .waitFor();
    checks++;
    await broken.close();
    const denied = await browser.newContext();
    await denied.addInitScript(() => {
      window.failSave = true;
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key, value) {
        if (key === "desvio:v1" && window.failSave) throw new Error("quota");
        return original.call(this, key, value);
      };
    });
    const dp = await denied.newPage();
    await dp.goto(base, { waitUntil: "networkidle" });
    await dp
      .getByRole("button", {
        name: "Salvar nos favoritos: Praia da Mococa",
        exact: true,
      })
      .click();
    await dp
      .getByText("Não foi possível salvar. Tente novamente.", { exact: true })
      .waitFor();
    assert.equal(
      await dp.evaluate(() => localStorage.getItem("desvio:v1")),
      null,
    );
    await dp.evaluate(() => (window.failSave = false));
    await dp
      .getByRole("button", {
        name: "Salvar nos favoritos: Praia da Mococa",
        exact: true,
      })
      .click();
    await dp
      .getByRole("button", {
        name: "Remover dos favoritos: Praia da Mococa",
        exact: true,
      })
      .waitFor();
    assert.deepEqual(
      await dp.evaluate(
        () => JSON.parse(localStorage.getItem("desvio:v1")).favorites,
      ),
      ["caragua-mococa"],
    );
    checks++;
    await denied.close();
    const prior = await browser.newContext();
    await prior.addInitScript(() => {
      if (localStorage.getItem("desvio:v1") === null)
        localStorage.setItem(
          "desvio:v1",
          JSON.stringify({
            version: 1,
            favorites: ["vila-itororo"],
            route: ["sesc-pompeia"],
            visits: {
              "vila-itororo": {
                visitedAt: "2026-11-13T12:00:00Z",
                note: "Memória da capital",
                gpsVerified: false,
              },
            },
          }),
        );
    });
    const old = await prior.newPage();
    await old.goto(base + "/saved", { waitUntil: "networkidle" });
    await old
      .getByRole("link", { name: "Conhecer Vila Itororó", exact: true })
      .waitFor();
    await old.goto(base + "/place/caragua-mococa", {
      waitUntil: "networkidle",
    });
    await old
      .getByRole("button", { name: "♡ Salvar nos favoritos", exact: true })
      .click();
    await old
      .getByRole("button", { name: "♥ Remover dos favoritos", exact: true })
      .waitFor();
    const restored = await old.evaluate(() =>
      JSON.parse(localStorage.getItem("desvio:v1")),
    );
    assert.deepEqual(restored.favorites, ["vila-itororo", "caragua-mococa"]);
    assert.deepEqual(restored.route, ["sesc-pompeia"]);
    assert.equal(restored.visits["vila-itororo"].note, "Memória da capital");
    checks++;
    await prior.close();
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ status: "passed", checks, errors, base }));
  } catch (error) {
    fs.mkdirSync("logs", { recursive: true });
    await page.screenshot({ path: "logs/e2e-failure.png", fullPage: true });
    console.error(error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
