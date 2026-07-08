const journalVoyage = [];

function ajouterEvenement(titre, commentaire) {

  journalVoyage.push({
    date: new Date().toLocaleString(),
    titre,
    commentaire
  });

  sauvegarderMission();
}

function afficherJournal() {

  return journalVoyage.map(e => `
    <div class="carte">
      <b>${e.date}</b><br>
      <b>${e.titre}</b><br>
      ${e.commentaire}
    </div>
  `).join("");

}