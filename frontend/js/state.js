// /*
//  * Global state + LocalStorage persistence.
//  * Saat LocalStorage kosong, seed dengan data dummy
//  * supaya demo langsung ada konten.
//  */

// const dummyMoods = [
//   {
//     score: 8,
//     emoji: "😊",
//     note: "Hari yang produktif, berhasil menyelesaikan proyek tepat waktu.",
//     tags: ["produktif", "excited"],
//     createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // kemarin
//   },
//   {
//     score: 6,
//     emoji: "😐",
//     note: "Cukup baik, tapi ada beberapa kendala kecil.",
//     tags: ["stress"],
//     createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
//   },
//   {
//     score: 4,
//     emoji: "😖",
//     note: "Hari yang berat, banyak deadline menumpuk.",
//     tags: ["stress", "lelah"],
//     createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
//   },
// ];

// const dummyReflections = [
//   {
//     date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
//     q1: "Berhasil menyelesaikan presentasi dengan baik.",
//     q2: "Deadline ketat dan revisi mendadak.",
//     q3: "Pentingnya komunikasi yang jelas.",
//     q4: "Menyelesaikan revisi dokumen dan rencana baru.",
//   },
//   {
//     date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
//     q1: "Meeting berjalan lancar.",
//     q2: "Sistem downtime 1 jam.",
//     q3: "Selalu punya rencana cadangan.",
//     q4: "Menyiapkan laporan bulanan.",
//   },
// ];

// export const State = {
//   tags: ["produktif", "lelah", "excited", "stress", "grateful", "anxious", "fokus", "kreatif"],

//   // Load or seed moods
//   moods: (() => {
//     const stored = localStorage.getItem("moods");
//     if (stored) return JSON.parse(stored);
//     localStorage.setItem("moods", JSON.stringify(dummyMoods));
//     return dummyMoods;
//   })(),
//   saveMood(obj) {
//     this.moods.unshift(obj);
//     localStorage.setItem("moods", JSON.stringify(this.moods));
//   },

//   // Load or seed reflections
//   reflections: (() => {
//     const stored = localStorage.getItem("reflections");
//     if (stored) return JSON.parse(stored);
//     localStorage.setItem("reflections", JSON.stringify(dummyReflections));
//     return dummyReflections;
//   })(),
//   saveReflection(obj) {
//     this.reflections.unshift({ ...obj, date: new Date().toISOString() });
//     localStorage.setItem("reflections", JSON.stringify(this.reflections));
//   },
// };
// ```js
// export const State = {
//   tags: ["produktif", "lelah", "excited", "stress", "grateful", "anxious", "fokus", "kreatif"],

//   // Mood disimpan di localStorage (fallback)
//   moods: JSON.parse(localStorage.getItem("moods") || "[]"),
//   saveMood(obj) {
//     this.moods.unshift(obj);
//     localStorage.setItem("moods", JSON.stringify(this.moods));
//   },

//   reflections: JSON.parse(localStorage.getItem("reflections") || "[]"),
//   saveReflection(obj) {
//     this.reflections.unshift({ ...obj, date: new Date().toISOString() });
//     localStorage.setItem("reflections", JSON.stringify(this.reflections));
//   },
// };
// ```js
// export const State = {
//   tags: ["produktif","lelah","excited","stress","grateful","anxious","fokus","kreatif"],
//   reflections: JSON.parse(localStorage.getItem("reflections") || "[]"),
//   saveReflection(obj){
//     this.reflections.unshift({...obj,date:new Date().toISOString()});
//     localStorage.setItem("reflections",JSON.stringify(this.reflections));
//   }
// };