function genererRoadbook() {

  let soc = 100;
  let cumul = 0;
  let html = "";

  mission.etapes.forEach((etape, index) => {

    if (index > 0) {
      soc -= consoPourcentage(etape.distance);
      cumul += etape.distance;
    }

    html += `
      <tr>
        <td>${etape.nom}</td>
        <td>${etape.distance} km</td>
        <td>${cumul} km</td>
        <td class="${couleurSoc(soc)}">${Math.round(soc)} %</td>
        <td>${statutSoc(soc)}</td>
      </tr>
    `;

    if (etape.recharge !== null) {
      soc = etape.recharge;
    }

  });

  return html;
}

function genererTroncons() {

  let batterieDisponible = mission.socDepart;
  let html = "";

  mission.troncons.forEach((troncon, index) => {

    const conso = consoReelle();
    const energieNecessaire = troncon.distance * conso / 100;
    const pourcentageNecessaire = energieNecessaire / batterieReelle() * 100;
    const batterieArrivee = batterieDisponible - pourcentageNecessaire;

    let statut = "🟢 OK";

    if (batterieArrivee < 0) {
      statut = "🔴 Impossible";
    } else if (batterieArrivee < 15) {
      statut = "🟠 Limite";
    }

    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${troncon.depart}</td>
        <td>${troncon.arrivee}</td>
        <td>${troncon.distance} km</td>
        <td>
          Départ : ${Math.round(batterieDisponible)} %<br>
          Arrivée : ${Math.round(batterieArrivee)} %<br>
          ${statut}
        </td>
      </tr>
    `;

    batterieDisponible = 80;
  });

  return html;
}