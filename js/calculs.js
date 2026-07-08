function batterieReelle() {
  return vehicule.batterie * vehicule.soh / 100;
}

function consoReelle() {

  let conso = vehicule.conso;

  conso += mission.adultes * 0.25;
  conso += mission.enfants * 0.12;
  conso += mission.bagages / 100;

  if (mission.vitesse >= 120)
    conso += 0.8;

  return conso;
}

function autonomie() {
  return Math.round(
    batterieReelle() /
    consoReelle() * 100
  );
}

function consoPourcentage(distance) {

  return (
    distance *
    consoReelle() / 100 /
    batterieReelle() * 100
  );
}

function statutSoc(soc) {

  if (soc < 12)
    return `<span class="danger">🔴 NO GO</span>`;

  if (soc < 20)
    return `<span class="warning">🟠 Vigilance</span>`;

  return `<span class="ok">🟢 OK</span>`;
}

function couleurSoc(soc) {

  if (soc < 12)
    return "danger";

  if (soc < 20)
    return "warning";

  return "ok";
}

function libelleRoute(route) {

  if (route === "peage")
    return "🛣️ Avec péage";

  if (route === "sans-peage")
    return "🚧 Sans péage";

  return "🔀 Mixte";
}