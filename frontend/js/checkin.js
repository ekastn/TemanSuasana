import { addMood, listMoods, TAGS } from "./api.js";


/* ---------- Tag pills ---------- */
const tagList = document.getElementById("tagList");
TAGS.forEach(t => {
  const pill = document.createElement("span");
  pill.className = "entry-tag";
  pill.textContent = t;
  pill.onclick = () => pill.classList.toggle("selected");
  tagList.append(pill);
});

/* ---------- Slider value ---------- */
const sInput = document.getElementById("score");
const sVal   = document.getElementById("scoreVal");
sInput.oninput = () => (sVal.textContent = sInput.value);

/* ---------- Last entry (async) ---------- */
(async () => {
  const moods = await listMoods();

  // urutkan DESC berdasarkan waktu
  moods.sort(
    (a, b) =>
      new Date(b.created_at ?? b.created).getTime() -
      new Date(a.created_at ?? a.created).getTime()
  );

  const last = moods[0];
  document.getElementById("lastEntry").innerHTML = last
    ? `${new Date(last.created_at ?? last.created).toLocaleString()} — ${last.score}/10 ${last.mood}<br>${last.note || ""}`
    : "<p>Belum ada check‑in.</p>";
})();

/* ---------- Simpan mood ---------- */
document.getElementById("checkinForm").addEventListener("submit", async e => {
  e.preventDefault();

  const mood  = document.querySelector("input[name=mood]:checked")?.value;
  const score = +sInput.value;
  const note  = document.getElementById("note").value;
  const tags  = [...document.querySelectorAll("#tagList .selected")].map(x => x.textContent);

  // server akan menambahkan created_at
  await addMood({ mood, score, note, tags });

  alert("Tersimpan!");
  location.href = "history.html";
});
