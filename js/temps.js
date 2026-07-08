function tempsTrajetEstime() {
  const vitesseMoyenne = 105;
  const heures = mission.distanceTotale / vitesseMoyenne;

  return heures;
}

function formatTemps(decimalHeures) {
  const heures = Math.floor(decimalHeures);
  const minutes = Math.round((decimalHeures - heures) * 60);

  return `${heures} h ${minutes.toString().padStart(2, "0")}`;
}

function heureArriveeEstimee() {
  const [h, m] = mission.heureDepart.replace("h", ":").split(":").map(Number);

  const departMinutes = h * 60 + m;
  const trajetMinutes = Math.round(tempsTrajetEstime() * 60);

  const total = departMinutes + trajetMinutes;

  const heure = Math.floor(total / 60) % 24;
  const minute = total % 60;

  return `${heure.toString().padStart(2, "0")}h${minute.toString().padStart(2, "0")}`;
}