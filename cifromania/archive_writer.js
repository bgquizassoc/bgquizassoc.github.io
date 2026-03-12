import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function saveDailyArchive(db, date, rankingArray) {
  for (const player of rankingArray) {
    await setDoc(
      doc(db, "archive", date, "players", player.id),
      {
        name: player.name,
        score: player.score
      }
    );
  }
}
