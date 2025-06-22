import { addReflection, listReflections } from "./api.js";

/* --- tabs --- */
const tabToday = document.getElementById("tabToday");
const tabLog   = document.getElementById("tabLog");
const form     = document.getElementById("reflectionForm");
const logDiv   = document.getElementById("reflectionLog");

function setTab(showForm) {
  tabToday.classList.toggle("active",  showForm);
  tabLog.classList.toggle("active",   !showForm);
  form.style.display   = showForm ? "grid" : "none";
  logDiv.style.display = showForm ? "none" : "block";
}
tabToday.onclick = () => setTab(true);
tabLog.onclick   = () => setTab(false);
setTab(true);

/* --- submit --- */
form.addEventListener("submit", async e => {
  e.preventDefault();

  await addReflection({
    best:      document.getElementById("best").value,
    challenge: document.getElementById("challenge").value,
    lesson:    document.getElementById("lesson").value,
    hope:      document.getElementById("hope").value
    // ⬅️ field `date` tidak dikirim; server yang mengisi
  });

  alert("Refleksi tersimpan!");
  form.reset();
  renderLog();
});

/* --- log --- */
async function renderLog() {
  const arr = await listReflections();
  logDiv.innerHTML = arr.map(r => `
    <div class="entry">
      <div class="entry-date">${new Date(r.date).toLocaleDateString("id-ID", { year:"numeric", month:"long", day:"numeric" })}</div>
      <ul style="margin-left:1rem;list-style:none">
        <li>🌟 ${r.best}</li><li>⚡ ${r.challenge}</li>
        <li>💡 ${r.lesson}</li><li>🎯 ${r.hope}</li>
      </ul>
    </div>
  `).join("") || "<p>Belum ada refleksi.</p>";
}
renderLog();
