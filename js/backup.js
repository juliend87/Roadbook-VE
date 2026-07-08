function creerPointDeRetour() {
  localStorage.setItem("roadbookBackupMission", JSON.stringify(mission));
  localStorage.setItem("roadbookBackupVehicules", JSON.stringify(vehicules));
  alert("Point de retour créé.");
}

function revenirPointDeRetour() {
  const backupMission = localStorage.getItem("roadbookBackupMission");
  const backupVehicules = localStorage.getItem("roadbookBackupVehicules");

  if (!backupMission || !backupVehicules) {
    alert("Aucun point de retour trouvé.");
    return;
  }

  mission = JSON.parse(backupMission);
  vehicules = JSON.parse(backupVehicules);

  sauvegarderMission();
  sauvegarderVehicules();

  alert("Retour effectué.");
  changerPage("accueil");
}