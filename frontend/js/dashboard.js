import { listMoods, averageScore, bestScore } from "./api.js";

(async () => {
  const moods = await listMoods();

  /* --- summary --- */
  document.getElementById("statBoxes").innerHTML = `
    <div class="stat-card"><h3>Mood Hari Ini</h3><p>${(moods[0]?.score ?? "-")}/10</p></div>
    <div class="stat-card"><h3>Rata‑rata</h3><p>${averageScore(moods)}</p></div>
    <div class="stat-card"><h3>Hari Terbaik</h3><p>${bestScore(moods) || "-"}/10</p></div>
    <div class="stat-card"><h3>Total Check‑in</h3><p>${moods.length}</p></div>
  `;

  /* --- recent 5 --- */
  document.getElementById("recentList").innerHTML =
    moods.slice(0, 5).map(m =>
      `<div class="entry">${fmt(m.created_at ?? m.created)} — ${m.score}/10 ${m.mood}</div>`
    ).join("") || "<p>Belum ada data.</p>";
})();

function fmt(ts) {
  return new Date(ts).toLocaleDateString("id-ID");
}
