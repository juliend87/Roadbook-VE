function sauvegarderMission() {
  localStorage.setItem("roadbookMission", JSON.stringify(mission));
}

function chargerMission() {
  const data = localStorage.getItem("roadbookMission");

  if (data)
    mission = JSON.parse(data);
}