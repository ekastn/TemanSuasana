/* ========= Konfigurasi ========= */
const API = "http://localhost:8080/api";   // ganti kalau port/server beda
const LS_MOODS       = "ts_moods_offline";
const LS_REFLECTIONS = "ts_refs_offline";


export const TAGS = [
  "produktif","lelah","excited","stress",
  "grateful","anxious","fokus","kreatif"
];

/* ========= Helper umum ========= */
function uid() {
  return Date.now().toString(36)+Math.random().toString(36).slice(2,8);
}
function saveLS(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function loadLS(key)       { return JSON.parse(localStorage.getItem(key) || "[]"); }

async function req(path, opts = {}) {
  try {
    const r = await fetch(`${API}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...opts,
    });
    if (!r.ok) throw new Error(await r.text());
    return await r.json();
  } catch (err) {
    console.warn("Server offline? pakai localStorage →", err.message);
    throw err;            // biar caller tau & bisa fallback
  }
}

/* ========= Mood ========= */
export async function listMoods() {
  try { return await req("/moods"); }
  catch { return loadLS(LS_MOODS); }
}

export async function addMood(m) {
  try { return await req("/moods", { method:"POST", body:JSON.stringify(m) }); }
  catch {
    const arr = loadLS(LS_MOODS);
    arr.push({ id: uid(), ...m, created_at: Date.now() });
    saveLS(LS_MOODS, arr);
    return m;
  }
}

/* ========= Reflection ========= */
export async function listReflections() {
  try { return await req("/reflections"); }
  catch { return loadLS(LS_REFLECTIONS); }
}

export async function addReflection(r) {
  try { return await req("/reflections", { method:"POST", body:JSON.stringify(r) }); }
  catch {
    const arr = loadLS(LS_REFLECTIONS);
    arr.push({ id: uid(), ...r });
    saveLS(LS_REFLECTIONS, arr);
    return r;
  }
}

/* ========= Utils ========= */
export const averageScore = m =>
  m.length ? (m.reduce((t,x)=>t+x.score,0)/m.length).toFixed(1) : 0;

export const bestScore = m =>
  m.reduce((max,x)=>Math.max(max,x.score||0), 0);

export const streak = m => {
  if (!m.length) return 0;
  // sort DESC just in case
  m.sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
  let s = 1;
  for (let i=1;i<m.length;i++){
    const diff = (new Date(m[i-1].created_at) - new Date(m[i].created_at)) / 8.64e7;
    if (diff === 1) s++; else break;
  }
  return s;
};
