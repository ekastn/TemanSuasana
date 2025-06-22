import { listMoods, averageScore, bestScore } from "./api.js";

(async () => {
  const moods = await listMoods();

  /* --- summary --- */
  document.getElementById("summaryBoxes").innerHTML = `
    <div class="stat-card"><h3>Rata‑rata</h3><p>${averageScore(moods)}</p></div>
    <div class="stat-card"><h3>Hari Terbaik</h3><p>${bestScore(moods) || "-"}/10</p></div>
    <div class="stat-card"><h3>Total Check‑in</h3><p>${moods.length}</p></div>
  `;

  /* --- full list --- */
  document.getElementById("historyList").innerHTML =
    moods.map(m => `
      <div class="entry">
        <div class="entry-date">${fmtLong(m.created_at ?? m.created)} — ${m.score}/10 ${m.mood}</div>
        <div>${m.note || ""}</div>
        ${m.tags?.length ? `<div class="entry-tags">${m.tags.map(t => `<span class="entry-tag">${t}</span>`).join("")}</div>` : ""}
      </div>
    `).join("") || "<p>Belum ada data.</p>";
})();

function fmtLong(ts) {
  return new Date(ts).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
